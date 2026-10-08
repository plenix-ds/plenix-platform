"""Shared helpers for manual XML batches."""
import xml.etree.ElementTree as ET
from pathlib import Path
from inventory import slug, CATEGORIES

OUT = Path("/home/claude/meta/xml")

def W(sid, name, used_for, cat, spec, completeness, desc, attrs):
    """Compact writer. attrs: list of dicts (name, type?, tag_id?, group?, description?, values?, required?)."""
    root = ET.Element("metadata_system", {
        "id": f"{sid:03d}", "name": name, "category": cat,
        "category_label": CATEGORIES[cat], "used_for": used_for,
        "spec_source": spec, "completeness": completeness,
        "record_count": str(len(attrs)),
    })
    ET.SubElement(root, "description").text = desc
    ae_root = ET.SubElement(root, "attributes")
    for a in attrs:
        ae = ET.SubElement(ae_root, "attribute")
        ET.SubElement(ae, "name").text = a["name"]
        for k in ("tag_id","type","required","group","description"):
            if a.get(k):
                tag = "data_type" if k=="type" else k
                ET.SubElement(ae, tag).text = str(a[k])
        if a.get("values"):
            ve = ET.SubElement(ae, "values")
            for k,v in a["values"]:
                ET.SubElement(ve, "value", {"key": str(k)}).text = str(v)
    ET.indent(root, space="  ")
    p = OUT / f"{sid:03d}_{slug(name)}.xml"
    p.write_bytes(ET.tostring(root, encoding="utf-8", xml_declaration=True))
    return p, len(attrs)

def D(name, **kw):
    """Shorthand attribute builder."""
    kw["name"] = name
    return kw
