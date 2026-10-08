"""Parse Schema.org JSON-LD vocabulary."""
import json, xml.etree.ElementTree as ET
from pathlib import Path
import sys
sys.path.insert(0, "/home/claude/meta/build")
from inventory import CATEGORIES

SRC = Path("/home/claude/meta/sources/raw/schemaorg.jsonld")
OUT = Path("/home/claude/meta/xml/083_schema_org_json_ld.xml")


def get_lang(node, key, lang="en"):
    """Schema.org uses {@language, @value} dicts."""
    v = node.get(key)
    if v is None:
        return ""
    if isinstance(v, dict):
        return v.get("@value", "")
    if isinstance(v, list):
        for item in v:
            if isinstance(item, dict) and item.get("@language", "en") == lang:
                return item.get("@value", "")
        if v:
            f = v[0]
            return f.get("@value", "") if isinstance(f, dict) else str(f)
    return str(v)


def get_refs(node, key):
    """Get list of @id references."""
    v = node.get(key)
    if v is None:
        return []
    if not isinstance(v, list):
        v = [v]
    out = []
    for item in v:
        if isinstance(item, dict):
            out.append(item.get("@id", "").replace("schema:", ""))
        elif isinstance(item, str):
            out.append(item.replace("schema:", ""))
    return [x for x in out if x]


def main():
    data = json.loads(SRC.read_text(encoding="utf-8"))
    nodes = data.get("@graph", [])

    classes = []
    properties = []
    enums = []
    enum_values = []

    for n in nodes:
        t = n.get("@type")
        if isinstance(t, list):
            ts = t
        else:
            ts = [t] if t else []
        ts_str = [str(x) for x in ts]
        is_class = "rdfs:Class" in ts_str
        is_prop = "rdf:Property" in ts_str

        # Enumeration members are typed by their parent class (e.g. type=schema:DayOfWeek)
        # Treat anything else with an @type that's a schema: class as an enum value
        is_enum_value = (not is_class and not is_prop and
                         any(t.startswith("schema:") for t in ts_str))

        if is_class:
            classes.append(n)
        elif is_prop:
            properties.append(n)
        elif is_enum_value:
            enum_values.append(n)

    print(f"Classes: {len(classes)}, Properties: {len(properties)}, Enum values: {len(enum_values)}")

    root = ET.Element("metadata_system", {
        "id": "083",
        "name": "Schema.org / JSON-LD Metadata",
        "category": "WEB",
        "category_label": CATEGORIES["WEB"],
        "used_for": "Structured web data — search engines, knowledge graphs",
        "spec_source": "schema.org current vocabulary — https://schema.org/version/latest/schemaorg-current-https.jsonld",
        "spec_version": "Schema.org current (May 2026 fetch)",
        "completeness": "comprehensive",
    })
    ET.SubElement(root, "description").text = (
        "Schema.org is a collaborative vocabulary for structured data on the web, used by Google, "
        "Microsoft, Yahoo, and Yandex. It defines classes (Thing, Person, Organization, Event, Product, "
        "etc.), properties (name, description, url, etc.), and enumerations. Embedded in HTML via "
        "JSON-LD, Microdata, or RDFa. Every class, property, and enumerated value is included here, "
        "fetched directly from schema.org's authoritative JSON-LD vocabulary."
    )
    attrs = ET.SubElement(root, "attributes")

    # Classes
    for n in sorted(classes, key=lambda x: x.get("@id","")):
        sid = n.get("@id","").replace("schema:","")
        ae = ET.SubElement(attrs, "attribute")
        ET.SubElement(ae, "name").text = sid
        ET.SubElement(ae, "group").text = "Class"
        ET.SubElement(ae, "data_type").text = "rdfs:Class"
        desc = get_lang(n, "rdfs:comment")
        if desc:
            ET.SubElement(ae, "description").text = desc[:1500]
        parents = get_refs(n, "rdfs:subClassOf")
        if parents:
            ET.SubElement(ae, "parent").text = ", ".join(parents)

    # Properties
    for n in sorted(properties, key=lambda x: x.get("@id","")):
        sid = n.get("@id","").replace("schema:","")
        ae = ET.SubElement(attrs, "attribute")
        ET.SubElement(ae, "name").text = sid
        ET.SubElement(ae, "group").text = "Property"
        domains = get_refs(n, "schema:domainIncludes")
        ranges = get_refs(n, "schema:rangeIncludes")
        type_str = ""
        if ranges:
            type_str = " | ".join(ranges)
        if type_str:
            ET.SubElement(ae, "data_type").text = type_str
        desc = get_lang(n, "rdfs:comment")
        if desc:
            ET.SubElement(ae, "description").text = desc[:1500]
        if domains:
            ET.SubElement(ae, "applies_to").text = ", ".join(domains)
        parents = get_refs(n, "rdfs:subPropertyOf")
        if parents:
            ET.SubElement(ae, "parent").text = ", ".join(parents)

    # Enumeration values (e.g. Monday is a member of DayOfWeek)
    for n in sorted(enum_values, key=lambda x: x.get("@id","")):
        sid = n.get("@id","").replace("schema:","")
        ae = ET.SubElement(attrs, "attribute")
        ET.SubElement(ae, "name").text = sid
        ET.SubElement(ae, "group").text = "Enumeration Value"
        types = []
        t = n.get("@type")
        if isinstance(t, list):
            types = [x.replace("schema:","") for x in t if isinstance(x, str)]
        elif t:
            types = [str(t).replace("schema:","")]
        if types:
            ET.SubElement(ae, "data_type").text = "Member of: " + ", ".join(types)
        desc = get_lang(n, "rdfs:comment")
        if desc:
            ET.SubElement(ae, "description").text = desc[:1500]

    total = len(classes) + len(properties) + len(enum_values)
    root.set("record_count", str(total))
    ET.indent(root, space="  ")
    OUT.write_bytes(ET.tostring(root, encoding="utf-8", xml_declaration=True))
    print(f"Wrote {OUT.name}: {total} ({len(classes)} classes + {len(properties)} props + {len(enum_values)} enum values)")


if __name__ == "__main__":
    main()
