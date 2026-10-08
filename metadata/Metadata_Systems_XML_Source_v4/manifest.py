"""Generate a manifest showing per-system completion status."""
import xml.etree.ElementTree as ET
from pathlib import Path
import sys
sys.path.insert(0, "build")
from inventory import SYSTEMS, CATEGORIES

xml_dir = Path("xml")
existing = {}
for f in sorted(xml_dir.glob("*.xml")):
    sid = int(f.stem.split("_")[0])
    tree = ET.parse(f)
    r = tree.getroot()
    existing[sid] = {
        "filename": f.name,
        "attrs": len(r.findall("attributes/attribute")),
        "enums": len(r.findall(".//value")),
        "completeness": r.get("completeness", ""),
        "spec_source": r.get("spec_source", ""),
    }

# Write manifest as TSV
lines = ["ID\tName\tCategory\tStatus\tAttributes\tEnumValues\tSource"]
total_attrs = 0
total_enums = 0
done_count = 0
for sid, name, used_for, cat, strat, _ in SYSTEMS:
    if sid in existing:
        e = existing[sid]
        status = e["completeness"]
        attrs = e["attrs"]
        enums = e["enums"]
        src = e["spec_source"][:80]
        total_attrs += attrs
        total_enums += enums
        done_count += 1
    else:
        status = "PENDING"
        attrs = 0
        enums = 0
        src = ""
    lines.append(f"{sid:03d}\t{name}\t{CATEGORIES[cat]}\t{status}\t{attrs}\t{enums}\t{src}")

Path("MANIFEST.tsv").write_text("\n".join(lines) + "\n")

# Markdown summary
md = [
    "# Metadata Systems Build Manifest",
    "",
    f"**Status:** {done_count} of {len(SYSTEMS)} systems written ({done_count*100//len(SYSTEMS)}%)",
    f"**Total attributes:** {total_attrs:,}",
    f"**Total enumerated values:** {total_enums:,}",
    "",
    "## Per-category progress",
    "",
    "| Category | Done | Pending | Total |",
    "|---|---:|---:|---:|",
]
by_cat = {}
for sid, name, used_for, cat, *_ in SYSTEMS:
    by_cat.setdefault(cat, [0, 0])
    by_cat[cat][1] += 1
    if sid in existing:
        by_cat[cat][0] += 1
for cat, label in CATEGORIES.items():
    done, total = by_cat.get(cat, [0, 0])
    pending = total - done
    md.append(f"| {label} | {done} | {pending} | {total} |")
md.append("")
md.append("## Pending systems (to be authored in subsequent sessions)")
md.append("")
for sid, name, used_for, cat, *_ in SYSTEMS:
    if sid not in existing:
        md.append(f"- **{sid:03d}** {name} ({CATEGORIES[cat]})")

Path("MANIFEST.md").write_text("\n".join(md) + "\n")
print("Wrote MANIFEST.tsv and MANIFEST.md")
print(f"Done: {done_count}/{len(SYSTEMS)} systems")
print(f"Total attrs: {total_attrs:,}, enums: {total_enums:,}")
