"""
Parse FHIR R5 StructureDefinitions to extract every element of every resource + complex type.
Source: HL7 FHIR R5 normative — http://hl7.org/fhir/R5/definitions.json.zip
"""
import json
import xml.etree.ElementTree as ET
from pathlib import Path
import sys
sys.path.insert(0, "/home/claude/meta/build")
from inventory import CATEGORIES

SRC = Path("/home/claude/meta/sources/raw/fhir")
OUT = Path("/home/claude/meta/xml/217_fhir_metadata.xml")


def load_bundles():
    bundles = []
    for fname in ("profiles-resources.json", "profiles-types.json"):
        with open(SRC / fname, encoding="utf-8") as f:
            bundles.append(json.load(f))
    return bundles


def main():
    bundles = load_bundles()
    structure_defs = []
    for bundle in bundles:
        for entry in bundle.get("entry", []):
            r = entry.get("resource", {})
            if r.get("resourceType") == "StructureDefinition":
                # Only include base resource and complex-type StructureDefinitions
                if r.get("kind") in ("resource", "complex-type", "primitive-type"):
                    if r.get("derivation") in ("specialization", None):
                        structure_defs.append(r)
    print(f"Loaded {len(structure_defs)} StructureDefinitions")

    root = ET.Element("metadata_system", {
        "id": "217",
        "name": "FHIR Metadata",
        "category": "SPC",
        "category_label": CATEGORIES["SPC"],
        "used_for": "Modern healthcare data exchange (HL7 FHIR R5)",
        "spec_source": "HL7 FHIR R5 (5.0.0) — http://hl7.org/fhir/R5/definitions.json.zip",
        "spec_version": "FHIR R5 5.0.0 (build 2aecd53, 2023-03-26)",
        "completeness": "comprehensive",
    })
    ET.SubElement(root, "description").text = (
        "FHIR (Fast Healthcare Interoperability Resources) is HL7's modern healthcare "
        "data exchange standard. R5 defines 150+ resource types (Patient, Observation, "
        "MedicationRequest, etc.) and 50+ complex datatypes. Every element here is "
        "extracted directly from the official FHIR R5 normative StructureDefinition bundle. "
        "Each row identifies the resource, the element path, cardinality, type(s), short "
        "description, and binding/value-set when applicable."
    )
    attrs = ET.SubElement(root, "attributes")

    total = 0
    for sd in sorted(structure_defs, key=lambda s: (s.get("kind", ""), s.get("name", ""))):
        rname = sd.get("name", "")
        kind = sd.get("kind", "")
        snapshot = sd.get("snapshot", {}) or sd.get("differential", {})
        elements = snapshot.get("element", [])
        for e in elements:
            path = e.get("path", "")
            ae = ET.SubElement(attrs, "attribute")
            ET.SubElement(ae, "name").text = path
            ET.SubElement(ae, "group").text = f"{kind}: {rname}"
            short = e.get("short", "")
            definition = e.get("definition", "")
            desc = short
            if definition and definition != short:
                desc = f"{short} — {definition}" if short else definition
            if desc:
                ET.SubElement(ae, "description").text = desc[:1500]  # cap absurdly long

            # Cardinality
            mn = e.get("min", "")
            mx = e.get("max", "")
            if mn != "" or mx:
                ET.SubElement(ae, "cardinality").text = f"{mn}..{mx}"

            # Types (element can have multiple types like dateTime|Period)
            types = e.get("type", [])
            if types:
                tnames = []
                for t in types:
                    code = t.get("code", "")
                    profiles = t.get("targetProfile") or t.get("profile") or []
                    if profiles:
                        # Reference targets
                        target_names = [p.split("/")[-1] for p in profiles]
                        tnames.append(f"{code}({'|'.join(target_names)})")
                    else:
                        tnames.append(code)
                if tnames:
                    ET.SubElement(ae, "data_type").text = " | ".join(tnames)

            # isModifier
            if e.get("isModifier"):
                ET.SubElement(ae, "modifier").text = "true"
            if e.get("mustSupport"):
                ET.SubElement(ae, "must_support").text = "true"
            if e.get("isSummary"):
                ET.SubElement(ae, "is_summary").text = "true"

            # Binding (value set)
            binding = e.get("binding", {})
            if binding:
                strength = binding.get("strength", "")
                vs = binding.get("valueSet", "")
                if strength or vs:
                    ET.SubElement(ae, "binding").text = f"{strength}: {vs.split('/')[-1] if vs else ''}"

            total += 1

    root.set("record_count", str(total))
    ET.indent(root, space="  ")
    OUT.write_bytes(ET.tostring(root, encoding="utf-8", xml_declaration=True))
    print(f"Wrote {OUT.name}: {total} elements across {len(structure_defs)} StructureDefinitions")


if __name__ == "__main__":
    main()
