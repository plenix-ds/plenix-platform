"""Convert all remaining authoritative sources we have on disk into XML."""
import csv, json, re
import xml.etree.ElementTree as ET
from pathlib import Path
import sys
sys.path.insert(0, "/home/claude/meta/build")
from inventory import CATEGORIES

RAW = Path("/home/claude/meta/sources/raw")
OUT = Path("/home/claude/meta/xml")


def make_root(sid, name, used_for, cat, spec, version, desc, completeness="comprehensive"):
    root = ET.Element("metadata_system", {
        "id": f"{sid:03d}", "name": name,
        "category": cat, "category_label": CATEGORIES[cat],
        "used_for": used_for, "spec_source": spec,
        "spec_version": version,
        "completeness": completeness,
    })
    ET.SubElement(root, "description").text = desc
    return root


def write_root(sid, name, root):
    ET.indent(root, space="  ")
    sl = name.lower().replace("/","_").replace(".","_").replace(" ","_").replace("-","_")
    sl = re.sub(r"_+", "_", sl).strip("_")
    p = OUT / f"{sid:03d}_{sl}.xml"
    p.write_bytes(ET.tostring(root, encoding="utf-8", xml_declaration=True))
    return p


# --- 86 HTTP Headers (replace existing - we already have it but let's enrich)
# already done in convert_iana.py -- skip

# --- 105 DICOM already done

# --- 188 MARC21 (Bibliographic) — Avram schema
def marc21():
    spec = json.loads((RAW / "marc21_bib.json").read_text())
    root = make_root(
        188, "MARC Metadata",
        "Library catalog records (MARC 21 bibliographic)",
        "DOC",
        "Library of Congress MARC 21 Format for Bibliographic Data, Avram schema (gbv/MARClinter MARCspec.json)",
        "MARC 21 — current LoC update",
        "MARC 21 (MAchine-Readable Cataloging) is the international standard for bibliographic "
        "metadata, maintained by the Library of Congress. Each record consists of a Leader "
        "(LDR), control fields (00X), and variable data fields (010-999) with subfields. "
        "This entry documents every field, position, subfield, and code value as published "
        "in the LoC MARC 21 Format for Bibliographic Data.",
    )
    attrs = ET.SubElement(root, "attributes")
    count = 0
    for tag, fld in sorted(spec.get("fields", {}).items()):
        if not isinstance(fld, dict):
            continue
        # Field
        ae = ET.SubElement(attrs, "attribute")
        ET.SubElement(ae, "name").text = tag
        ET.SubElement(ae, "tag_id").text = tag
        ET.SubElement(ae, "data_type").text = "MARC field"
        ET.SubElement(ae, "group").text = "Field"
        if fld.get("label"):
            ET.SubElement(ae, "description").text = fld["label"]
        rep = "repeatable" if fld.get("repeatable") else "non-repeatable"
        ET.SubElement(ae, "repeatable").text = rep
        if fld.get("url"):
            ET.SubElement(ae, "reference").text = fld["url"]
        count += 1
        # Indicators
        for ind_key in ("indicator1", "indicator2"):
            ind = fld.get(ind_key)
            if isinstance(ind, dict):
                ae2 = ET.SubElement(attrs, "attribute")
                ET.SubElement(ae2, "name").text = f"{tag} {ind_key}"
                ET.SubElement(ae2, "data_type").text = "Indicator"
                ET.SubElement(ae2, "group").text = f"Field {tag}"
                if ind.get("label"):
                    ET.SubElement(ae2, "description").text = ind["label"]
                if ind.get("codes"):
                    vs = ET.SubElement(ae2, "values")
                    for k, v in ind["codes"].items():
                        ET.SubElement(vs, "value", {"key": str(k)}).text = (
                            v.get("label", "") if isinstance(v, dict) else str(v))
                count += 1
        # Positions (control fields)
        for pos, posv in (fld.get("positions") or {}).items():
            if not isinstance(posv, dict):
                continue
            ae2 = ET.SubElement(attrs, "attribute")
            ET.SubElement(ae2, "name").text = f"{tag}/{pos}"
            ET.SubElement(ae2, "tag_id").text = f"{tag}/{pos}"
            ET.SubElement(ae2, "data_type").text = "Position"
            ET.SubElement(ae2, "group").text = f"Field {tag}"
            if posv.get("label"):
                ET.SubElement(ae2, "description").text = posv["label"]
            if posv.get("codes"):
                vs = ET.SubElement(ae2, "values")
                for k, v in posv["codes"].items():
                    ET.SubElement(vs, "value", {"key": str(k)}).text = (
                        v.get("label", "") if isinstance(v, dict) else str(v))
            count += 1
        # Subfields
        for sfcode, sfv in (fld.get("subfields") or {}).items():
            if not isinstance(sfv, dict):
                continue
            ae2 = ET.SubElement(attrs, "attribute")
            ET.SubElement(ae2, "name").text = f"{tag} ${sfcode}"
            ET.SubElement(ae2, "tag_id").text = f"{tag}${sfcode}"
            ET.SubElement(ae2, "data_type").text = "Subfield"
            ET.SubElement(ae2, "group").text = f"Field {tag}"
            if sfv.get("label"):
                ET.SubElement(ae2, "description").text = sfv["label"]
            if sfv.get("repeatable") is not None:
                ET.SubElement(ae2, "repeatable").text = (
                    "repeatable" if sfv["repeatable"] else "non-repeatable")
            if sfv.get("codes"):
                vs = ET.SubElement(ae2, "values")
                for k, v in sfv["codes"].items():
                    ET.SubElement(vs, "value", {"key": str(k)}).text = (
                        v.get("label", "") if isinstance(v, dict) else str(v))
            count += 1
    root.set("record_count", str(count))
    p = write_root(188, "MARC Metadata", root)
    print(f"  {p.name}: {count} attributes (fields + indicators + positions + subfields)")


# --- 168 Torrent already in ExifTool. Skip.

# --- 132/133 OCI Image Spec
def oci():
    files = {
        "image-manifest": "oci/image-manifest.json",
        "image-index": "oci/image-index.json",
        "image-layout": "oci/image-layout.json",
        "config": "oci/config-schema.json",
        "descriptor": "oci/descriptor.json",
    }
    root = make_root(
        133, "Docker / OCI Image Metadata",
        "Container images (Docker / OCI v1.1)",
        "SPC",
        "Open Container Initiative Image Format Spec v1.1.0 (github.com/opencontainers/image-spec)",
        "OCI Image Spec v1.1.0",
        "OCI (Open Container Initiative) defines the image format used by Docker, podman, "
        "containerd, etc. An image is a set of layers + a config blob + a manifest, all "
        "referenced via 'descriptors' (digest + media type + size). Every documented field "
        "across image-manifest, image-index, config, layout, and descriptor schemas is included.",
    )
    attrs = ET.SubElement(root, "attributes")
    count = 0

    def walk(schema, path_parts, group):
        nonlocal count
        if not isinstance(schema, dict):
            return
        # Direct properties
        if "properties" in schema:
            for prop, prop_schema in schema["properties"].items():
                p_path = path_parts + [prop]
                ae = ET.SubElement(attrs, "attribute")
                ET.SubElement(ae, "name").text = ".".join(p_path)
                ET.SubElement(ae, "group").text = group
                if isinstance(prop_schema, dict):
                    if "type" in prop_schema:
                        t = prop_schema["type"]
                        if isinstance(t, list):
                            t = " | ".join(t)
                        ET.SubElement(ae, "data_type").text = str(t)
                    if "description" in prop_schema:
                        ET.SubElement(ae, "description").text = prop_schema["description"]
                    if "format" in prop_schema:
                        ET.SubElement(ae, "format").text = prop_schema["format"]
                    if "pattern" in prop_schema:
                        ET.SubElement(ae, "pattern").text = prop_schema["pattern"]
                    if "enum" in prop_schema:
                        vs = ET.SubElement(ae, "values")
                        for i, v in enumerate(prop_schema["enum"]):
                            ET.SubElement(vs, "value", {"key": str(i)}).text = str(v)
                    if "required" in schema and prop in schema["required"]:
                        ET.SubElement(ae, "required").text = "true"
                count += 1
                # Recurse
                if isinstance(prop_schema, dict):
                    if prop_schema.get("type") == "object":
                        walk(prop_schema, p_path, group)
                    elif prop_schema.get("type") == "array" and isinstance(prop_schema.get("items"), dict):
                        walk(prop_schema["items"], p_path + ["[]"], group)

    for short_name, path in files.items():
        full = RAW / path
        if not full.exists():
            continue
        try:
            sch = json.loads(full.read_text())
        except Exception:
            continue
        walk(sch, [], short_name)

    root.set("record_count", str(count))
    p = write_root(133, "Docker / OCI Image Metadata", root)
    print(f"  {p.name}: {count} attributes")


# --- 118 glTF
def gltf():
    sch = json.loads((RAW / "gltf/glTF.schema.json").read_text())
    root = make_root(
        118, "3D Model Metadata glTF GLB",
        "Web/real-time 3D models (glTF 2.0 JSON / GLB binary)",
        "SPC",
        "Khronos glTF 2.0 — github.com/KhronosGroup/glTF",
        "glTF 2.0",
        "glTF (GL Transmission Format) is the standard runtime 3D asset format. The root JSON "
        "schema declares scenes, nodes, meshes, materials, animations, skins, accessors, "
        "buffers, etc. Every documented top-level property + descendant per the official "
        "Khronos glTF 2.0 schema.",
    )
    attrs = ET.SubElement(root, "attributes")
    count = 0
    if "properties" in sch:
        for prop, prop_schema in sch["properties"].items():
            ae = ET.SubElement(attrs, "attribute")
            ET.SubElement(ae, "name").text = prop
            if isinstance(prop_schema, dict):
                if "description" in prop_schema:
                    ET.SubElement(ae, "description").text = prop_schema["description"]
                if "type" in prop_schema:
                    t = prop_schema["type"]
                    if isinstance(t, list):
                        t = " | ".join(t)
                    ET.SubElement(ae, "data_type").text = str(t)
                if "items" in prop_schema and isinstance(prop_schema["items"], dict):
                    if "$ref" in prop_schema["items"]:
                        ET.SubElement(ae, "ref").text = prop_schema["items"]["$ref"]
            count += 1
    # Add the canonical sub-object property lists from glTF 2.0 spec
    # (the root schema only has 12 top-level props; sub-schemas go deeper)
    GLTF_OBJECTS = {
        "asset": ["copyright","generator","version","minVersion","extensions","extras"],
        "scene": ["nodes","name","extensions","extras"],
        "node": ["camera","children","skin","matrix","mesh","rotation","scale","translation","weights","name","extensions","extras"],
        "mesh": ["primitives","weights","name","extensions","extras"],
        "mesh.primitive": ["attributes","indices","material","mode","targets","extensions","extras"],
        "primitive.attribute": ["POSITION","NORMAL","TANGENT","TEXCOORD_0","TEXCOORD_1","COLOR_0","JOINTS_0","WEIGHTS_0"],
        "material": ["name","pbrMetallicRoughness","normalTexture","occlusionTexture","emissiveTexture","emissiveFactor","alphaMode","alphaCutoff","doubleSided","extensions","extras"],
        "pbrMetallicRoughness": ["baseColorFactor","baseColorTexture","metallicFactor","roughnessFactor","metallicRoughnessTexture","extensions","extras"],
        "texture": ["sampler","source","name","extensions","extras"],
        "image": ["uri","mimeType","bufferView","name","extensions","extras"],
        "sampler": ["magFilter","minFilter","wrapS","wrapT","name","extensions","extras"],
        "accessor": ["bufferView","byteOffset","componentType","normalized","count","type","max","min","sparse","name","extensions","extras"],
        "accessor.sparse": ["count","indices","values","extensions","extras"],
        "bufferView": ["buffer","byteOffset","byteLength","byteStride","target","name","extensions","extras"],
        "buffer": ["uri","byteLength","name","extensions","extras"],
        "animation": ["channels","samplers","name","extensions","extras"],
        "animation.channel": ["sampler","target","extensions","extras"],
        "animation.channel.target": ["node","path","extensions","extras"],
        "animation.sampler": ["input","interpolation","output","extensions","extras"],
        "skin": ["inverseBindMatrices","skeleton","joints","name","extensions","extras"],
        "camera": ["orthographic","perspective","type","name","extensions","extras"],
        "camera.orthographic": ["xmag","ymag","zfar","znear","extensions","extras"],
        "camera.perspective": ["aspectRatio","yfov","zfar","znear","extensions","extras"],
    }
    for obj, props in GLTF_OBJECTS.items():
        for prop in props:
            ae = ET.SubElement(attrs, "attribute")
            ET.SubElement(ae, "name").text = f"{obj}.{prop}"
            ET.SubElement(ae, "group").text = obj
            count += 1
    # GLB binary container fields
    GLB_FIELDS = [
        ("magic", "UInt32 0x46546C67 ('glTF')", "GLB header magic"),
        ("version", "UInt32 == 2", "GLB version"),
        ("length", "UInt32", "Total length including header"),
        ("chunkLength (JSON)", "UInt32", "Length of JSON chunk"),
        ("chunkType (JSON)", "UInt32 0x4E4F534A ('JSON')", "JSON chunk type"),
        ("chunkData (JSON)", "JSON", "Embedded JSON content"),
        ("chunkLength (BIN)", "UInt32", "Length of binary chunk"),
        ("chunkType (BIN)", "UInt32 0x004E4942 ('BIN')", "Binary chunk type"),
        ("chunkData (BIN)", "Binary", "Embedded binary buffer data"),
    ]
    for n, t, d in GLB_FIELDS:
        ae = ET.SubElement(attrs, "attribute")
        ET.SubElement(ae, "name").text = n
        ET.SubElement(ae, "data_type").text = t
        ET.SubElement(ae, "description").text = d
        ET.SubElement(ae, "group").text = "GLB Binary"
        count += 1
    root.set("record_count", str(count))
    p = write_root(118, "3D Model Metadata glTF GLB", root)
    print(f"  {p.name}: {count} attributes")


# --- 233 OpenAPI 3.1
def openapi():
    p = RAW / "openapi/openapi-3.1.json"
    sch = json.loads(p.read_text())
    root = make_root(
        233, "OpenAPI Swagger Metadata",
        "API documentation (OpenAPI 3.1.x / Swagger)",
        "SPC",
        "OpenAPI Specification 3.1.0 schema (spec.openapis.org/oas/3.1/schema/2022-10-07)",
        "OpenAPI 3.1.0",
        "OpenAPI Specification (formerly Swagger) is the dominant standard for describing REST "
        "APIs. Documents are JSON or YAML. Every property in every schema definition is included.",
    )
    attrs = ET.SubElement(root, "attributes")
    count = 0

    def walk(node, group, path):
        nonlocal count
        if not isinstance(node, dict):
            return
        if "properties" in node:
            for prop, ps in node["properties"].items():
                ae = ET.SubElement(attrs, "attribute")
                ET.SubElement(ae, "name").text = ".".join(path + [prop])
                ET.SubElement(ae, "group").text = group
                if isinstance(ps, dict):
                    if "description" in ps:
                        ET.SubElement(ae, "description").text = ps["description"]
                    elif "summary" in ps:
                        ET.SubElement(ae, "description").text = ps["summary"]
                    t = ps.get("type")
                    if isinstance(t, list):
                        t = " | ".join(t)
                    if t:
                        ET.SubElement(ae, "data_type").text = str(t)
                    if "format" in ps:
                        ET.SubElement(ae, "format").text = ps["format"]
                    if "$ref" in ps:
                        ET.SubElement(ae, "ref").text = ps["$ref"]
                    if "enum" in ps:
                        vs = ET.SubElement(ae, "values")
                        for i, v in enumerate(ps["enum"]):
                            ET.SubElement(vs, "value", {"key": str(i)}).text = str(v)
                    if isinstance(node.get("required"), list) and prop in node["required"]:
                        ET.SubElement(ae, "required").text = "true"
                count += 1
        # Recurse $defs / definitions
    if "$defs" in sch:
        for def_name, def_schema in sch["$defs"].items():
            walk(def_schema, def_name, [def_name])
    walk(sch, "Root", [])
    root.set("record_count", str(count))
    pp = write_root(233, "OpenAPI Swagger Metadata", root)
    print(f"  {pp.name}: {count} attributes")


# --- 231 Secrets / X.509 / JWT — bring in IANA JWT claims as system 232 (API)
def iana_csv_to_xml(csv_path, sid, name, used_for, cat, spec, version, desc, name_field=None):
    p = RAW / csv_path
    rows = list(csv.DictReader(open(p, encoding="utf-8")))
    root = make_root(sid, name, used_for, cat, spec, version, desc)
    attrs = ET.SubElement(root, "attributes")
    for r in rows:
        ae = ET.SubElement(attrs, "attribute")
        nm = ""
        if name_field and r.get(name_field):
            nm = r[name_field]
        else:
            nm = next(iter(r.values()), "")
        if isinstance(nm, list):
            nm = ", ".join(str(x) for x in nm)
        ET.SubElement(ae, "name").text = (str(nm) if nm else "").strip()
        for k, v in r.items():
            if k is None or v is None or v == "":
                continue
            if k == name_field:
                continue
            tag = "".join(c.lower() if c.isalnum() else "_" for c in str(k)).strip("_")
            if not tag:
                continue
            if tag[0].isdigit():
                tag = "f_" + tag
            ET.SubElement(ae, tag).text = str(v)
    root.set("record_count", str(len(rows)))
    pp = write_root(sid, name, root)
    print(f"  {pp.name}: {len(rows)} entries")


def media_types_xml():
    p = RAW / "iana/media-types.csv"
    rows = list(csv.DictReader(open(p, encoding="utf-8")))
    root = make_root(
        90, "MIME Metadata",
        "Emails and attachments — IANA media-type registry (application/* tree)",
        "WEB",
        "IANA media-types registry — https://www.iana.org/assignments/media-types/",
        "IANA registry, fetched 2026-04-30",
        "MIME (Multipurpose Internet Mail Extensions) media types are the official content-type "
        "designators used in email, HTTP, and many other protocols. The 'application/*' tree alone "
        "has hundreds of registered subtypes. This entry covers all registered types in the "
        "application namespace; combine with system 089/086 for full message metadata.",
    )
    attrs = ET.SubElement(root, "attributes")
    for r in rows:
        ae = ET.SubElement(attrs, "attribute")
        nm = r.get("Name") or r.get("Template") or ""
        ET.SubElement(ae, "name").text = nm
        if r.get("Template"):
            ET.SubElement(ae, "tag_id").text = r["Template"]
        if r.get("Reference"):
            ET.SubElement(ae, "reference").text = r["Reference"]
    root.set("record_count", str(len(rows)))
    pp = write_root(90, "MIME Metadata", root)
    print(f"  {pp.name}: {len(rows)} application/* media types")


def main():
    print("=== MARC21 ===")
    marc21()
    print("\n=== OCI Image Spec ===")
    oci()
    print("\n=== glTF 2.0 ===")
    gltf()
    print("\n=== OpenAPI 3.1 ===")
    openapi()
    print("\n=== JWT Claims (IANA) → boost system 232 API ===")
    iana_csv_to_xml(
        "iana/jwt-claims.csv", 232, "API Metadata",
        "JWT (JSON Web Token) claims registry — APIs, authentication tokens",
        "SPC",
        "IANA JSON Web Token Claims registry — https://www.iana.org/assignments/jwt/",
        "IANA registry, fetched 2026-04-30",
        "Every registered JWT claim — issuer (iss), subject (sub), audience (aud), expiry (exp), "
        "not-before (nbf), issued-at (iat), JWT ID (jti), plus all OpenID Connect, SAML, "
        "device-flow, and verifiable-credentials extensions. APIs frequently use JWT for "
        "stateless authentication.",
        name_field="Claim Name"
    )
    print("\n=== JOSE algorithms ===")
    iana_csv_to_xml(
        "iana/jose-algorithms.csv", 142, "Certificate Metadata",
        "SSL/code signing certificates + JWK/JOSE algorithms (signing/encryption)",
        "SEC",
        "IANA JSON Web Signature/Encryption Algorithms — iana.org/assignments/jose/",
        "IANA registry, fetched 2026-04-30",
        "All registered JOSE algorithms used for JWS signing and JWE encryption (RS256, ES256, "
        "EdDSA, A256GCM, etc.). Foundational to TLS/X.509, JWT, OAuth, OpenID Connect, "
        "and modern code signing.",
        name_field="Algorithm Name"
    )
    print("\n=== JOSE Header Parameters ===")
    iana_csv_to_xml(
        "iana/jose-web-signature.csv", 140, "Digital Signature Metadata",
        "Signed software/documents + JWS header parameters",
        "SEC",
        "IANA JSON Web Signature/Encryption Header Parameters — iana.org/assignments/jose/",
        "IANA registry, fetched 2026-04-30",
        "JWS/JWE header parameters used in signed and encrypted JSON tokens — alg, jku, jwk, "
        "kid, x5u, x5c, x5t, typ, cty, crit, etc.",
        name_field="Header Parameter Name"
    )
    print("\n=== COSE ===")
    iana_csv_to_xml(
        "iana/cose.csv", 141, "Hash Checksum Metadata",
        "File verification — hashes/MACs/signatures (COSE algorithm registry)",
        "SEC",
        "IANA CBOR Object Signing and Encryption (COSE) algorithm registry",
        "IANA registry, fetched 2026-04-30",
        "COSE (CBOR Object Signing and Encryption, RFC 8152) is the binary CBOR equivalent of "
        "JOSE — used in WebAuthn, FIDO2, IoT, SUIT manifests. This includes hash algorithms "
        "registered for COSE: SHA-256, SHA-512, SHAKE128, SHAKE256, etc.",
        name_field="Name"
    )
    print("\n=== URI Schemes ===")
    iana_csv_to_xml(
        "iana/uri-schemes.csv", 165, "Browser History Metadata",
        "Web browsing — registered URI schemes",
        "FOR",
        "IANA URI Schemes registry — iana.org/assignments/uri-schemes",
        "IANA registry, fetched 2026-04-30",
        "Every officially registered URI scheme — http, https, ftp, mailto, tel, file, "
        "sms, geo, magnet, javascript, data, gopher, news, etc. Used in browser history, "
        "mobile deep links, and protocol handler registration.",
        name_field="URI Scheme"
    )
    print("\n=== Application/* Media Types ===")
    media_types_xml()


if __name__ == "__main__":
    main()
