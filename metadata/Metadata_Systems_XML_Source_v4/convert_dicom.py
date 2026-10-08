"""Convert pydicom's DICOM dictionary into normalized XML."""

import xml.etree.ElementTree as ET
from pathlib import Path
from pydicom.datadict import DicomDictionary
from inventory import slug

OUT = Path("/home/claude/meta/xml") / "105_dicom_metadata.xml"

# DICOM VR (Value Representation) decoder
VR_MAP = {
    "AE": "Application Entity (16 chars max)",
    "AS": "Age String (4 chars: nnnD/W/M/Y)",
    "AT": "Attribute Tag (4 bytes)",
    "CS": "Code String (16 chars max)",
    "DA": "Date (YYYYMMDD)",
    "DS": "Decimal String (16 chars max)",
    "DT": "Date Time (YYYYMMDDHHMMSS.FFFFFF&ZZXX)",
    "FL": "Floating Point Single (4 bytes)",
    "FD": "Floating Point Double (8 bytes)",
    "IS": "Integer String (12 chars max)",
    "LO": "Long String (64 chars max)",
    "LT": "Long Text (10240 chars max)",
    "OB": "Other Byte (binary)",
    "OD": "Other Double",
    "OF": "Other Float",
    "OL": "Other Long",
    "OW": "Other Word (binary)",
    "OV": "Other 64-bit Very Long",
    "PN": "Person Name (5 components, ^ separated)",
    "SH": "Short String (16 chars max)",
    "SL": "Signed Long (4 bytes)",
    "SQ": "Sequence of Items (nested dataset)",
    "SS": "Signed Short (2 bytes)",
    "ST": "Short Text (1024 chars max)",
    "SV": "Signed 64-bit Very Long",
    "TM": "Time (HHMMSS.FFFFFF)",
    "UC": "Unlimited Characters",
    "UI": "Unique Identifier (UID, 64 chars max)",
    "UL": "Unsigned Long (4 bytes)",
    "UN": "Unknown (binary)",
    "UR": "URI/URL",
    "US": "Unsigned Short (2 bytes)",
    "UT": "Unlimited Text",
    "UV": "Unsigned 64-bit Very Long",
}


def main():
    items = sorted(DicomDictionary.items(), key=lambda x: x[0])
    root = ET.Element("metadata_system", {
        "id": "105",
        "name": "DICOM Metadata",
        "category": "SPC",
        "category_label": "Specialized",
        "used_for": "Medical imaging (CT, MRI, X-ray, ultrasound, PET, etc.)",
        "spec_source": "NEMA DICOM Standard PS3.6 — Data Dictionary",
        "spec_version": "pydicom dictionary (current)",
        "completeness": "comprehensive",
        "record_count": str(len(items)),
    })
    ET.SubElement(root, "description").text = (
        "DICOM (Digital Imaging and Communications in Medicine) data elements as defined "
        "in NEMA PS3.6. Every element has a 32-bit tag (group, element) pair, a Value "
        "Representation (VR) defining data type, a Value Multiplicity (VM), and a keyword. "
        "Sourced from pydicom's DicomDictionary which mirrors the official NEMA registry."
    )
    attrs = ET.SubElement(root, "attributes")
    for tag, info in items:
        vr, vm, name, retired, keyword = info
        group = (tag >> 16) & 0xFFFF
        element = tag & 0xFFFF
        ae = ET.SubElement(attrs, "attribute")
        ET.SubElement(ae, "name").text = name or keyword
        ET.SubElement(ae, "tag_id").text = f"({group:04X},{element:04X})"
        ET.SubElement(ae, "keyword").text = keyword
        if vr:
            ET.SubElement(ae, "data_type").text = f"{vr} — {VR_MAP.get(vr, 'unknown VR')}"
        if vm:
            ET.SubElement(ae, "value_multiplicity").text = vm
        if retired and "Retired" in str(retired):
            ET.SubElement(ae, "status").text = "retired"
        else:
            ET.SubElement(ae, "status").text = "active"
        # Group prefix tells you the module (e.g. 0010 = patient, 0008 = general study)
        ET.SubElement(ae, "group").text = f"Group {group:04X}"
    ET.indent(root, space="  ")
    OUT.write_bytes(ET.tostring(root, encoding="utf-8", xml_declaration=True))
    print(f"Wrote {OUT.name}: {len(items)} DICOM elements")


if __name__ == "__main__":
    main()
