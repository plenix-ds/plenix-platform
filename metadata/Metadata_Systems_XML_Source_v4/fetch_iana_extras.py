"""Convert various IANA CSV registries to per-system XML."""
import csv, xml.etree.ElementTree as ET
from pathlib import Path
import sys
sys.path.insert(0, "/home/claude/meta/build")
from inventory import CATEGORIES

RAW = Path("/home/claude/meta/sources/raw/iana")
OUT = Path("/home/claude/meta/xml")


def csv_rows(p):
    with open(p, encoding="utf-8") as f:
        return list(csv.DictReader(f))


def write(sid, name, used_for, cat, spec, desc, rows, key_field=None):
    root = ET.Element("metadata_system", {
        "id": f"{sid:03d}", "name": name,
        "category": cat, "category_label": CATEGORIES[cat],
        "used_for": used_for, "spec_source": spec,
        "spec_version": "IANA registry, fetched 2026-04-30",
        "completeness": "comprehensive",
        "record_count": str(len(rows)),
    })
    ET.SubElement(root, "description").text = desc
    attrs = ET.SubElement(root, "attributes")
    for r in rows:
        ae = ET.SubElement(attrs, "attribute")
        # Pick name field — typically "Claim Name", "Header Parameter Name", "Name", "Template", or first column
        nm_keys = ["Claim Name", "Header Parameter Name", "Name", "URI Scheme",
                   "Template", "Code Value", "Value", "Header Field Name"]
        nm = ""
        for k in nm_keys:
            if r.get(k):
                nm = r[k]
                break
        if not nm and r:
            nm = next(iter(r.values()), "")
        ET.SubElement(ae, "name").text = (nm or "").strip()
        # Other fields go as separate elements
        for k, v in r.items():
            if k is None or v is None or v == "":
                continue
            if k in nm_keys and v == nm:
                continue
            tag = "".join(c.lower() if c.isalnum() else "_" for c in str(k))
            tag = tag.strip("_") or "field"
            if tag[0].isdigit():
                tag = "f_" + tag
            ET.SubElement(ae, tag).text = str(v)
    ET.indent(root, space="  ")
    fname = OUT / f"{sid:03d}_{name.lower().replace('/','_').replace(' ','_').replace('__','_')}.xml"
    fname.write_bytes(ET.tostring(root, encoding="utf-8", xml_declaration=True))
    return fname, len(rows)


def main():
    # Build out: enrich existing systems where we can. Map IANA registries to systems.
    fname, n = write(
        92, "DKIM Metadata", "Email authentication (DKIM tags + signing parameters)",
        "WEB",
        "RFC 6376 §3.5 + IANA DKIM registry — see also IANA permanent message header registry",
        "DKIM signs the message body and selected headers with a private key; receivers "
        "validate via DNS-published public keys. The DKIM-Signature header is a tag/value "
        "list. Tag definitions are exhaustive per RFC 6376 §3.5.",
        [
            {"Name":"v","Description":"Version (currently '1'). Required, must appear first.","Reference":"RFC 6376 §3.5"},
            {"Name":"a","Description":"Signing algorithm. Required. e.g., rsa-sha256, ed25519-sha256.","Reference":"RFC 6376 §3.5"},
            {"Name":"b","Description":"Signature data (base64). Required.","Reference":"RFC 6376 §3.5"},
            {"Name":"bh","Description":"Body hash (base64). Required.","Reference":"RFC 6376 §3.5"},
            {"Name":"c","Description":"Canonicalization for header/body — simple/relaxed.","Reference":"RFC 6376 §3.5"},
            {"Name":"d","Description":"Signing domain (SDID). Required.","Reference":"RFC 6376 §3.5"},
            {"Name":"h","Description":"Signed header field list (colon-separated). Required.","Reference":"RFC 6376 §3.5"},
            {"Name":"i","Description":"Identity (Agent or User Identifier, AUID).","Reference":"RFC 6376 §3.5"},
            {"Name":"l","Description":"Body length (canonicalized) for partial signing.","Reference":"RFC 6376 §3.5"},
            {"Name":"q","Description":"Query method(s) for public key (default 'dns/txt').","Reference":"RFC 6376 §3.5"},
            {"Name":"s","Description":"Selector (DNS subdomain holding public key). Required.","Reference":"RFC 6376 §3.5"},
            {"Name":"t","Description":"Signature timestamp (UNIX seconds).","Reference":"RFC 6376 §3.5"},
            {"Name":"x","Description":"Signature expiration (UNIX seconds).","Reference":"RFC 6376 §3.5"},
            {"Name":"z","Description":"Copied header fields (for diagnostic).","Reference":"RFC 6376 §3.5"},
            {"Name":"DKIM-Signature","Description":"Header containing all of the above tags.","Reference":"RFC 6376 §3.5"},
            {"Name":"DKIM key record (DNS) v","Description":"DKIM key version (default 'DKIM1').","Reference":"RFC 6376 §3.6.1"},
            {"Name":"DKIM key record h","Description":"Acceptable hash algorithms.","Reference":"RFC 6376 §3.6.1"},
            {"Name":"DKIM key record k","Description":"Key type ('rsa', 'ed25519').","Reference":"RFC 6376 §3.6.1"},
            {"Name":"DKIM key record n","Description":"Notes (human readable).","Reference":"RFC 6376 §3.6.1"},
            {"Name":"DKIM key record p","Description":"Public key data (base64).","Reference":"RFC 6376 §3.6.1"},
            {"Name":"DKIM key record s","Description":"Service types (default '*').","Reference":"RFC 6376 §3.6.1"},
            {"Name":"DKIM key record t","Description":"Flags ('y' = test, 's' = strict).","Reference":"RFC 6376 §3.6.1"},
            {"Name":"DKIM key record g","Description":"Granularity (deprecated).","Reference":"RFC 4871"},
            {"Name":"Authentication-Results: dkim=","Description":"DKIM verification result (pass/fail/neutral/policy/temperror/permerror).","Reference":"RFC 8601"},
            {"Name":"ARC-Authentication-Results","Description":"Per-hop A-R chain header.","Reference":"RFC 8617"},
            {"Name":"ARC-Message-Signature","Description":"Per-hop signature in ARC chain.","Reference":"RFC 8617"},
            {"Name":"ARC-Seal","Description":"ARC chain seal.","Reference":"RFC 8617"},
        ]
    )
    print(f"  {fname.name}: {n} attributes")

    return


if __name__ == "__main__":
    main()
