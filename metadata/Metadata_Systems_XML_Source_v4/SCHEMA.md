# Metadata Systems — Canonical XML Schema

Each system gets one XML file: `NNN_system_slug.xml`

## Schema

```xml
<?xml version="1.0" encoding="UTF-8"?>
<metadata_system
    id="045"
    name="EXIF Metadata"
    category="IMG"
    category_label="Images"
    used_for="Photos/images"
    spec_source="https://exiftool.org/TagNames/EXIF.html"
    spec_version="ExifTool 12.76"
    completeness="comprehensive"
    record_count="278">

  <description>
    Free-form text describing what this system is and where it's found.
  </description>

  <attributes>
    <attribute>
      <name>Make</name>                    <!-- canonical attribute name -->
      <tag_id>0x010F</tag_id>              <!-- optional: numeric tag/ID -->
      <data_type>ASCII string</data_type>  <!-- type per spec -->
      <writable>true</writable>            <!-- optional -->
      <required>false</required>           <!-- optional: required by spec -->
      <group>IFD0</group>                  <!-- optional: subgroup -->
      <description>Camera manufacturer name</description>
      <values>                             <!-- optional: enum values -->
        <value key="0">Off</value>
        <value key="1">On</value>
      </values>
      <notes>Optional notes</notes>
    </attribute>
    ...
  </attributes>
</metadata_system>
```

## Field meanings

- `id` — zero-padded system number (001–240)
- `category` — short code (OS, DOC, IMG, AUD, VID, WEB, ARC, CLD, SEC, SPC, FOR, BIZ, AI)
- `completeness` — one of:
    - `comprehensive` — every documented attribute from authoritative source
    - `substantial` — most documented attributes, may miss vendor extensions
    - `representative` — common attributes, not exhaustive
    - `partial` — known incomplete; pointer to spec for full list
- `spec_source` — URL or citation to the authoritative source
- `record_count` — count of `<attribute>` elements (computed)

Fields beyond `name` and `description` are optional; not every system has tag IDs, data types, or enumerated values.
