"""IPTC NewsCodes Media Topic vocabulary."""
import json, xml.etree.ElementTree as ET
from pathlib import Path
import sys
sys.path.insert(0, "/home/claude/meta/build")
from inventory import CATEGORIES

SRC = Path("/home/claude/meta/sources/raw/iptc/iptc-newscodes-mediatopic.json")
OUT = Path("/home/claude/meta/xml/044_iptc_extension_metadata.xml")


def main():
    d = json.loads(SRC.read_text())
    concepts = d.get("conceptSet", [])
    print(f"Loaded {len(concepts)} IPTC Media Topic concepts")

    # ExifTool already covers IPTC Extension via its PLUS namespace (we have 044 from ExifTool).
    # Augment that file by adding a comprehensive Media Topic section. Read existing tree:
    if OUT.exists():
        tree = ET.parse(OUT)
        root = tree.getroot()
        # Update completeness
        existing_count = int(root.get("record_count", "0"))
    else:
        root = ET.Element("metadata_system", {
            "id": "044", "name": "IPTC Extension Metadata",
            "category": "IMG", "category_label": CATEGORIES["IMG"],
            "used_for": "Advanced photo rights/workflow + News Industry Text Format vocabularies",
            "spec_source": "IPTC NewsCodes (Media Topic) + IPTC Extension PLUS",
            "spec_version": "IPTC NewsCodes 2024",
            "completeness": "comprehensive",
        })
        ET.SubElement(root, "description").text = (
            "IPTC NewsCodes is the standardized photo/news vocabulary."
        )
        ET.SubElement(root, "attributes")
        existing_count = 0

    desc_el = root.find("description")
    if desc_el is not None:
        desc_el.text = (
            "IPTC photo metadata covers two layers: (1) the per-photo IPTC Extension fields "
            "(captured via ExifTool's PLUS namespace) — model releases, property releases, "
            "image creator/supplier, registry IDs, etc.; (2) the IPTC NewsCodes controlled "
            "vocabularies — taxonomies of subject codes used by news agencies worldwide. "
            "This entry includes the full Media Topic vocabulary (1,392 concepts in a "
            "5-level hierarchy)."
        )

    attrs_el = root.find("attributes")

    # Add a separator
    sep = ET.SubElement(attrs_el, "attribute")
    ET.SubElement(sep, "name").text = "--- IPTC NewsCodes Media Topic Vocabulary ---"
    ET.SubElement(sep, "group").text = "Vocabulary Section Header"
    ET.SubElement(sep, "description").text = (
        "All Media Topic concepts published by IPTC at cv.iptc.org/newscodes/mediatopic. "
        "Each concept has a stable QCode, hierarchical broader/narrower relations, and "
        "preferred labels in multiple languages."
    )

    # Build qcode -> label map for parent lookup
    qcode_label = {}
    for c in concepts:
        q = c.get("qcode", "")
        labels = c.get("prefLabel", {})
        en = labels.get("en-GB") or labels.get("en") or labels.get("en-US") or ""
        qcode_label[q] = en

    added = 0
    for c in concepts:
        ae = ET.SubElement(attrs_el, "attribute")
        labels = c.get("prefLabel", {})
        en = labels.get("en-GB") or labels.get("en") or labels.get("en-US") or ""
        ET.SubElement(ae, "name").text = en or c.get("qcode", "")
        ET.SubElement(ae, "tag_id").text = c.get("qcode", "")
        ET.SubElement(ae, "data_type").text = "SKOS Concept"
        ET.SubElement(ae, "group").text = "Media Topic"
        # Definition
        defn = c.get("definition", {})
        if isinstance(defn, dict):
            defn_text = defn.get("en-GB") or defn.get("en") or ""
        else:
            defn_text = str(defn)
        if defn_text:
            ET.SubElement(ae, "description").text = defn_text
        # Broader (parent)
        broader = c.get("broader", [])
        if broader:
            parent_q = broader[0] if isinstance(broader, list) else broader
            if isinstance(parent_q, dict):
                parent_q = parent_q.get("uri", "").split("/")[-1]
            elif isinstance(parent_q, str):
                # Sometimes already a qcode
                if "/" in parent_q:
                    parent_q = parent_q.split("/")[-1]
            parent_label = qcode_label.get(f"medtop:{parent_q}", "")
            ET.SubElement(ae, "parent").text = f"medtop:{parent_q} ({parent_label})" if parent_label else f"medtop:{parent_q}"
        # Multilingual labels
        for lang_code, label in labels.items():
            if lang_code in ("en-GB", "en"):
                continue
            tag = "label_" + lang_code.replace("-", "_").lower()
            ET.SubElement(ae, tag).text = label
        added += 1

    new_count = existing_count + added + 1
    root.set("record_count", str(new_count))
    ET.indent(root, space="  ")
    OUT.write_bytes(ET.tostring(root, encoding="utf-8", xml_declaration=True))
    print(f"Updated {OUT.name}: was {existing_count}, added {added} Media Topic concepts → {new_count} total")


if __name__ == "__main__":
    main()
