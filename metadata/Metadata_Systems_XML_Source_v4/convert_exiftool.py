"""
Convert ExifTool's tag dump into per-system normalized XML files.

ExifTool emits <table name='Group::SubGroup'> with nested <tag id=... name=...>.
We map system numbers to one or more ExifTool group prefixes (see inventory.py).
"""

import xml.etree.ElementTree as ET
from pathlib import Path
from inventory import SYSTEMS, CATEGORIES, slug

EXIFTOOL_XML = Path("/home/claude/meta/sources/exiftool_full.xml")
OUT_DIR = Path("/home/claude/meta/xml")
OUT_DIR.mkdir(parents=True, exist_ok=True)


def parse_exiftool():
    """Parse exiftool dump, return dict[group_prefix] -> list of attribute dicts."""
    print(f"Parsing {EXIFTOOL_XML}...")
    tree = ET.parse(EXIFTOOL_XML)
    root = tree.getroot()
    by_group = {}
    for table in root.findall("table"):
        full_name = table.get("name", "")          # e.g. "Exif::Main"
        prefix = full_name.split("::")[0]
        subgroup = "::".join(full_name.split("::")[1:]) if "::" in full_name else ""
        for tag in table.findall("tag"):
            attr = {
                "name": tag.get("name", ""),
                "tag_id": tag.get("id", ""),
                "data_type": tag.get("type", ""),
                "writable": tag.get("writable", ""),
                "group": subgroup,
                "table": full_name,
            }
            # English description
            for desc in tag.findall("desc"):
                if desc.get("lang") == "en":
                    attr["description"] = (desc.text or "").strip()
                    break
            else:
                attr["description"] = ""
            # Enumerated values
            values = []
            for vs in tag.findall("values"):
                for key in vs.findall("key"):
                    kid = key.get("id", "")
                    val_text = ""
                    for v in key.findall("val"):
                        if v.get("lang") == "en":
                            val_text = (v.text or "").strip()
                            break
                    if not val_text:
                        v = key.find("val")
                        val_text = (v.text or "").strip() if v is not None else ""
                    values.append((kid, val_text))
            attr["values"] = values
            by_group.setdefault(prefix, []).append(attr)
    print(f"  Found {len(by_group)} top-level groups, {sum(len(v) for v in by_group.values())} total tags")
    return by_group


def write_system_xml(sys_id, name, used_for, cat_code, attrs, source_groups):
    """Write a normalized XML file for one metadata system."""
    cat_label = CATEGORIES[cat_code]
    root = ET.Element("metadata_system", {
        "id": f"{sys_id:03d}",
        "name": name,
        "category": cat_code,
        "category_label": cat_label,
        "used_for": used_for,
        "spec_source": f"ExifTool 12.76 — groups: {', '.join(source_groups)}",
        "spec_version": "ExifTool 12.76",
        "completeness": "comprehensive",
        "record_count": str(len(attrs)),
    })
    desc = ET.SubElement(root, "description")
    desc.text = (
        f"Attribute set for {name}. Sourced from ExifTool's tag database "
        f"(group prefix(es): {', '.join(source_groups)}). "
        f"ExifTool is the de facto cross-format metadata reference, maintained by Phil Harvey."
    )
    attrs_el = ET.SubElement(root, "attributes")
    seen = set()
    for a in attrs:
        # Deduplicate by (name, table)
        key = (a["name"], a.get("table", ""))
        if key in seen:
            continue
        seen.add(key)
        ae = ET.SubElement(attrs_el, "attribute")
        ET.SubElement(ae, "name").text = a["name"]
        if a["tag_id"]:
            ET.SubElement(ae, "tag_id").text = a["tag_id"]
        if a["data_type"]:
            ET.SubElement(ae, "data_type").text = a["data_type"]
        if a["writable"]:
            ET.SubElement(ae, "writable").text = a["writable"]
        if a["group"]:
            ET.SubElement(ae, "group").text = a["group"]
        if a.get("table"):
            ET.SubElement(ae, "subsystem").text = a["table"]
        if a["description"]:
            ET.SubElement(ae, "description").text = a["description"]
        if a["values"]:
            ve = ET.SubElement(ae, "values")
            for k, v in a["values"]:
                ET.SubElement(ve, "value", {"key": k}).text = v
    # Pretty-print
    ET.indent(root, space="  ")
    out_path = OUT_DIR / f"{sys_id:03d}_{slug(name)}.xml"
    tree = ET.ElementTree(root)
    tree.write(out_path, encoding="utf-8", xml_declaration=True)
    return out_path, len(attrs_el)


def main():
    by_group = parse_exiftool()
    written = []
    for sid, name, used_for, cat, strategy, source_key in SYSTEMS:
        if strategy != "exiftool":
            continue
        # Collect tags from all matched groups
        attrs = []
        groups_used = []
        for grp in source_key:
            if grp in by_group:
                attrs.extend(by_group[grp])
                groups_used.append(grp)
        if not attrs:
            print(f"  WARN system {sid:03d} {name}: no tags found for groups {source_key}")
            continue
        out, n = write_system_xml(sid, name, used_for, cat, attrs, groups_used)
        written.append((sid, name, n, out.name))
        print(f"  {sid:03d} {name}: {n} attributes -> {out.name}")
    print(f"\nWrote {len(written)} ExifTool-sourced XML files")
    print(f"Total attributes: {sum(w[2] for w in written)}")


if __name__ == "__main__":
    main()
