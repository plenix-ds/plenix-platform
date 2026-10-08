"""Convert IANA CSV registries into normalized XML files."""

import csv
import xml.etree.ElementTree as ET
from pathlib import Path

PERM = Path("/home/claude/meta/sources/iana_perm_headers.csv")
HTTP = Path("/home/claude/meta/sources/iana_http_fields.csv")
OUT_DIR = Path("/home/claude/meta/xml")


def rows(csv_path):
    with open(csv_path, newline='', encoding='utf-8') as f:
        return list(csv.DictReader(f))


def write_xml(sys_id, name, used_for, cat, cat_label, source_desc, attribute_records, out_name):
    root = ET.Element("metadata_system", {
        "id": f"{sys_id:03d}",
        "name": name,
        "category": cat,
        "category_label": cat_label,
        "used_for": used_for,
        "spec_source": source_desc,
        "spec_version": "IANA registry, fetched 2026-04-30",
        "completeness": "comprehensive",
        "record_count": str(len(attribute_records)),
    })
    ET.SubElement(root, "description").text = (
        f"Authoritative attribute set sourced from IANA's published registry. "
        f"Each entry corresponds to a registered field name with its standardization status "
        f"and defining RFC reference."
    )
    attrs = ET.SubElement(root, "attributes")
    for rec in attribute_records:
        ae = ET.SubElement(attrs, "attribute")
        for k, v in rec.items():
            if k is None or v is None or v == "":
                continue
            if isinstance(v, list):
                v = "; ".join(str(x) for x in v)
            tag = str(k).lower().replace(" ", "_").replace("-", "_")
            tag = "".join(c if c.isalnum() or c == "_" else "_" for c in tag)
            if tag and tag[0].isdigit():
                tag = "f_" + tag
            if not tag:
                tag = "value"
            ET.SubElement(ae, tag).text = str(v)
    ET.indent(root, space="  ")
    path = OUT_DIR / out_name
    path.write_bytes(ET.tostring(root, encoding="utf-8", xml_declaration=True))
    return path


def main():
    perm = rows(PERM)
    http = rows(HTTP)
    print(f"IANA perm headers: {len(perm)}")
    print(f"IANA HTTP fields:  {len(http)}")

    # Email headers: protocol == 'mail' or 'netnews'
    email = [r for r in perm if r.get('Protocol', '').strip() in ('mail', 'netnews')]
    mime  = [r for r in perm if r.get('Protocol', '').strip() in ('MIME', 'mime')]

    p = write_xml(
        89, "Email Headers", "Emails", "WEB", "Web / Email",
        "IANA Permanent Message Header Field Names registry "
        "(https://www.iana.org/assignments/message-headers/)",
        email, "089_email_headers.xml"
    )
    print(f"  -> {p.name}: {len(email)} email/netnews headers")

    p = write_xml(
        90, "MIME Metadata", "Emails and attachments", "WEB", "Web / Email",
        "IANA Permanent Message Header Field Names registry — MIME entries "
        "(https://www.iana.org/assignments/message-headers/)",
        mime, "090_mime_metadata.xml"
    )
    print(f"  -> {p.name}: {len(mime)} MIME headers")

    p = write_xml(
        86, "HTTP Header Metadata", "Web/server responses", "WEB", "Web / Email",
        "IANA HTTP Field Name Registry "
        "(https://www.iana.org/assignments/http-fields/)",
        http, "086_http_header_metadata.xml"
    )
    print(f"  -> {p.name}: {len(http)} HTTP fields")


if __name__ == "__main__":
    main()
