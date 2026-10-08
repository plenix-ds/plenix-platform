"""Manual XML authoring batch 1: Windows OS / file system metadata."""

import xml.etree.ElementTree as ET
from pathlib import Path
from inventory import slug, CATEGORIES

OUT = Path("/home/claude/meta/xml")


def write(sid, name, used_for, cat, spec, completeness, desc, attributes):
    """attributes = list of dicts with keys: name, type?, required?, description, group?, values?"""
    root = ET.Element("metadata_system", {
        "id": f"{sid:03d}",
        "name": name,
        "category": cat,
        "category_label": CATEGORIES[cat],
        "used_for": used_for,
        "spec_source": spec,
        "completeness": completeness,
        "record_count": str(len(attributes)),
    })
    ET.SubElement(root, "description").text = desc
    attrs = ET.SubElement(root, "attributes")
    for a in attributes:
        ae = ET.SubElement(attrs, "attribute")
        ET.SubElement(ae, "name").text = a["name"]
        if a.get("tag_id"):
            ET.SubElement(ae, "tag_id").text = a["tag_id"]
        if a.get("type"):
            ET.SubElement(ae, "data_type").text = a["type"]
        if a.get("required"):
            ET.SubElement(ae, "required").text = a["required"]
        if a.get("group"):
            ET.SubElement(ae, "group").text = a["group"]
        if a.get("description"):
            ET.SubElement(ae, "description").text = a["description"]
        if a.get("values"):
            ve = ET.SubElement(ae, "values")
            for k, v in a["values"]:
                ET.SubElement(ve, "value", {"key": str(k)}).text = v
    ET.indent(root, space="  ")
    out_path = OUT / f"{sid:03d}_{slug(name)}.xml"
    out_path.write_bytes(ET.tostring(root, encoding="utf-8", xml_declaration=True))
    return out_path, len(attributes)


# ============================================================================
# 001 — Windows Property System
# Source: Microsoft "Windows Properties" reference (System.* property keys).
# Comprehensive: covers core System.* canonical properties.
# ============================================================================
WIN_PROPS = [
    # Core file system properties
    {"name": "System.FileName", "type": "String", "group": "Core", "description": "The complete file name including extension"},
    {"name": "System.FileExtension", "type": "String", "group": "Core", "description": "The file's extension including the leading period"},
    {"name": "System.FileAttributes", "type": "UInt32", "group": "Core", "description": "Bitfield: read-only, hidden, system, archive, etc."},
    {"name": "System.FileOwner", "type": "String", "group": "Core", "description": "User who owns the file (NTFS owner SID resolved to name)"},
    {"name": "System.Size", "type": "UInt64", "group": "Core", "description": "Size of the file in bytes"},
    {"name": "System.SizeOnDisk", "type": "UInt64", "group": "Core", "description": "Actual disk space used (allocation unit aligned)"},
    {"name": "System.DateCreated", "type": "FILETIME", "group": "Core", "description": "Date and time the file was created on this filesystem"},
    {"name": "System.DateModified", "type": "FILETIME", "group": "Core", "description": "Date and time the file's content was last modified"},
    {"name": "System.DateAccessed", "type": "FILETIME", "group": "Core", "description": "Date and time the file was last accessed"},
    {"name": "System.DateImported", "type": "FILETIME", "group": "Core", "description": "Date and time the item was imported"},
    {"name": "System.DateAcquired", "type": "FILETIME", "group": "Core", "description": "Date and time the item was acquired"},
    {"name": "System.ItemAuthors", "type": "String[]", "group": "Core", "description": "Authors of the item"},
    {"name": "System.Author", "type": "String[]", "group": "Core", "description": "Document or content author(s)"},
    {"name": "System.Title", "type": "String", "group": "Core", "description": "Title of the item"},
    {"name": "System.Subject", "type": "String", "group": "Core", "description": "Subject of the item"},
    {"name": "System.Keywords", "type": "String[]", "group": "Core", "description": "Tags / keywords"},
    {"name": "System.Comment", "type": "String", "group": "Core", "description": "Comments about the item"},
    {"name": "System.Rating", "type": "UInt32", "group": "Core", "description": "User rating (1-99 mapped to 1-5 stars)"},
    {"name": "System.Copyright", "type": "String", "group": "Core", "description": "Copyright information"},
    {"name": "System.Company", "type": "String", "group": "Core", "description": "Company associated with the file"},
    {"name": "System.ItemTypeText", "type": "String", "group": "Core", "description": "Friendly file type description"},
    {"name": "System.ItemType", "type": "String", "group": "Core", "description": "Programmatic file type identifier"},
    {"name": "System.ItemPathDisplay", "type": "String", "group": "Core", "description": "Full path to the item shown in UI"},
    {"name": "System.ItemNameDisplay", "type": "String", "group": "Core", "description": "Display name of the item"},
    {"name": "System.ItemUrl", "type": "String", "group": "Core", "description": "URL to the item"},
    {"name": "System.MIMEType", "type": "String", "group": "Core", "description": "MIME content type"},
    {"name": "System.ContentStatus", "type": "String", "group": "Core", "description": "Editorial status (Draft, Final, etc.)"},
    {"name": "System.ContentType", "type": "String", "group": "Core", "description": "Content type"},
    {"name": "System.ApplicationName", "type": "String", "group": "Core", "description": "Application that produced the file"},
    {"name": "System.Category", "type": "String[]", "group": "Core", "description": "User-defined categories"},
    # Document properties
    {"name": "System.Document.LastAuthor", "type": "String", "group": "Document", "description": "User who last edited the document"},
    {"name": "System.Document.RevisionNumber", "type": "String", "group": "Document", "description": "Revision number"},
    {"name": "System.Document.Version", "type": "String", "group": "Document", "description": "Document version"},
    {"name": "System.Document.PageCount", "type": "Int32", "group": "Document", "description": "Number of pages"},
    {"name": "System.Document.WordCount", "type": "Int32", "group": "Document", "description": "Word count"},
    {"name": "System.Document.CharacterCount", "type": "Int32", "group": "Document", "description": "Character count"},
    {"name": "System.Document.LineCount", "type": "Int32", "group": "Document", "description": "Line count"},
    {"name": "System.Document.ParagraphCount", "type": "Int32", "group": "Document", "description": "Paragraph count"},
    {"name": "System.Document.SlideCount", "type": "Int32", "group": "Document", "description": "Number of slides (presentations)"},
    {"name": "System.Document.HiddenSlideCount", "type": "Int32", "group": "Document", "description": "Number of hidden slides"},
    {"name": "System.Document.NoteCount", "type": "Int32", "group": "Document", "description": "Number of notes/comments"},
    {"name": "System.Document.ByteCount", "type": "Int32", "group": "Document", "description": "Document size in bytes"},
    {"name": "System.Document.PresentationFormat", "type": "String", "group": "Document", "description": "Presentation format (e.g., 35mm, On-screen Show)"},
    {"name": "System.Document.Manager", "type": "String", "group": "Document", "description": "Manager listed for the document"},
    {"name": "System.Document.Template", "type": "String", "group": "Document", "description": "Template used"},
    {"name": "System.Document.DocumentID", "type": "String", "group": "Document", "description": "Unique document identifier"},
    {"name": "System.Document.DateCreated", "type": "FILETIME", "group": "Document", "description": "Creation date stored in document"},
    {"name": "System.Document.DateSaved", "type": "FILETIME", "group": "Document", "description": "Last save date stored in document"},
    {"name": "System.Document.DatePrinted", "type": "FILETIME", "group": "Document", "description": "Last print date"},
    {"name": "System.Document.TotalEditingTime", "type": "UInt64", "group": "Document", "description": "Total time spent editing"},
    {"name": "System.Document.Security", "type": "Int32", "group": "Document", "description": "Document security level"},
    # Image properties
    {"name": "System.Image.HorizontalSize", "type": "UInt32", "group": "Image", "description": "Width in pixels"},
    {"name": "System.Image.VerticalSize", "type": "UInt32", "group": "Image", "description": "Height in pixels"},
    {"name": "System.Image.HorizontalResolution", "type": "Double", "group": "Image", "description": "Horizontal DPI"},
    {"name": "System.Image.VerticalResolution", "type": "Double", "group": "Image", "description": "Vertical DPI"},
    {"name": "System.Image.BitDepth", "type": "UInt32", "group": "Image", "description": "Bits per pixel"},
    {"name": "System.Image.Dimensions", "type": "String", "group": "Image", "description": "Display dimensions string"},
    {"name": "System.Image.ColorSpace", "type": "UInt16", "group": "Image", "description": "Color space"},
    {"name": "System.Image.CompressionText", "type": "String", "group": "Image", "description": "Compression description"},
    # Photo properties
    {"name": "System.Photo.CameraManufacturer", "type": "String", "group": "Photo", "description": "Camera maker (mirrors EXIF Make)"},
    {"name": "System.Photo.CameraModel", "type": "String", "group": "Photo", "description": "Camera model"},
    {"name": "System.Photo.DateTaken", "type": "FILETIME", "group": "Photo", "description": "When the photo was taken"},
    {"name": "System.Photo.ExposureTime", "type": "Double", "group": "Photo", "description": "Shutter speed in seconds"},
    {"name": "System.Photo.FNumber", "type": "Double", "group": "Photo", "description": "Aperture f-number"},
    {"name": "System.Photo.ISOSpeed", "type": "UInt16", "group": "Photo", "description": "ISO sensitivity"},
    {"name": "System.Photo.FocalLength", "type": "Double", "group": "Photo", "description": "Lens focal length in mm"},
    {"name": "System.Photo.FlashFired", "type": "Boolean", "group": "Photo", "description": "Whether the flash fired"},
    {"name": "System.Photo.WhiteBalance", "type": "UInt16", "group": "Photo", "description": "White balance setting"},
    {"name": "System.Photo.Orientation", "type": "UInt16", "group": "Photo", "description": "Image orientation (1-8)"},
    {"name": "System.Photo.PeopleNames", "type": "String[]", "group": "Photo", "description": "People tagged in the photo"},
    # Music properties
    {"name": "System.Music.Artist", "type": "String[]", "group": "Music", "description": "Performing artists"},
    {"name": "System.Music.AlbumArtist", "type": "String", "group": "Music", "description": "Album artist"},
    {"name": "System.Music.AlbumTitle", "type": "String", "group": "Music", "description": "Album name"},
    {"name": "System.Music.TrackNumber", "type": "UInt32", "group": "Music", "description": "Track position on album"},
    {"name": "System.Music.Genre", "type": "String[]", "group": "Music", "description": "Musical genre(s)"},
    {"name": "System.Music.Composer", "type": "String[]", "group": "Music", "description": "Composer(s)"},
    {"name": "System.Music.Conductor", "type": "String[]", "group": "Music", "description": "Conductor(s)"},
    {"name": "System.Music.Period", "type": "String", "group": "Music", "description": "Period (Baroque, Classical, etc.)"},
    {"name": "System.Music.Mood", "type": "String[]", "group": "Music", "description": "Mood tags"},
    {"name": "System.Music.PartOfSet", "type": "String", "group": "Music", "description": "Disc number / total"},
    {"name": "System.Music.BeatsPerMinute", "type": "String", "group": "Music", "description": "BPM"},
    {"name": "System.Music.IsCompilation", "type": "Boolean", "group": "Music", "description": "Compilation album flag"},
    # Media common
    {"name": "System.Media.Duration", "type": "UInt64", "group": "Media", "description": "Duration in 100-ns units"},
    {"name": "System.Media.SubTitle", "type": "String", "group": "Media", "description": "Subtitle"},
    {"name": "System.Media.Year", "type": "UInt32", "group": "Media", "description": "Year"},
    {"name": "System.Media.ContentDistributor", "type": "String", "group": "Media", "description": "Distributor of content"},
    {"name": "System.Media.Producer", "type": "String[]", "group": "Media", "description": "Producer(s)"},
    {"name": "System.Media.Publisher", "type": "String", "group": "Media", "description": "Publisher"},
    {"name": "System.Media.Writer", "type": "String[]", "group": "Media", "description": "Writer(s)"},
    {"name": "System.Media.EncodedBy", "type": "String", "group": "Media", "description": "Encoder identification"},
    {"name": "System.Media.AverageLevel", "type": "UInt32", "group": "Media", "description": "Average audio level"},
    # Video
    {"name": "System.Video.FrameWidth", "type": "UInt32", "group": "Video", "description": "Video width in pixels"},
    {"name": "System.Video.FrameHeight", "type": "UInt32", "group": "Video", "description": "Video height in pixels"},
    {"name": "System.Video.FrameRate", "type": "UInt32", "group": "Video", "description": "Frames per second × 1000"},
    {"name": "System.Video.HorizontalAspectRatio", "type": "UInt32", "group": "Video", "description": "Horizontal AR component"},
    {"name": "System.Video.VerticalAspectRatio", "type": "UInt32", "group": "Video", "description": "Vertical AR component"},
    {"name": "System.Video.EncodingBitrate", "type": "UInt32", "group": "Video", "description": "Total bitrate (bps)"},
    {"name": "System.Video.SampleSize", "type": "UInt32", "group": "Video", "description": "Sample size in bits"},
    {"name": "System.Video.StreamName", "type": "String", "group": "Video", "description": "Stream name"},
    {"name": "System.Video.Compression", "type": "String", "group": "Video", "description": "Codec name"},
    # GPS
    {"name": "System.GPS.Latitude", "type": "Double[]", "group": "GPS", "description": "Latitude (degrees, minutes, seconds)"},
    {"name": "System.GPS.LatitudeRef", "type": "String", "group": "GPS", "description": "N or S"},
    {"name": "System.GPS.Longitude", "type": "Double[]", "group": "GPS", "description": "Longitude (D, M, S)"},
    {"name": "System.GPS.LongitudeRef", "type": "String", "group": "GPS", "description": "E or W"},
    {"name": "System.GPS.Altitude", "type": "Double", "group": "GPS", "description": "Altitude in meters"},
    {"name": "System.GPS.AltitudeRef", "type": "Byte", "group": "GPS", "description": "0=above sea level, 1=below"},
    {"name": "System.GPS.Date", "type": "FILETIME", "group": "GPS", "description": "GPS timestamp"},
    # Communication / contact
    {"name": "System.Contact.FirstName", "type": "String", "group": "Contact", "description": "Given name"},
    {"name": "System.Contact.LastName", "type": "String", "group": "Contact", "description": "Family name"},
    {"name": "System.Contact.FullName", "type": "String", "group": "Contact", "description": "Full display name"},
    {"name": "System.Contact.EmailAddress", "type": "String", "group": "Contact", "description": "Primary email"},
    {"name": "System.Contact.TelephoneNumber", "type": "String", "group": "Contact", "description": "Primary phone"},
    {"name": "System.Contact.Birthday", "type": "FILETIME", "group": "Contact", "description": "Date of birth"},
    {"name": "System.Contact.JobTitle", "type": "String", "group": "Contact", "description": "Job title"},
    # Software
    {"name": "System.Software.DateLastUsed", "type": "FILETIME", "group": "Software", "description": "Last execution date"},
    {"name": "System.Software.ProductName", "type": "String", "group": "Software", "description": "Product name from version info"},
    # Search
    {"name": "System.Search.AutoSummary", "type": "String", "group": "Search", "description": "Auto-generated summary"},
    {"name": "System.Search.Contents", "type": "String", "group": "Search", "description": "Indexed text content"},
    {"name": "System.Search.EntryID", "type": "Int32", "group": "Search", "description": "Search index entry ID"},
    {"name": "System.Search.HitCount", "type": "Int32", "group": "Search", "description": "Hit count"},
    # Identity
    {"name": "System.ComputerName", "type": "String", "group": "Identity", "description": "Computer name"},
    {"name": "System.Kind", "type": "String[]", "group": "Identity", "description": "Item kind (Document, Picture, Music, Video, etc.)"},
    {"name": "System.KindText", "type": "String", "group": "Identity", "description": "Localized kind"},
    {"name": "System.Identity", "type": "String", "group": "Identity", "description": "Identity"},
    # Sharing
    {"name": "System.SharedWith", "type": "String[]", "group": "Sharing", "description": "Users with whom item is shared"},
    {"name": "System.SharingStatus", "type": "Int32", "group": "Sharing", "description": "Sharing status enum"},
    # Sensitive content
    {"name": "System.Sensitivity", "type": "UInt16", "group": "Security", "description": "Sensitivity (Normal, Personal, Private, Confidential)"},
    {"name": "System.SecurityAllowedEnterpriseDataProtectionIdentities", "type": "String[]", "group": "Security", "description": "EDP identities permitted"},
]


def main():
    paths = []
    p, n = write(
        1, "Windows Property System",
        "Windows-visible file properties (System.* property keys)",
        "OS",
        "Microsoft Windows Properties reference (learn.microsoft.com/windows/win32/properties/props)",
        "substantial",
        "Microsoft's unified property system used by Explorer, Search, and the Property Handler "
        "infrastructure. Properties are keyed by canonical names (System.*) and surfaced uniformly "
        "across file types via property handlers. The full Windows Property System defines several "
        "thousand properties; this set covers the most commonly-used ones across files, documents, "
        "media, photos, and contacts.",
        WIN_PROPS
    )
    paths.append((p, n))
    print(f"  001 Windows Property System: {n} attributes")

    # 002 — NTFS File Data
    NTFS = [
        # Standard Information attribute (0x10)
        {"name": "Creation Time", "tag_id": "0x10:STANDARD_INFORMATION", "type": "FILETIME (8 bytes)", "group": "$STANDARD_INFORMATION", "description": "When the file was created on this volume"},
        {"name": "File Last Modified Time", "tag_id": "0x10", "type": "FILETIME", "group": "$STANDARD_INFORMATION", "description": "When the file content was last modified"},
        {"name": "MFT Last Modified Time", "tag_id": "0x10", "type": "FILETIME", "group": "$STANDARD_INFORMATION", "description": "When the MFT record was last changed"},
        {"name": "Last Access Time", "tag_id": "0x10", "type": "FILETIME", "group": "$STANDARD_INFORMATION", "description": "When the file was last accessed"},
        {"name": "DOS File Permissions", "type": "UInt32 flags", "group": "$STANDARD_INFORMATION", "description": "Read-only, hidden, system, archive, etc."},
        {"name": "Maximum Number of Versions", "type": "UInt32", "group": "$STANDARD_INFORMATION", "description": "Versioning limit (rarely used)"},
        {"name": "Version Number", "type": "UInt32", "group": "$STANDARD_INFORMATION", "description": "Current version number"},
        {"name": "Class ID", "type": "UInt32", "group": "$STANDARD_INFORMATION", "description": "Class identifier"},
        {"name": "Owner ID", "type": "UInt32", "group": "$STANDARD_INFORMATION", "description": "Quota owner ID"},
        {"name": "Security ID", "type": "UInt32", "group": "$STANDARD_INFORMATION", "description": "Index into $Secure"},
        {"name": "Quota Charged", "type": "UInt64", "group": "$STANDARD_INFORMATION", "description": "Bytes charged to user quota"},
        {"name": "Update Sequence Number (USN)", "type": "UInt64", "group": "$STANDARD_INFORMATION", "description": "USN journal sequence number"},
        # File Name attribute (0x30)
        {"name": "Parent Directory File Reference", "tag_id": "0x30", "type": "MFT reference (8 bytes)", "group": "$FILE_NAME", "description": "Pointer to parent directory MFT record"},
        {"name": "File Name Creation Time", "tag_id": "0x30", "type": "FILETIME", "group": "$FILE_NAME", "description": "Creation time stamped on filename"},
        {"name": "File Name Modification Time", "tag_id": "0x30", "type": "FILETIME", "group": "$FILE_NAME", "description": "Mod time stamped on filename"},
        {"name": "File Name MFT Modified Time", "tag_id": "0x30", "type": "FILETIME", "group": "$FILE_NAME", "description": "MFT change time"},
        {"name": "File Name Access Time", "tag_id": "0x30", "type": "FILETIME", "group": "$FILE_NAME", "description": "Access time stamped on filename"},
        {"name": "Allocated Size", "tag_id": "0x30", "type": "UInt64", "group": "$FILE_NAME", "description": "Allocated size on disk"},
        {"name": "Real Size", "tag_id": "0x30", "type": "UInt64", "group": "$FILE_NAME", "description": "Real (logical) size"},
        {"name": "Filename Flags", "tag_id": "0x30", "type": "UInt32", "group": "$FILE_NAME", "description": "Read-only, hidden, system, archive, directory, etc."},
        {"name": "Filename Length (chars)", "tag_id": "0x30", "type": "UInt8", "group": "$FILE_NAME", "description": "Length of filename in characters"},
        {"name": "Filename Namespace", "tag_id": "0x30", "type": "UInt8", "group": "$FILE_NAME", "description": "0=POSIX, 1=Win32, 2=DOS, 3=Win32+DOS",
            "values": [("0", "POSIX (case-sensitive)"), ("1", "Win32 Unicode"), ("2", "DOS 8.3"), ("3", "Win32 + DOS combined")]},
        {"name": "Filename", "tag_id": "0x30", "type": "Unicode string", "group": "$FILE_NAME", "description": "The actual filename"},
        # Object ID (0x40)
        {"name": "Object ID", "tag_id": "0x40", "type": "GUID (16 bytes)", "group": "$OBJECT_ID", "description": "Unique object identifier (NTFS link tracking)"},
        {"name": "Birth Volume ID", "tag_id": "0x40", "type": "GUID", "group": "$OBJECT_ID", "description": "Volume where file was created"},
        {"name": "Birth Object ID", "tag_id": "0x40", "type": "GUID", "group": "$OBJECT_ID", "description": "Original object ID"},
        {"name": "Domain ID", "tag_id": "0x40", "type": "GUID", "group": "$OBJECT_ID", "description": "Reserved domain ID"},
        # Security descriptor (0x50) — see system 4 for detail
        {"name": "Security Descriptor", "tag_id": "0x50", "type": "Variable", "group": "$SECURITY_DESCRIPTOR", "description": "Owner/group/DACL/SACL (resident in older NTFS, indexed via $Secure on modern volumes)"},
        # Reparse point (0xC0)
        {"name": "Reparse Tag", "tag_id": "0xC0", "type": "UInt32", "group": "$REPARSE_POINT", "description": "Type of reparse (symlink, mount point, OneDrive placeholder, etc.)"},
        {"name": "Reparse Data Length", "tag_id": "0xC0", "type": "UInt16", "group": "$REPARSE_POINT", "description": "Length of reparse data"},
        {"name": "Reparse Data", "tag_id": "0xC0", "type": "Variable", "group": "$REPARSE_POINT", "description": "Tag-specific data (e.g. symlink target)"},
        # Logged utility stream (0x100) — used for EFS
        {"name": "EFS Information", "tag_id": "0x100", "type": "Variable", "group": "$LOGGED_UTILITY_STREAM", "description": "Encrypting File System data (DDF, DRF)"},
        # Index allocations
        {"name": "Index Root", "tag_id": "0x90", "type": "Variable", "group": "$INDEX_ROOT", "description": "Root of B+ tree index (directories, $Secure, etc.)"},
        {"name": "Index Allocation", "tag_id": "0xA0", "type": "Variable", "group": "$INDEX_ALLOCATION", "description": "Non-resident index node pointers"},
        {"name": "Bitmap", "tag_id": "0xB0", "type": "Bitfield", "group": "$BITMAP", "description": "Allocation bitmap for the index"},
        # Data
        {"name": "Data", "tag_id": "0x80", "type": "Variable", "group": "$DATA", "description": "Default unnamed data stream — the file's content"},
        {"name": "Named Data Streams", "tag_id": "0x80", "type": "Variable", "group": "$DATA", "description": "Alternate data streams (see system 003)"},
        # Attribute list
        {"name": "Attribute List", "tag_id": "0x20", "type": "Variable", "group": "$ATTRIBUTE_LIST", "description": "Pointer list when attributes overflow MFT record"},
        # Volume metadata
        {"name": "Volume Name", "type": "Unicode string", "group": "$Volume", "description": "Filesystem volume label"},
        {"name": "Volume Information", "type": "Variable", "group": "$Volume", "description": "Major/minor version, dirty flag"},
        {"name": "Volume Serial Number", "type": "UInt64", "group": "$Boot", "description": "Volume's serial number"},
        # MFT record header fields
        {"name": "Sequence Number", "type": "UInt16", "group": "MFT Record Header", "description": "Reuse counter for this record"},
        {"name": "Hard Link Count", "type": "UInt16", "group": "MFT Record Header", "description": "Number of hard links to file"},
        {"name": "MFT Record Number", "type": "UInt48", "group": "MFT Record Header", "description": "Index of this record"},
        {"name": "In-Use Flag", "type": "Bool", "group": "MFT Record Header", "description": "Whether record is allocated"},
        {"name": "Directory Flag", "type": "Bool", "group": "MFT Record Header", "description": "Whether record describes a directory"},
        {"name": "Logfile Sequence Number (LSN)", "type": "UInt64", "group": "MFT Record Header", "description": "Pointer to last log entry affecting record"},
    ]
    p, n = write(
        2, "Windows NTFS File Data",
        "Windows filesystem metadata (MFT-resident attributes)",
        "OS",
        "Microsoft NTFS specification; Brian Carrier 'File System Forensic Analysis' Ch. 12-13",
        "comprehensive",
        "NTFS stores all file metadata as numbered attributes within Master File Table (MFT) "
        "records. Each attribute has a type code (e.g. 0x10 = $STANDARD_INFORMATION) and may be "
        "resident (small, in MFT record) or non-resident (large, with extents pointing to clusters). "
        "This list covers all major attribute types defined in the NTFS specification.",
        NTFS
    )
    paths.append((p, n))
    print(f"  002 NTFS File Data: {n} attributes")

    # 003 — NTFS Alternate Data Streams (Zone.Identifier and others)
    ADS = [
        {"name": "ZoneId", "type": "Integer (1 line, decimal)", "group": "Zone.Identifier", "description": "Security zone of source",
            "values": [("0", "Local Machine"), ("1", "Local Intranet"), ("2", "Trusted Sites"), ("3", "Internet"), ("4", "Restricted Sites")]},
        {"name": "ReferrerUrl", "type": "URL string", "group": "Zone.Identifier", "description": "Page that linked to the download"},
        {"name": "HostUrl", "type": "URL string", "group": "Zone.Identifier", "description": "Direct download URL"},
        {"name": "HostIpAddress", "type": "IPv4/IPv6", "group": "Zone.Identifier", "description": "IP of the host that served the file"},
        {"name": "AppZoneId", "type": "Integer", "group": "Zone.Identifier", "description": "Zone for AppContainer evaluation"},
        {"name": "LastWriterPackageFamilyName", "type": "String", "group": "Zone.Identifier", "description": "UWP package that wrote the stream"},
        {"name": "$DATA (default unnamed)", "type": "Variable", "group": "Streams", "description": "The primary file content stream"},
        {"name": ":AFP_AfpInfo", "type": "Binary", "group": "Streams", "description": "AppleTalk/AFP metadata for SMB-shared Mac files"},
        {"name": ":AFP_Resource", "type": "Binary", "group": "Streams", "description": "Mac resource fork preserved on SMB share"},
        {"name": ":com.dropbox.attributes", "type": "JSON", "group": "Streams", "description": "Dropbox sync metadata"},
        {"name": ":SmartScreen", "type": "String", "group": "Streams", "description": "SmartScreen reputation cache"},
        {"name": ":Wof_Compressed_Data", "type": "Binary", "group": "Streams", "description": "Windows Overlay Filter compressed payload"},
        {"name": "Custom Named Streams (file:streamname:$DATA)", "type": "Variable", "group": "Streams", "description": "Arbitrary user/app-defined stream attached to a file"},
        {"name": "AppContainerId", "type": "GUID", "group": "Zone.Identifier", "description": "Sandboxed app container that downloaded the file"},
        {"name": "MotW Markers", "type": "INI section", "group": "Zone.Identifier", "description": "Mark-of-the-Web flag triggering Protected View / SmartScreen prompts"},
    ]
    p, n = write(
        3, "NTFS Alternate Data Streams",
        "Hidden Windows file streams attached via the colon syntax",
        "OS",
        "Microsoft NTFS specification; MS-FSCC §2.4.7; MITRE T1564.004",
        "substantial",
        "NTFS supports multiple named data streams per file via the syntax 'file.txt:streamname'. "
        "The most famous is Zone.Identifier — set by browsers/apps to mark internet-downloaded files "
        "and trigger SmartScreen / Office Protected View. Streams are invisible to most tools (they "
        "don't change file size or hash of the default stream). Forensically valuable for tracing "
        "file origins; abused by malware for hidden payload storage.",
        ADS
    )
    paths.append((p, n))
    print(f"  003 NTFS Alternate Data Streams: {n} attributes")

    print(f"\nBatch 1 wrote {len(paths)} files, {sum(p[1] for p in paths)} attributes total")


if __name__ == "__main__":
    main()
