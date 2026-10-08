"""All 8 pending Image-category systems."""
import re, json
import xml.etree.ElementTree as ET
from pathlib import Path
import sys
sys.path.insert(0, "/home/claude/meta/build")
from inventory import CATEGORIES
from _writer import W, D

RAW = Path("/home/claude/meta/sources/raw")
OUT = Path("/home/claude/meta/xml")


# ====================================================================
# 055 HEIF/HEIC — based on GPAC box catalog (388 ISOBMFF/HEIF box types)
# ====================================================================
def heif():
    box_types = [l.replace("GF_ISOM_BOX_TYPE_", "").lower()
                 for l in (RAW / "heif/all_box_types.txt").read_text().splitlines() if l.strip()]
    # Box descriptions for the most important HEIF/ISOBMFF boxes
    BOX_DESC = {
        "ftyp": "File Type Box — major brand + compatible brands. HEIC: brand 'heic'/'heix'/'mif1'; AVIF: brand 'avif'/'avis'.",
        "meta": "Metadata Box — root container for HEIF metadata (item info, locations, references)",
        "hdlr": "Handler Reference Box — handler type ('pict' for HEIF/HEIC images)",
        "pitm": "Primary Item Box — references the primary image item ID",
        "iloc": "Item Location Box — byte offsets and lengths of image items in file",
        "iinf": "Item Information Box — item count and per-item info entries",
        "infe": "Item Info Entry — per-item type ('hvc1','av01','grid','iden','Exif','mime')",
        "iref": "Item Reference Box — relationships between items (thumbnails, derivations, auxiliaries)",
        "iprp": "Item Properties Box — container for property descriptions and associations",
        "ipco": "Item Property Container — list of properties (codec config, dimensions, transforms, color)",
        "ipma": "Item Property Association — links items to their properties",
        "idat": "Item Data Box — inline item data",
        "hvcC": "HEVC Configuration — VPS/SPS/PPS NAL units for HEVC-coded HEIF",
        "av1C": "AV1 Configuration — sequence header for AVIF",
        "ispe": "Image Spatial Extents — width × height of image item",
        "pixi": "Pixel Information — bits per channel + channel count",
        "colr": "Color Information — ICC profile or nclx (primaries/transfer/matrix/range)",
        "pasp": "Pixel Aspect Ratio — horizontal / vertical pixel aspect",
        "clap": "Clean Aperture — visible cropping region",
        "irot": "Image Rotation — 0/90/180/270 degrees clockwise",
        "imir": "Image Mirroring — horizontal or vertical mirror",
        "auxC": "Auxiliary Type Property — alpha, depth, or HDR gain map auxiliary identifier",
        "altr": "Alternative Group — items mutually replaceable (e.g. SDR/HDR variants)",
        "udta": "User Data Box — application-defined metadata container",
        "mdat": "Media Data Box — actual image bitstream (referenced by iloc)",
        "moov": "Movie Box (sequences/MIAF, multi-image collections)",
        "trak": "Track Box (image sequences in HEIF — burst photos, live photos)",
        "tkhd": "Track Header — duration, ID, dimensions for track",
        "mdia": "Media Box — media-specific container in track",
        "minf": "Media Information Box",
        "stbl": "Sample Table Box",
        "stsd": "Sample Description Box",
        "stsc": "Sample-To-Chunk Box",
        "stsz": "Sample Size Box",
        "stco": "Chunk Offset Box",
        "co64": "64-bit Chunk Offset Box",
        "tfhd": "Track Fragment Header",
        "trex": "Track Extends Defaults",
        "mvex": "Movie Extends Box",
        "uuid": "User-defined extension box (16-byte UUID identifier)",
        "free": "Free space (skipped on read)",
        "skip": "Free space (skipped on read)",
        "mdcv": "Mastering Display Color Volume — HDR display primaries + max/min luminance",
        "clli": "Content Light Level Info — MaxCLL, MaxFALL for HDR",
        "amve": "Ambient Viewing Environment — HDR viewing conditions",
        "a1op": "AV1 Operating Point Selector",
        "a1lx": "AV1 Layered Image Indexing",
        "lhvC": "Layered HEVC Configuration",
        "ccst": "Coding Constraints",
        "uncC": "Uncompressed image configuration",
        "cmpd": "Component Definition (uncompressed)",
        "rloc": "Relative Location",
        "udes": "User Description (label + description for items)",
    }
    # Brand descriptions for ftyp
    BRANDS = [
        ("mif1", "MIAF base brand — Multi-Image Application Format"),
        ("msf1", "MIAF burst sequence brand"),
        ("heic", "HEIC single image (HEVC Main profile)"),
        ("heix", "HEIC single image (HEVC Main 10 / Range Extensions)"),
        ("hevc", "HEIC sequence (HEVC Main)"),
        ("hevx", "HEIC sequence (HEVC Main 10)"),
        ("heim", "L-HEVC sequence brand"),
        ("heis", "L-HEVC still image"),
        ("hevm", "L-HEVC sequence brand (multi-layer)"),
        ("hevs", "L-HEVC sequence still"),
        ("avif", "AVIF still image (AV1)"),
        ("avis", "AVIF sequence"),
        ("MA1A", "AVIF baseline profile"),
        ("MA1B", "AVIF advanced profile"),
        ("isom", "ISO base media file format base brand"),
        ("iso2", "ISO BMFF v2"),
    ]
    attrs = []
    # File type / brands
    attrs.append(D("ftyp.major_brand", type="UInt32 (4 ASCII chars)", group="File Header",
                   description="Major brand declaring file type", required="true",
                   values=BRANDS))
    attrs.append(D("ftyp.minor_version", type="UInt32", group="File Header"))
    attrs.append(D("ftyp.compatible_brands", type="UInt32[]", group="File Header",
                   description="Additional brands the file conforms to"))
    # All box types
    for bt in box_types:
        desc = BOX_DESC.get(bt, "")
        attrs.append(D(bt, type="ISOBMFF Box (4-char code)", group="Box Type", description=desc))
    # Item info entry types
    attrs.append(D("infe item_type", type="Enum (4 ASCII chars)", group="Item Types",
                   description="Type of an item entry",
                   values=[("hvc1","HEVC-coded image item"),
                           ("av01","AV1-coded image item (AVIF)"),
                           ("grid","Derived image: tiled grid"),
                           ("iden","Identity (transformations only)"),
                           ("iovl","Image overlay (composite)"),
                           ("Exif","Embedded EXIF metadata"),
                           ("mime","MIME-typed (XMP, etc.)"),
                           ("uri ","URI-identified item"),
                           ("hvt1","HEVC tile item"),
                           ("unci","Uncompressed image"),
                           ("jpeg","JPEG-coded image item"),
                           ("j2ki","JPEG 2000 image item"),
                           ("vvc1","VVC-coded image item"),
                           ("evc1","Essential Video Coding item")]),
    )
    attrs.append(D("infe item_protection_index", type="UInt16", group="Item Info"))
    attrs.append(D("infe item_name", type="UTF-8 string", group="Item Info"))
    attrs.append(D("infe content_type", type="UTF-8 string", group="Item Info", description="MIME type for 'mime' items"))
    # Properties detail
    attrs.append(D("ispe.image_width", type="UInt32", group="Property: ispe"))
    attrs.append(D("ispe.image_height", type="UInt32", group="Property: ispe"))
    attrs.append(D("pixi.num_channels", type="UInt8", group="Property: pixi"))
    attrs.append(D("pixi.bits_per_channel[]", type="UInt8[]", group="Property: pixi", description="Bit depth per channel"))
    attrs.append(D("colr.color_type", type="Enum 4-char", group="Property: colr",
                   values=[("nclx","Numeric color profile (primaries+transfer+matrix+range)"),
                           ("rICC","Restricted ICC profile"),
                           ("prof","Unrestricted ICC profile")]))
    attrs.append(D("colr.color_primaries", type="UInt16 (ITU-R BT.470/709/2020 etc.)", group="Property: colr",
                   values=[("1","BT.709"),("4","BT.470M"),("5","BT.470BG"),("6","BT.601"),
                           ("7","SMPTE 240M"),("9","BT.2020"),("11","SMPTE 428"),("12","SMPTE 431-2 (DCI-P3)"),
                           ("13","SMPTE 432-1 (Display P3)")]))
    attrs.append(D("colr.transfer_characteristics", type="UInt16", group="Property: colr",
                   values=[("1","BT.709"),("4","Gamma 2.2"),("5","Gamma 2.8"),("6","BT.601"),
                           ("8","Linear"),("13","sRGB / IEC 61966-2-1"),("14","BT.2020 10-bit"),
                           ("15","BT.2020 12-bit"),("16","SMPTE ST 2084 (PQ)"),("17","SMPTE 428"),
                           ("18","HLG")]))
    attrs.append(D("colr.matrix_coefficients", type="UInt16", group="Property: colr",
                   values=[("0","Identity (RGB)"),("1","BT.709"),("2","Unspecified"),("4","BT.470M"),
                           ("5","BT.601 625"),("6","BT.601 525"),("9","BT.2020 NCL"),("10","BT.2020 CL"),
                           ("12","Chromaticity-derived NCL"),("14","ICTCP")]))
    attrs.append(D("colr.full_range_flag", type="Bool", group="Property: colr"))
    attrs.append(D("irot.angle", type="UInt8", group="Property: irot",
                   values=[("0","0°"),("1","90° CW"),("2","180°"),("3","270° CW")]))
    attrs.append(D("imir.axis", type="UInt8", group="Property: imir",
                   values=[("0","Vertical axis (left/right mirror)"),("1","Horizontal axis (up/down mirror)")]))
    attrs.append(D("clap.cleanApertureWidth/Height", type="Rational[2]", group="Property: clap"))
    attrs.append(D("clap.horizOff/vertOff", type="Rational[2]", group="Property: clap"))
    attrs.append(D("auxC.aux_type", type="UTF-8 string", group="Property: auxC",
                   values=[("urn:mpeg:hevc:2015:auxid:1","Alpha plane"),
                           ("urn:mpeg:hevc:2015:auxid:2","Depth map"),
                           ("urn:com:apple:photo:2020:aux:hdrgainmap","Apple HDR gain map"),
                           ("urn:com:apple:photo:2018:aux:portrait","Portrait depth disparity")]))
    # Item references (iref)
    attrs.append(D("iref.thmb", type="Reference type", group="Item References", description="From thumbnail item to source image"))
    attrs.append(D("iref.cdsc", type="Reference type", group="Item References", description="Content describes — links Exif/XMP item to image"))
    attrs.append(D("iref.auxl", type="Reference type", group="Item References", description="Auxiliary image (alpha, depth, gain map)"))
    attrs.append(D("iref.dimg", type="Reference type", group="Item References", description="Derived image — grid/iovl source items"))
    attrs.append(D("iref.base", type="Reference type", group="Item References", description="Base image of layered derivation"))
    attrs.append(D("iref.pred", type="Reference type", group="Item References", description="Prediction image"))
    # Apple Live Photo / iOS-specific
    attrs.append(D("Apple QuickTime track .ImageStabilization", type="Apple atom", group="iOS Live Photo / HEIC sequence"))
    attrs.append(D("Apple makernote 'aux:portrait'", type="Apple aux", group="iOS Live Photo / HEIC sequence"))
    attrs.append(D("Apple metadata atom 'com.apple.quicktime.live-photo.auto'", type="Apple atom", group="iOS Live Photo / HEIC sequence"))
    attrs.append(D("Apple metadata atom 'com.apple.quicktime.content.identifier'", type="Apple atom", group="iOS Live Photo / HEIC sequence", description="Pairs HEIC still with MOV file in Live Photo"))
    attrs.append(D("Apple metadata atom 'com.apple.quicktime.still-image-time'", type="Apple atom", group="iOS Live Photo / HEIC sequence"))
    # Standard EXIF/XMP embedding
    attrs.append(D("Embedded EXIF (item type 'Exif')", type="Item", group="Embedded Metadata", description="Full EXIF blob — see system 045 for tags"))
    attrs.append(D("Embedded XMP (mime, content_type='application/rdf+xml')", type="Item", group="Embedded Metadata", description="XMP — see system 042 for properties"))
    attrs.append(D("Embedded ICC profile (colr type='prof'/'rICC')", type="Property", group="Embedded Metadata", description="See system 050 for ICC tags"))

    return W(55, "HEIF / HEIC Metadata", "Modern smartphone photos (HEIF/HEIC/AVIF — ISO/IEC 23008-12 ISOBMFF)",
        "IMG", "ISO/IEC 23008-12 (HEIF) + ISO/IEC 14496-12 (ISOBMFF) + GPAC source (388 box types extracted)",
        "comprehensive",
        "HEIF (High Efficiency Image File Format) is the ISO/IEC 23008-12 container format used by Apple "
        "for .HEIC photos since iOS 11 (2017) and adopted by AVIF (.avif) for AV1-coded stills. The "
        "container is built on ISOBMFF (the same base as MP4/MOV) and uses a hierarchical box structure. "
        "An image is stored as one or more 'items' inside a 'meta' box, with item locations, types, "
        "references, and properties tracked in dedicated boxes. This entry catalogs all 388 ISOBMFF/HEIF "
        "box types from GPAC's reference implementation, plus all standard properties, brands, item "
        "types, color information enums, item-reference types, and Apple-specific Live Photo extensions.",
        attrs)


# ====================================================================
# 056 SVG — wooorm element-attribute map (90 elements, 4089 pairs)
# ====================================================================
def svg():
    text = (RAW / "svg/svg-element-attributes.json").read_text()
    # Parse element → attrs
    elements = {}
    pattern = re.compile(r"['\"]?(\w[\w-]*)['\"]?\s*:\s*\[([^\]]+)\]", re.DOTALL)
    for el_match in pattern.finditer(text):
        el = el_match.group(1)
        if el in ("svgElementAttributes", "type"):
            continue
        attrs_text = el_match.group(2)
        attr_list = re.findall(r"['\"]([\w:-]+)['\"]", attrs_text)
        if attr_list:
            elements[el] = attr_list

    # Add SVG-specific descriptions for common attributes
    ATTR_DESC = {
        "viewBox": "min-x min-y width height — coordinate system",
        "xmlns": "XML namespace declaration (required: http://www.w3.org/2000/svg)",
        "xmlns:xlink": "XLink namespace (older; xlink:href)",
        "width": "Element width (length, percentage, or number)",
        "height": "Element height (length, percentage, or number)",
        "x": "X coordinate of element origin",
        "y": "Y coordinate of element origin",
        "cx": "Center x (circle, ellipse, radialGradient)",
        "cy": "Center y (circle, ellipse, radialGradient)",
        "r": "Radius (circle)",
        "rx": "X-axis radius (ellipse, rect)",
        "ry": "Y-axis radius (ellipse, rect)",
        "d": "Path data (M/L/H/V/C/S/Q/T/A/Z commands)",
        "points": "List of points (polygon, polyline)",
        "x1": "Line/gradient start x",
        "y1": "Line/gradient start y",
        "x2": "Line/gradient end x",
        "y2": "Line/gradient end y",
        "fill": "Fill paint (color, gradient, pattern, none)",
        "stroke": "Stroke paint",
        "stroke-width": "Stroke thickness",
        "stroke-linecap": "Line cap: butt, round, square",
        "stroke-linejoin": "Line join: miter, round, bevel, arcs, miter-clip",
        "stroke-dasharray": "Dash pattern",
        "stroke-dashoffset": "Dash offset",
        "opacity": "Opacity 0..1",
        "fill-opacity": "Fill opacity 0..1",
        "stroke-opacity": "Stroke opacity 0..1",
        "transform": "Transformation list: translate/rotate/scale/skewX/skewY/matrix",
        "transform-origin": "Origin for transform (CSS)",
        "clip-path": "Reference to <clipPath>",
        "mask": "Reference to <mask>",
        "filter": "Reference to <filter>",
        "href": "Reference URL (SVG 2)",
        "xlink:href": "Reference URL (SVG 1.1, deprecated)",
        "id": "Element identifier",
        "class": "Class names (CSS)",
        "style": "Inline CSS",
        "preserveAspectRatio": "How to scale viewBox: none / xMinYMin / xMidYMid / etc., meet / slice",
        "gradientUnits": "userSpaceOnUse / objectBoundingBox",
        "gradientTransform": "Transformation applied to gradient",
        "patternUnits": "userSpaceOnUse / objectBoundingBox",
        "patternContentUnits": "Pattern content coordinate system",
        "patternTransform": "Transformation applied to pattern",
        "spreadMethod": "Gradient spread: pad, reflect, repeat",
        "stop-color": "<stop> color",
        "stop-opacity": "<stop> opacity",
        "offset": "<stop> offset (0..1 or %)",
        "marker-start / marker-mid / marker-end": "Reference to <marker>",
        "markerHeight / markerWidth / markerUnits / orient / refX / refY": "Marker geometry",
        "in / in2": "Filter primitive input",
        "result": "Filter primitive output name",
        "stdDeviation": "feGaussianBlur deviation",
        "values": "feColorMatrix matrix / animate values list",
        "type": "Animation type / filter type",
        "from / to / by": "Animation start / end / increment",
        "dur": "Animation duration",
        "begin / end": "Animation timing",
        "repeatCount": "Animation repeat count",
        "fill (animation)": "Animation fill: freeze / remove",
        "calcMode": "Animation interpolation: linear / discrete / paced / spline",
        "keyTimes / keySplines": "Animation timing controls",
        "additive": "Animation additivity: replace / sum",
        "accumulate": "Animation accumulation: none / sum",
        "lengthAdjust": "Text length adjust: spacing / spacingAndGlyphs",
        "textLength": "Text intended total length",
        "rotate": "Text/glyph rotation list",
        "dx / dy": "Text/element offsets",
        "text-anchor": "Text anchor: start, middle, end",
        "alignment-baseline": "Baseline alignment",
        "dominant-baseline": "Dominant baseline",
        "font-family / font-size / font-weight / font-style": "Font properties",
        "letter-spacing / word-spacing": "Spacing",
        "writing-mode / direction / unicode-bidi": "Text direction",
        "color-interpolation / color-interpolation-filters": "Color space for compositing",
        "color-rendering / shape-rendering / text-rendering / image-rendering": "Rendering hints",
        "vector-effect": "non-scaling-stroke etc.",
        "visibility / display": "Visibility / display mode",
        "pointer-events": "Pointer event behavior",
        "cursor": "Cursor style",
        "media": "<style> media query",
        "system-required / system-language / required-features / required-extensions": "Conditional processing",
    }

    attrs = []
    # Element-level entries
    for el in sorted(elements):
        if el == "*":
            continue
        attrs.append(D(f"<{el}>", type="SVG Element", group="Elements", description=f"SVG element <{el}>"))
        for a in elements[el]:
            attrs.append(D(f"<{el}> @{a}", type="Attribute", group=f"<{el}>", description=ATTR_DESC.get(a, "")))
    # Global attributes (apply to all elements)
    if "*" in elements:
        attrs.append(D("Global attribute", type="Section", group="Global Attributes", description="Apply to all SVG elements"))
        for a in elements["*"]:
            attrs.append(D(f"@{a} (global)", type="Global Attribute", group="Global Attributes",
                           description=ATTR_DESC.get(a, "")))
    # SVG path command vocabulary (used in <path d="..."> attribute)
    PATH_CMDS = [
        ("M x,y", "Move To (absolute)"),
        ("m dx,dy", "Move To (relative)"),
        ("L x,y", "Line To (absolute)"),
        ("l dx,dy", "Line To (relative)"),
        ("H x", "Horizontal Line To (absolute)"),
        ("h dx", "Horizontal Line To (relative)"),
        ("V y", "Vertical Line To (absolute)"),
        ("v dy", "Vertical Line To (relative)"),
        ("C x1,y1 x2,y2 x,y", "Cubic Bezier To (absolute)"),
        ("c dx1,dy1 dx2,dy2 dx,dy", "Cubic Bezier To (relative)"),
        ("S x2,y2 x,y", "Smooth Cubic Bezier (absolute)"),
        ("s dx2,dy2 dx,dy", "Smooth Cubic Bezier (relative)"),
        ("Q x1,y1 x,y", "Quadratic Bezier To (absolute)"),
        ("q dx1,dy1 dx,dy", "Quadratic Bezier To (relative)"),
        ("T x,y", "Smooth Quadratic Bezier (absolute)"),
        ("t dx,dy", "Smooth Quadratic Bezier (relative)"),
        ("A rx ry x-rot large-arc sweep x y", "Elliptical Arc (absolute)"),
        ("a rx ry x-rot large-arc sweep dx dy", "Elliptical Arc (relative)"),
        ("Z", "Close Path"),
        ("z", "Close Path"),
    ]
    attrs.append(D("--- SVG Path Commands ---", group="Path Commands", description="Used in <path d='...'> attribute"))
    for cmd, desc in PATH_CMDS:
        attrs.append(D(cmd, type="Path command", group="Path Commands", description=desc))
    # XML declarations and svg-doc-level
    attrs.append(D("<?xml version='1.0' encoding='UTF-8'?>", type="XML PI", group="Document",
                   description="XML declaration; SVG files are XML"))
    attrs.append(D("<!DOCTYPE svg ...>", type="DOCTYPE", group="Document", description="DOCTYPE (SVG 1.1; not used in SVG 2)"))
    attrs.append(D("<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='...' version='...'>",
                   type="Root element", group="Document", description="SVG root element"))
    # Inkscape extension attributes (encountered in real-world SVGs)
    INKSCAPE_NS = [
        ("inkscape:version", "Inkscape version that saved the file"),
        ("inkscape:label", "User-visible layer/object label"),
        ("inkscape:groupmode", "'layer' marks group as layer"),
        ("inkscape:locked", "Layer lock state"),
        ("inkscape:export-filename / export-xdpi / export-ydpi", "Export dialog defaults"),
        ("inkscape:cx / cy / zoom / current-layer", "Editor view state (in <sodipodi:namedview>)"),
        ("inkscape:document-units", "Document display units"),
        ("sodipodi:namedview", "Inkscape view container element"),
        ("sodipodi:nodetypes", "Node type hints for path editor"),
        ("sodipodi:role", "'line' on <tspan> for proper text editing"),
    ]
    attrs.append(D("--- Inkscape Extensions ---", group="Inkscape Extensions"))
    for n, d in INKSCAPE_NS:
        attrs.append(D(n, type="Inkscape attr", group="Inkscape Extensions", description=d))
    # Adobe Illustrator extension attributes
    AI_NS = [
        ("Generator metadata <metadata><rdf:RDF><cc:Work>", "Creator info"),
        ("data-name", "AI artboard / object name"),
        ("clip-rule (evenodd vs nonzero)", "Fill/clip rule preserved from AI"),
        ("isolation", "AI compositing isolation"),
    ]
    attrs.append(D("--- Adobe Illustrator Extensions ---", group="Illustrator Extensions"))
    for n, d in AI_NS:
        attrs.append(D(n, type="AI attr", group="Illustrator Extensions", description=d))

    return W(56, "SVG Metadata", "Vector graphics — Scalable Vector Graphics (SVG 1.1 + SVG 2)",
        "IMG", "W3C SVG 2 + SVG 1.1 specs (via wooorm/svg-element-attributes — fetched 2026-04-30)",
        "comprehensive",
        "SVG (Scalable Vector Graphics) is a W3C XML-based vector image format. Unlike raster formats "
        "(JPG/PNG/HEIC), an SVG file is structured markup describing geometric primitives, paths, text, "
        "filters, animations, and styling. This entry covers all 90 elements with their full attribute "
        "lists from SVG 1.1, SVG Tiny 1.2, and SVG 2 (4,089 element-attribute pairs total), all 20 path "
        "data commands, common Inkscape / Adobe Illustrator extension attributes encountered in "
        "real-world files, and document-level XML declarations.",
        attrs)


# ====================================================================
# 057 WebP — RIFF chunks per Google WebP Container Spec
# ====================================================================
def webp():
    attrs = [
        # RIFF outer
        D("RIFF magic", type="ASCII 4 bytes 'RIFF'", group="RIFF Header", required="true"),
        D("File size", type="UInt32 LE", group="RIFF Header", description="Total file size minus 8"),
        D("WebP magic", type="ASCII 4 bytes 'WEBP'", group="RIFF Header", required="true"),
        # VP8 (lossy) chunk
        D("VP8 chunk (FourCC 'VP8 ')", type="RIFF chunk", group="Image Bitstream",
          description="Simple lossy WebP — entire image as one VP8 keyframe"),
        D("VP8 frame_tag", type="UInt24 LE", group="VP8 Bitstream", description="key_frame, version, show_frame, first_part_size"),
        D("VP8 start_code", type="UInt24 (0x9d012a)", group="VP8 Bitstream"),
        D("VP8 width", type="UInt14", group="VP8 Bitstream", description="Image width (max 16383)"),
        D("VP8 height", type="UInt14", group="VP8 Bitstream"),
        D("VP8 horizontal_scale / vertical_scale", type="UInt2", group="VP8 Bitstream"),
        # VP8L (lossless) chunk
        D("VP8L chunk (FourCC 'VP8L')", type="RIFF chunk", group="Image Bitstream",
          description="Lossless WebP — VP8L bitstream"),
        D("VP8L signature", type="UInt8 (0x2f)", group="VP8L Bitstream"),
        D("VP8L width-1 / height-1", type="UInt14 each", group="VP8L Bitstream"),
        D("VP8L alpha_is_used", type="Bit", group="VP8L Bitstream"),
        D("VP8L version_number", type="UInt3", group="VP8L Bitstream"),
        # Extended (animated/alpha/ICC/EXIF/XMP)
        D("VP8X chunk (FourCC 'VP8X')", type="RIFF chunk", group="Extended File",
          description="Extended file format header — present when ICC, EXIF, XMP, animation, or alpha chunks exist"),
        D("VP8X feature flags", type="UInt8", group="VP8X",
          values=[("0x20","ICC profile present (I)"),
                  ("0x10","Alpha present (L)"),
                  ("0x08","EXIF metadata present (E)"),
                  ("0x04","XMP metadata present (X)"),
                  ("0x02","Animation (A)"),
                  ("0x40","Reserved")]),
        D("VP8X canvas_width-1", type="UInt24 LE", group="VP8X"),
        D("VP8X canvas_height-1", type="UInt24 LE", group="VP8X"),
        # ICC
        D("ICCP chunk (FourCC 'ICCP')", type="RIFF chunk", group="Color",
          description="Embedded ICC color profile — see system 050"),
        # ALPH
        D("ALPH chunk (FourCC 'ALPH')", type="RIFF chunk", group="Alpha",
          description="Alpha channel for VP8 (lossy WebP with transparency)"),
        D("ALPH preprocessing", type="UInt2", group="ALPH",
          values=[("0","No preprocessing"),("1","Level reduction")]),
        D("ALPH filtering_method", type="UInt2", group="ALPH",
          values=[("0","None"),("1","Horizontal"),("2","Vertical"),("3","Gradient")]),
        D("ALPH compression_method", type="UInt2", group="ALPH",
          values=[("0","No compression"),("1","Lossless (VP8L)")]),
        # ANIM (animation header)
        D("ANIM chunk (FourCC 'ANIM')", type="RIFF chunk", group="Animation",
          description="Global animation parameters"),
        D("ANIM background_color", type="UInt32 BGRA", group="ANIM"),
        D("ANIM loop_count", type="UInt16 LE", group="ANIM", description="0 = infinite"),
        # ANMF (per-frame)
        D("ANMF chunk (FourCC 'ANMF')", type="RIFF chunk", group="Animation",
          description="Per-frame data — one per animation frame"),
        D("ANMF frame_x / frame_y", type="UInt24 LE each", group="ANMF",
          description="Frame offset in canvas (×2 to get even-aligned pixel)"),
        D("ANMF frame_width-1 / frame_height-1", type="UInt24 LE each", group="ANMF"),
        D("ANMF frame_duration", type="UInt24 LE", group="ANMF", description="Display duration (ms)"),
        D("ANMF reserved", type="UInt6", group="ANMF"),
        D("ANMF blending_method", type="Bit", group="ANMF",
          values=[("0","Alpha blending"),("1","Replace pixel")]),
        D("ANMF disposal_method", type="Bit", group="ANMF",
          values=[("0","Do not dispose (keep)"),("1","Dispose to background")]),
        # EXIF/XMP
        D("EXIF chunk (FourCC 'EXIF')", type="RIFF chunk", group="Embedded Metadata",
          description="Embedded EXIF blob — see system 045"),
        D("XMP chunk (FourCC 'XMP ')", type="RIFF chunk", group="Embedded Metadata",
          description="Embedded XMP blob — see system 042"),
        # Other defined chunks
        D("FRGM chunk (deprecated)", type="RIFF chunk", group="Deprecated",
          description="Fragment chunk — removed from spec"),
        # Codec internals (pointers to system-level concepts)
        D("Lossless transforms", type="VP8L feature", group="VP8L Internal",
          values=[("0","Predictor"),("1","Color (cross-channel)"),("2","Subtract green"),("3","Color indexing")]),
        D("Color cache", type="VP8L feature", group="VP8L Internal", description="Hash table of previous pixel values"),
        D("LZ77 / Huffman", type="VP8L feature", group="VP8L Internal", description="Entropy coding"),
    ]
    return W(57, "WebP Metadata", "Modern web image format (WebP — Google, RFC 6386 base + container spec)",
        "IMG", "Google WebP Container Specification + libwebp source (mux_types.h fetched 2026-04-30)",
        "comprehensive",
        "WebP is Google's web image format combining VP8 (lossy) or VP8L (lossless) bitstreams in a "
        "RIFF container. Simple files are pure VP8 or VP8L; extended files use a VP8X header to declare "
        "additional capabilities (animation, alpha, ICC profile, EXIF, XMP). This entry covers all "
        "RIFF chunk types defined in Google's WebP Container Specification, plus the VP8 and VP8L "
        "bitstream headers that carry image dimensions, the ANIM/ANMF animation chunks, the ALPH "
        "alpha-encoding parameters, and the embedded metadata chunks that mirror what the JPEG/HEIF/PNG "
        "ecosystems carry.",
        attrs)


# ====================================================================
# 159 iOS Photo Library — PHAsset / PhotoKit
# ====================================================================
def ios_photos():
    attrs = [
        # PHAsset core properties
        D("localIdentifier", type="String", group="PHAsset Core",
          description="Stable per-library asset identifier (UUID-style); persists across app launches"),
        D("creationDate", type="NSDate?", group="PHAsset Core", description="Date asset was created (capture date)"),
        D("modificationDate", type="NSDate?", group="PHAsset Core", description="Date asset was last modified"),
        D("location", type="CLLocation?", group="PHAsset Core",
          description="GPS location with horizontal accuracy, altitude, course, speed"),
        D("duration", type="TimeInterval", group="PHAsset Core", description="0 for stills; seconds for videos/Live Photos"),
        D("favorite", type="Bool", group="PHAsset Core", description="User has favorited the asset (heart icon)"),
        D("hidden", type="Bool", group="PHAsset Core", description="In Hidden album"),
        D("pixelWidth", type="NSInteger", group="PHAsset Core", description="Image width in pixels"),
        D("pixelHeight", type="NSInteger", group="PHAsset Core", description="Image height in pixels"),
        D("burstIdentifier", type="String?", group="PHAsset Core", description="Identifier shared by burst images"),
        D("burstSelectionTypes", type="OptionSet (PHAssetBurstSelectionType)", group="PHAsset Core",
          values=[("0","none"),("1","autoPick"),("2","userPick")]),
        D("representsBurst", type="Bool", group="PHAsset Core", description="Cover image of a burst"),
        D("playbackStyle", type="PHAssetPlaybackStyle", group="PHAsset Core",
          values=[("0","unsupported"),("1","image"),("2","imageAnimated (GIF)"),
                  ("3","livePhoto"),("4","video"),("5","videoLooping")]),
        D("hasAdjustments", type="Bool", group="PHAsset Core", description="Asset has been edited (filters/crop/etc.)"),
        D("adjustmentFormatIdentifier", type="String?", group="PHAsset Core",
          description="Reverse-DNS ID of editor that made adjustments (e.g. com.apple.photo)"),
        D("isFavorite", type="Bool", group="PHAsset Core"),
        D("sourceType", type="PHAssetSourceType", group="PHAsset Core",
          values=[("0","none"),("1","userLibrary"),("2","cloudShared"),("3","iTunesSynced")]),
        # MediaType / MediaSubtype
        D("mediaType", type="PHAssetMediaType", group="Type Classification",
          values=[("0","unknown"),("1","image"),("2","video"),("3","audio")]),
        D("mediaSubtypes", type="OptionSet (PHAssetMediaSubtype)", group="Type Classification",
          values=[("0","none"),
                  ("1","photoPanorama (1<<0)"),
                  ("2","photoHDR (1<<1)"),
                  ("4","photoScreenshot (1<<2)"),
                  ("8","photoLive (1<<3) — Live Photo"),
                  ("16","photoDepthEffect (1<<4) — Portrait mode"),
                  ("256","videoStreamed (1<<8)"),
                  ("512","videoHighFrameRate (1<<9) — Slo-mo"),
                  ("1024","videoTimelapse (1<<10)"),
                  ("2048","videoCinematic (1<<11) — iOS 15+"),
                  ("16384","spatialMedia (1<<14) — Vision Pro / immersive 3D photo+video"),
        ]),
        # Live Photo
        D("PHLivePhoto.size", type="CGSize", group="Live Photo"),
        D("PHLivePhoto.localizedDescription", type="String", group="Live Photo"),
        D("Live Photo: still resource (UTI = public.heic / public.jpeg)", type="PHAssetResource", group="Live Photo"),
        D("Live Photo: video resource (UTI = com.apple.quicktime-movie)", type="PHAssetResource", group="Live Photo"),
        D("kCGImagePropertyMakerAppleDictionary key 17", type="QuickTime atom", group="Live Photo",
          description="Live Photo asset identifier — same value in still and movie pair"),
        # PHAssetResource
        D("PHAssetResource.type", type="PHAssetResourceType", group="PHAssetResource",
          values=[("1","photo"),("2","video"),("3","audio"),("4","alternatePhoto"),
                  ("5","fullSizePhoto"),("6","fullSizeVideo"),("7","adjustmentData"),
                  ("8","adjustmentBasePhoto"),("9","pairedVideo"),
                  ("10","fullSizePairedVideo"),("11","adjustmentBasePairedVideo"),
                  ("12","adjustmentBaseVideo"),("13","photoProxy")]),
        D("PHAssetResource.assetLocalIdentifier", type="String", group="PHAssetResource"),
        D("PHAssetResource.uniformTypeIdentifier", type="String", group="PHAssetResource",
          description="UTI: public.heic, public.jpeg, com.apple.quicktime-movie, etc."),
        D("PHAssetResource.originalFilename", type="String", group="PHAssetResource",
          description="e.g. IMG_1234.HEIC"),
        # PHImageManager request options
        D("PHImageRequestOptions.deliveryMode", type="Enum", group="PHImageManager",
          values=[("0","opportunistic"),("1","highQualityFormat"),("2","fastFormat")]),
        D("PHImageRequestOptions.resizeMode", type="Enum", group="PHImageManager",
          values=[("0","none"),("1","fast"),("2","exact")]),
        D("PHImageRequestOptions.version", type="Enum", group="PHImageManager",
          values=[("0","current (with edits)"),("1","unadjusted"),("2","original")]),
        D("PHImageRequestOptions.networkAccessAllowed", type="Bool", group="PHImageManager",
          description="Allow download from iCloud Photos"),
        # iCloud / sync
        D("CloudIdentifier", type="PHCloudIdentifier", group="iCloud Sync",
          description="Stable identifier across iCloud-synced devices (iOS 16+)"),
        D("PHAsset.canPerform(.delete/.content/.properties)", type="Bool", group="Permissions"),
        # Albums / Collections
        D("PHAssetCollection.localIdentifier", type="String", group="Collections"),
        D("PHAssetCollection.localizedTitle", type="String?", group="Collections"),
        D("PHAssetCollection.assetCollectionType", type="Enum", group="Collections",
          values=[("1","album (user-created)"),("2","smartAlbum"),("3","moment (deprecated iOS 13)")]),
        D("PHAssetCollection.assetCollectionSubtype", type="Enum", group="Collections",
          values=[("100","albumRegular"),("101","albumSyncedEvent"),("102","albumSyncedFaces"),
                  ("103","albumSyncedAlbum"),("104","albumImported"),("200","albumMyPhotoStream"),
                  ("201","albumCloudShared"),
                  ("204","smartAlbumGeneric"),("205","smartAlbumPanoramas"),("206","smartAlbumVideos"),
                  ("207","smartAlbumFavorites"),("208","smartAlbumTimelapses"),("209","smartAlbumAllHidden"),
                  ("210","smartAlbumRecentlyAdded"),("211","smartAlbumBursts"),("212","smartAlbumSlomoVideos"),
                  ("213","smartAlbumUserLibrary"),("214","smartAlbumSelfPortraits"),("215","smartAlbumScreenshots"),
                  ("216","smartAlbumDepthEffect"),("217","smartAlbumLivePhotos"),("218","smartAlbumAnimated"),
                  ("219","smartAlbumLongExposures"),("220","smartAlbumUnableToUpload"),
                  ("221","smartAlbumRAW"),("222","smartAlbumCinematic"),("223","smartAlbumSpatial")]),
        # On-disk storage
        D("Photos.sqlite (Photos library database)", type="SQLite DB", group="On-Disk Storage",
          description="At ~/Pictures/Photos Library.photoslibrary/database/Photos.sqlite (macOS) or /var/mobile/Media/PhotoData/Photos.sqlite (iOS)"),
        D("ZASSET table", type="SQLite table", group="On-Disk Storage",
          description="Primary asset table — Z_PK, ZUUID, ZDATECREATED, ZLATITUDE, ZLONGITUDE, ZDIRECTORY, ZFILENAME, etc."),
        D("ZADDITIONALASSETATTRIBUTES table", type="SQLite table", group="On-Disk Storage",
          description="EXIF-derived data, original creation date, time zone, scene classification"),
        D("ZGENERICALBUM / ZGENERICASSET tables", type="SQLite tables", group="On-Disk Storage"),
        D("ZSCENECLASSIFICATION", type="SQLite table", group="On-Disk Storage",
          description="On-device CV classification labels (mountain, beach, food, person, etc.)"),
        D("ZPERSON / ZDETECTEDFACE", type="SQLite tables", group="On-Disk Storage",
          description="Face recognition database (Memories feature)"),
        # Forensic value
        D("Originals/<group>/IMG_NNNN.HEIC", type="File on disk", group="On-Disk Storage",
          description="Unedited capture, immutable after import"),
        D("resources/derivatives/<group>/IMG_NNNN_*_THM.JPG", type="File on disk", group="On-Disk Storage",
          description="Generated thumbnails"),
        D("Mutations/<group>/IMG_NNNN/Adjustments.plist", type="File on disk", group="On-Disk Storage",
          description="Edit history (filter, crop, rotation, exposure)"),
        D("Mutations/<group>/IMG_NNNN/FullSizeRender.jpg", type="File on disk", group="On-Disk Storage",
          description="Rendered output of edits"),
    ]
    return W(159, "iOS Photo Library Metadata", "iPhone/iPad photo library — Apple PhotoKit (PHAsset)",
        "IMG", "Apple PhotoKit framework (developer.apple.com/documentation/photos) + Photos.sqlite schema",
        "comprehensive",
        "Apple's PhotoKit (Photos framework) provides the API for the iOS/macOS photo library. The "
        "central object is PHAsset — a representation of an image, video, or Live Photo. Each asset "
        "has rich metadata beyond what's stored in the file itself: burst grouping, edit/adjustment "
        "tracking, source classification (camera, screenshot, downloaded), iCloud sync state, scene "
        "classification (CV-derived), face recognition links, and album/collection memberships. The "
        "underlying Photos.sqlite database (forensically significant) tracks all of this. This entry "
        "covers PHAsset properties, mediaSubtype flags (Live Photo, Portrait, Slo-mo, Cinematic, "
        "Spatial), PHAssetResource types, PHImageManager request parameters, PHAssetCollection types, "
        "and the on-disk storage layout including originals, derivatives, mutations (edit history), "
        "and the SQLite schema.",
        attrs)


# ====================================================================
# 160 Android MediaStore — full column catalog
# ====================================================================
def android_mediastore():
    # MediaColumns base + per-table columns
    attrs = [
        # Base MediaColumns (all media)
        D("_ID", type="INTEGER PRIMARY KEY", group="BaseColumns",
          description="Row ID assigned by MediaProvider"),
        D("_DATA", type="TEXT (file path)", group="MediaColumns (legacy)",
          description="Absolute filesystem path — deprecated since API 29 (Android 10)"),
        D("_SIZE", type="INTEGER", group="MediaColumns", description="File size in bytes"),
        D("_DISPLAY_NAME", type="TEXT", group="MediaColumns", description="Filename including extension"),
        D("MIME_TYPE", type="TEXT", group="MediaColumns", description="MIME type (e.g. image/jpeg)"),
        D("TITLE", type="TEXT", group="MediaColumns", description="Title (without extension)"),
        D("DATE_ADDED", type="INTEGER (Unix s)", group="MediaColumns"),
        D("DATE_MODIFIED", type="INTEGER (Unix s)", group="MediaColumns"),
        D("DATE_TAKEN", type="INTEGER (Unix ms)", group="MediaColumns",
          description="Capture timestamp (from EXIF DateTimeOriginal for images, mvhd for video)"),
        D("DATE_EXPIRES", type="INTEGER (Unix s)", group="MediaColumns",
          description="When pending or trashed item will be auto-deleted"),
        D("WIDTH", type="INTEGER", group="MediaColumns"),
        D("HEIGHT", type="INTEGER", group="MediaColumns"),
        D("ORIENTATION", type="INTEGER (0/90/180/270)", group="MediaColumns"),
        D("DURATION", type="INTEGER (ms)", group="MediaColumns",
          description="Length for video/audio; 0 for stills"),
        D("ARTIST", type="TEXT", group="MediaColumns", description="Artist (audio) / Author (image+video)"),
        D("ALBUM", type="TEXT", group="MediaColumns"),
        D("AUTHOR", type="TEXT", group="MediaColumns"),
        D("COMPOSER", type="TEXT", group="MediaColumns"),
        D("WRITER", type="TEXT", group="MediaColumns"),
        D("GENRE", type="TEXT", group="MediaColumns"),
        D("RESOLUTION", type="TEXT", group="MediaColumns", description="WIDTHxHEIGHT"),
        D("YEAR", type="INTEGER", group="MediaColumns"),
        D("NUM_TRACKS", type="INTEGER", group="MediaColumns"),
        D("CD_TRACK_NUMBER", type="TEXT", group="MediaColumns"),
        D("DISC_NUMBER", type="TEXT", group="MediaColumns"),
        D("COMPILATION", type="INTEGER (1/0)", group="MediaColumns"),
        D("BITRATE", type="INTEGER", group="MediaColumns"),
        D("CAPTURE_FRAMERATE", type="REAL", group="MediaColumns"),
        D("RELATIVE_PATH", type="TEXT", group="MediaColumns",
          description="Path within the storage volume (e.g. 'Pictures/Camera/'). API 29+."),
        D("VOLUME_NAME", type="TEXT", group="MediaColumns",
          description="Storage volume — 'external_primary', 'internal', or removable volume name"),
        D("BUCKET_ID", type="INTEGER (hash of bucket path)", group="MediaColumns"),
        D("BUCKET_DISPLAY_NAME", type="TEXT", group="MediaColumns",
          description="Containing folder name (e.g. 'DCIM', 'Camera', 'Screenshots')"),
        D("DOCUMENT_ID / INSTANCE_ID / ORIGINAL_DOCUMENT_ID", type="TEXT", group="MediaColumns (XMP-derived)",
          description="From XMP MM: namespace; preserved across edits/copies"),
        D("OWNER_PACKAGE_NAME", type="TEXT", group="MediaColumns",
          description="App that created the file (system-set, immutable)"),
        D("IS_PENDING", type="INTEGER (1/0)", group="MediaColumns",
          description="File reserved by app but not yet finalized"),
        D("IS_TRASHED", type="INTEGER (1/0)", group="MediaColumns",
          description="In trash — will auto-delete after 30 days"),
        D("IS_FAVORITE", type="INTEGER (1/0)", group="MediaColumns"),
        D("GENERATION_ADDED / GENERATION_MODIFIED", type="INTEGER", group="MediaColumns",
          description="Monotonic counters for change detection (sync APIs)"),
        D("XMP", type="BLOB", group="MediaColumns", description="Raw XMP packet"),
        # Images-specific
        D("IS_DRM", type="INTEGER", group="Images.Media",
          description="DRM-protected media"),
        D("BUCKET_DISPLAY_NAME (Images)", type="TEXT", group="Images.Media", description="Same as base"),
        D("DESCRIPTION", type="TEXT", group="Images.Media"),
        D("PICASA_ID", type="TEXT (deprecated)", group="Images.Media"),
        D("ISPRIVATE", type="INTEGER (deprecated)", group="Images.Media"),
        D("MINI_THUMB_MAGIC (deprecated)", type="INTEGER", group="Images.Media"),
        D("LATITUDE / LONGITUDE (deprecated API 29+)", type="REAL", group="Images.Media",
          description="Removed for privacy — read EXIF directly via ExifInterface"),
        D("THUMBNAILS table — _DATA, IMAGE_ID, KIND, WIDTH, HEIGHT", type="Table (deprecated)", group="Images.Thumbnails",
          values=[("1","MICRO_KIND 96×96"),("2","FULL_SCREEN_KIND 1024×768"),("3","MINI_KIND 320×240")]),
        # Video-specific
        D("BOOKMARK", type="INTEGER (ms)", group="Video.Media", description="Last playback position"),
        D("CATEGORY", type="TEXT", group="Video.Media"),
        D("LANGUAGE", type="TEXT", group="Video.Media"),
        D("LATITUDE / LONGITUDE (deprecated)", type="REAL", group="Video.Media"),
        D("MINI_THUMB_MAGIC (deprecated)", type="INTEGER", group="Video.Media"),
        D("TAGS", type="TEXT", group="Video.Media"),
        D("COLOR_RANGE", type="INTEGER", group="Video.Media",
          values=[("1","limited"),("2","full")]),
        D("COLOR_STANDARD", type="INTEGER", group="Video.Media",
          values=[("1","BT.709"),("2","BT.601 PAL"),("4","BT.601 NTSC"),("6","BT.2020")]),
        D("COLOR_TRANSFER", type="INTEGER", group="Video.Media",
          values=[("1","Linear"),("3","SDR Video"),("6","SMPTE ST 2084 (HDR10 PQ)"),("7","HLG")]),
        # Audio-specific
        D("ALBUM_ARTIST", type="TEXT", group="Audio.Media"),
        D("ALBUM_KEY / ARTIST_KEY / TITLE_KEY", type="TEXT", group="Audio.Media",
          description="Locale-aware sort key"),
        D("BOOKMARK (Audio)", type="INTEGER (ms)", group="Audio.Media", description="Audiobook position"),
        D("IS_ALARM", type="INTEGER", group="Audio.Media"),
        D("IS_AUDIOBOOK", type="INTEGER", group="Audio.Media"),
        D("IS_DRM", type="INTEGER", group="Audio.Media"),
        D("IS_MUSIC", type="INTEGER", group="Audio.Media"),
        D("IS_NOTIFICATION", type="INTEGER", group="Audio.Media"),
        D("IS_PODCAST", type="INTEGER", group="Audio.Media"),
        D("IS_RECORDING", type="INTEGER", group="Audio.Media"),
        D("IS_RINGTONE", type="INTEGER", group="Audio.Media"),
        D("TRACK", type="INTEGER", group="Audio.Media"),
        D("ALBUM_ID / ARTIST_ID / GENRE_ID", type="INTEGER (FK)", group="Audio.Media"),
        # Files (super-table)
        D("MEDIA_TYPE", type="INTEGER", group="Files.FileColumns",
          values=[("0","none"),("1","image"),("2","audio"),("3","video"),
                  ("4","playlist"),("5","subtitle"),("6","document")]),
        D("PARENT", type="INTEGER (FK to _ID)", group="Files.FileColumns",
          description="Parent directory _ID"),
        D("FORMAT", type="INTEGER", group="Files.FileColumns",
          description="MTP/PTP format code (0x3801 JPEG, 0x380D PNG, etc.)"),
        D("STORAGE_ID", type="INTEGER", group="Files.FileColumns"),
        # Downloads
        D("REFERER_URI", type="TEXT", group="Downloads",
          description="HTTP Referer URL the file was downloaded from"),
        D("DOWNLOAD_URI", type="TEXT", group="Downloads", description="Source URL"),
        # Provider URIs
        D("Files.getContentUri('external')", type="Uri", group="Provider URIs",
          description="content://media/external/file"),
        D("Images.Media.EXTERNAL_CONTENT_URI", type="Uri", group="Provider URIs",
          description="content://media/external/images/media"),
        D("Video.Media.EXTERNAL_CONTENT_URI", type="Uri", group="Provider URIs"),
        D("Audio.Media.EXTERNAL_CONTENT_URI", type="Uri", group="Provider URIs"),
        D("Audio.Albums / Artists / Genres / Playlists EXTERNAL_CONTENT_URI", type="Uri", group="Provider URIs"),
        D("Downloads.EXTERNAL_CONTENT_URI", type="Uri", group="Provider URIs",
          description="content://media/external/downloads"),
        D("Images.Thumbnails / Video.Thumbnails EXTERNAL_CONTENT_URI", type="Uri", group="Provider URIs"),
        # Permissions
        D("READ_MEDIA_IMAGES (API 33+)", type="Permission", group="Permissions",
          description="Replaces READ_EXTERNAL_STORAGE for images on Android 13+"),
        D("READ_MEDIA_VIDEO (API 33+)", type="Permission", group="Permissions"),
        D("READ_MEDIA_AUDIO (API 33+)", type="Permission", group="Permissions"),
        D("READ_MEDIA_VISUAL_USER_SELECTED (API 34+)", type="Permission", group="Permissions",
          description="Partial access via Photo Picker (Android 14+)"),
        D("MANAGE_EXTERNAL_STORAGE", type="Permission (special)", group="Permissions",
          description="All Files Access — restricted, requires Play Console approval"),
        # On-disk
        D("/storage/emulated/0/DCIM/Camera/", type="Directory", group="Storage Layout",
          description="Default camera capture directory"),
        D("/storage/emulated/0/Pictures/Screenshots/", type="Directory", group="Storage Layout"),
        D("/storage/emulated/0/Movies/", type="Directory", group="Storage Layout"),
        D("/storage/emulated/0/Music/", type="Directory", group="Storage Layout"),
        D("/data/data/com.android.providers.media/databases/external.db", type="SQLite", group="Storage Layout",
          description="MediaProvider's index of all media (forensically significant)"),
    ]
    return W(160, "Android MediaStore Metadata", "Android phone/tablet media library — MediaStore content provider",
        "IMG", "Android Open Source Project — android.provider.MediaStore + MediaColumns",
        "comprehensive",
        "Android's MediaStore is a content provider that indexes all media files (images, videos, audio, "
        "documents, downloads) on a device's storage. Apps query MediaStore via content URIs to access "
        "the media library without dealing with raw filesystem paths (especially after scoped storage "
        "in Android 10+). MediaStore wraps a SQLite database (external.db) that stores per-file "
        "metadata: dimensions, duration, capture date, mime type, owner package, edit history, "
        "favorite/trash state, EXIF-derived date/orientation, etc. This entry covers the full column "
        "catalog across BaseColumns, MediaColumns, Images.Media, Video.Media, Audio.Media, "
        "Files.FileColumns, Downloads, and provider-level URIs and permissions.",
        attrs)


# ====================================================================
# 161 Camera Roll Photo Library — DCF / DCIM standard
# ====================================================================
def camera_roll():
    attrs = [
        # DCIM directory structure
        D("/DCIM/", type="Directory", group="DCIM Root", required="true",
          description="Mandatory root directory for digital camera images per DCF (JEITA CP-3461)"),
        D("/DCIM/100ANDRO/", type="Directory pattern", group="DCIM Subdirectory",
          description="DCF 8.3 directory: NNNAAAAA where NNN=100-999, AAAAA=5-char alphanumeric. Examples: 100APPLE, 101APPLE, 100MEDIA, DCIM/Camera (Android non-DCF)"),
        D("Filename pattern: AAAANNNN.EXT", type="DCF Object", group="DCIM Filename",
          description="4 alphanumeric + 4-digit sequence + 3-char extension. e.g. IMG_1234.JPG, DSC00123.JPG, P1010001.JPG"),
        D("Sequence number 0001-9999 per directory", type="Integer", group="DCIM Filename"),
        D("Standard prefixes by manufacturer", type="Convention", group="DCIM Filename",
          values=[("IMG_","Apple iPhone, generic"),
                  ("DSC","Sony, Nikon, generic 'Digital Still Camera'"),
                  ("DSCN","Nikon (newer)"),
                  ("DSCF","Fujifilm"),
                  ("PICT","Pentax/older Apple QuickTake"),
                  ("CIMG","Casio"),
                  ("MOV_","iPhone video"),
                  ("VID_","Android video"),
                  ("PXL_","Google Pixel"),
                  ("P","Panasonic LUMIX"),
                  ("L","Leica"),
                  ("R","RED"),
                  ("STG_","Olympus")]),
        # MISC and PRIVATE folders
        D("/DCIM/MISC/", type="Directory", group="DCIM Auxiliary",
          description="Misc DPOF (Digital Print Order Format) files (AUTPRINT.MRK)"),
        D("/PRIVATE/<vendor>/...", type="Directory", group="DCIM Auxiliary",
          description="Vendor-specific data (DCF 2.0 PRIVATE area)"),
        D("AUTPRINT.MRK (DPOF)", type="File", group="DCIM Auxiliary",
          description="Print order — selected images, copies, sizes"),
        # Files
        D("Companion file: <basename>.THM", type="File", group="Camera Companions",
          description="JPEG thumbnail accompanying RAW or video"),
        D("Companion file: <basename>.XMP", type="File", group="Camera Companions",
          description="XMP sidecar for non-XMP-aware formats (RAW, etc.)"),
        D("Companion file: <basename>.LRV", type="File", group="Camera Companions",
          description="Low-resolution proxy video (GoPro, DJI)"),
        D("Companion file: <basename>.AAE", type="Apple Plist", group="Camera Companions",
          description="iOS edit-history sidecar — adjustments, crop, filter"),
        # Volume header (camera SD card root)
        D("Volume label", type="FAT/exFAT", group="SD Card Volume",
          description="Often set by camera (e.g. 'CANON_DC', 'NIKON D850', 'EOS_DIGITAL')"),
        # Card identification files
        D("/MISC/MISC.CTG", type="File", group="Card ID",
          description="Some cameras: catalog file"),
        # ChromaCard / vendor camera databases
        D("/DCIM/CANONMSC/", type="Directory", group="Vendor Catalogs",
          description="Canon thumbnail/index database"),
        D("/DCIM/NIKON_DSC/", type="Directory", group="Vendor Catalogs"),
        # DCF tag inheritance
        D("EXIF Make/Model/Software", type="EXIF tag", group="Inherited Metadata",
          description="See system 045 — every DCIM image carries full EXIF"),
        D("EXIF DateTimeOriginal", type="EXIF tag", group="Inherited Metadata",
          description="Capture timestamp in camera's local time (no TZ until EXIF 2.31)"),
        D("EXIF OffsetTimeOriginal (EXIF 2.31)", type="EXIF tag", group="Inherited Metadata",
          description="Time zone offset for capture"),
        D("EXIF GPS sub-IFD", type="EXIF tag block", group="Inherited Metadata",
          description="See system 046 for full GPS tags"),
        D("MakerNote", type="EXIF tag 0x927C", group="Inherited Metadata",
          description="Vendor proprietary — see system 047 for 11,781 tags across 50+ vendors"),
        # iOS-specific Camera Roll structure
        D("iOS: /DCIM/100APPLE/IMG_NNNN.HEIC", type="iOS-specific", group="iOS Camera Roll",
          description="Default iPhone capture path"),
        D("iOS: /DCIM/100APPLE/IMG_NNNN.MOV", type="iOS-specific", group="iOS Camera Roll",
          description="Live Photo motion file (paired with HEIC by Asset Identifier)"),
        D("iOS: /DCIM/100APPLE/IMG_E1234.HEIC", type="iOS-specific", group="iOS Camera Roll",
          description="'E' prefix = Edited version (saves edit alongside original)"),
        D("iOS: /DCIM/100APPLE/IMG_O1234.HEIC", type="iOS-specific", group="iOS Camera Roll",
          description="'O' prefix = Original (less common)"),
        # Android Camera Roll
        D("Android: /DCIM/Camera/IMG_YYYYMMDD_HHMMSS.jpg", type="Android-specific", group="Android Camera Roll",
          description="Default Android camera filename pattern (timestamp)"),
        D("Android: /DCIM/Camera/PXL_YYYYMMDD_HHMMSSnnn.jpg", type="Android-specific", group="Android Camera Roll",
          description="Google Pixel pattern (PXL prefix)"),
        D("Android: /DCIM/Camera/IMG_YYYYMMDD_HHMMSS_BURSTnn.jpg", type="Android-specific", group="Android Camera Roll",
          description="Burst photos — sequential BURST suffix, _COVER for primary"),
        D("Android: /DCIM/Camera/PXL_YYYYMMDD_HHMMSSnnn.MP.jpg", type="Android-specific", group="Android Camera Roll",
          description="Pixel Motion Photo — single file with embedded video"),
        D("Android: Motion Photo XMP namespace 'GCamera'", type="XMP namespace", group="Android Camera Roll",
          description="GCamera:MotionPhoto, GCamera:MicroVideo, GCamera:MicroVideoOffset (in EXIF/XMP)"),
        # Forensic significance
        D("File access time on SD card (FAT/exFAT)", type="Filesystem", group="Forensic",
          description="Last-access date typically preserved when copied; can corroborate viewing history"),
        D("Sequence gaps", type="Forensic indicator", group="Forensic",
          description="Missing IMG_NNNN suggests deleted images"),
        D("Mismatch between EXIF DateTime and filename timestamp", type="Forensic indicator", group="Forensic",
          description="Possible clock manipulation or file manipulation"),
        D("Volume serial number (FAT)", type="Filesystem", group="Forensic",
          description="Identifies specific SD card across re-formats"),
    ]
    return W(161, "Camera Roll Photo Library", "Phone/camera DCIM folder (DCF spec)",
        "IMG", "JEITA CP-3461 (DCF — Design rule for Camera File system) + iOS/Android conventions",
        "comprehensive",
        "Camera Roll structure follows DCF (Design rule for Camera File system, JEITA CP-3461) — the "
        "international standard for how digital cameras name and organize files on storage media. The "
        "/DCIM root directory holds subdirectories named NNNAAAAA (e.g. 100APPLE, 100ANDRO, 100CANON), "
        "and files inside follow AAAANNNN.EXT (4-char prefix + 4-digit sequence + 3-char extension). "
        "iOS and Android both follow DCF for camera captures but add their own conventions (E/O "
        "prefixes for edits, BURST/MP suffixes for special modes, AAE sidecars for iOS edits, "
        "MotionPhoto XMP for Pixel). This entry documents the directory layout, filename patterns, "
        "vendor prefix conventions, companion files (THM, XMP, LRV, AAE), DPOF print orders, vendor "
        "catalog folders, and the inherited EXIF/MakerNote metadata that lives inside every DCIM image.",
        attrs)


# ====================================================================
# 176 Scanner Metadata — TWAIN + WIA + ISIS
# ====================================================================
def scanner():
    attrs = [
        # TWAIN capabilities (CAP_*)
        D("CAP_XRESOLUTION", type="TW_FIX32", group="TWAIN Capability",
          description="Horizontal scan resolution in DPI (e.g. 75/150/200/300/400/600/1200/2400)"),
        D("CAP_YRESOLUTION", type="TW_FIX32", group="TWAIN Capability"),
        D("ICAP_PIXELTYPE", type="TWAIN constant", group="TWAIN Capability",
          values=[("0","TWPT_BW (1-bit black/white)"),("1","TWPT_GRAY"),
                  ("2","TWPT_RGB"),("3","TWPT_PALETTE"),("4","TWPT_CMY"),
                  ("5","TWPT_CMYK"),("6","TWPT_YUV"),("7","TWPT_YUVK"),
                  ("8","TWPT_CIEXYZ"),("9","TWPT_LAB"),("10","TWPT_SRGB"),
                  ("11","TWPT_SCRGB"),("12","TWPT_INFRARED")]),
        D("ICAP_BITDEPTH", type="TW_UINT16", group="TWAIN Capability",
          description="Bits per channel: 1, 8, 16"),
        D("ICAP_BITORDER", type="TW_UINT16", group="TWAIN Capability",
          values=[("0","LSB first"),("1","MSB first")]),
        D("ICAP_PIXELFLAVOR", type="TW_UINT16", group="TWAIN Capability",
          values=[("0","Chocolate (0=white)"),("1","Vanilla (0=black)")]),
        D("ICAP_COMPRESSION", type="TW_UINT16", group="TWAIN Capability",
          values=[("0","None"),("1","Packbits"),("2","Group3-1D"),("3","Group3-1D Eol"),
                  ("4","Group3-2D"),("5","Group4"),("6","JPEG"),("7","LZW"),
                  ("8","JBIG"),("9","PNG"),("10","RLE4"),("11","RLE8"),
                  ("12","BitFields"),("13","ZIP"),("14","JPEG2000")]),
        D("ICAP_IMAGEFILEFORMAT", type="TW_UINT16", group="TWAIN Capability",
          values=[("0","TIFF"),("1","Picture (BMP)"),("2","XBM"),("3","JFIF (JPEG)"),
                  ("4","FPX (FlashPix)"),("5","TIFFMULTI"),("6","PNG"),("7","SPIFF"),
                  ("8","EXIF"),("9","PDF"),("10","JP2"),("11","JPX"),
                  ("12","DEJAVU"),("13","PDFA"),("14","PDFA2")]),
        D("ICAP_XSCALING / YSCALING", type="TW_FIX32", group="TWAIN Capability",
          description="Output scaling factor"),
        D("ICAP_BRIGHTNESS / CONTRAST", type="TW_FIX32 (-1000..+1000)", group="TWAIN Capability"),
        D("ICAP_GAMMA", type="TW_FIX32", group="TWAIN Capability"),
        D("ICAP_HIGHLIGHT / SHADOW / THRESHOLD", type="TW_FIX32", group="TWAIN Capability"),
        D("ICAP_HALFTONES", type="TW_STR32", group="TWAIN Capability"),
        D("ICAP_ORIENTATION", type="TW_UINT16", group="TWAIN Capability",
          values=[("0","Rot0 / Portrait"),("1","Rot90"),("2","Rot180"),("3","Rot270 / Landscape")]),
        D("ICAP_ROTATION", type="TW_FIX32 (degrees)", group="TWAIN Capability"),
        D("ICAP_UNITS", type="TW_UINT16", group="TWAIN Capability",
          values=[("0","Inches"),("1","Centimeters"),("2","Picas"),("3","Points"),
                  ("4","Twips"),("5","Pixels"),("6","Millimeters")]),
        D("ICAP_PHYSICALWIDTH / PHYSICALHEIGHT", type="TW_FIX32", group="TWAIN Capability",
          description="Maximum physical scan area in current units"),
        D("ICAP_FRAMES", type="TW_FRAME[]", group="TWAIN Capability",
          description="One or more rectangular scan regions"),
        D("ICAP_AUTOMATICBORDERDETECTION", type="TW_BOOL", group="TWAIN Capability",
          description="Automatically detect document edges"),
        D("ICAP_AUTOMATICDESKEW", type="TW_BOOL", group="TWAIN Capability"),
        D("ICAP_AUTOMATICROTATE", type="TW_BOOL", group="TWAIN Capability"),
        D("ICAP_AUTODISCARDBLANKPAGES", type="TW_INT32", group="TWAIN Capability"),
        D("ICAP_BARCODEDETECTIONENABLED", type="TW_BOOL", group="TWAIN Capability"),
        D("ICAP_BARCODESEARCHMODE", type="TW_UINT16", group="TWAIN Capability"),
        D("ICAP_PATCHCODEDETECTIONENABLED", type="TW_BOOL", group="TWAIN Capability"),
        # ADF (Automatic Document Feeder)
        D("CAP_FEEDERENABLED", type="TW_BOOL", group="TWAIN ADF",
          description="Use document feeder vs flatbed"),
        D("CAP_FEEDERLOADED", type="TW_BOOL", group="TWAIN ADF",
          description="Documents present in feeder"),
        D("CAP_FEEDERORDER", type="TW_UINT16", group="TWAIN ADF",
          values=[("0","Feeder Front First"),("1","Feeder Back First")]),
        D("CAP_FEEDERPREP", type="TW_BOOL", group="TWAIN ADF",
          description="Prepare feeder for scanning"),
        D("CAP_AUTOFEED", type="TW_BOOL", group="TWAIN ADF",
          description="Auto-feed next page"),
        D("CAP_DUPLEXENABLED", type="TW_BOOL", group="TWAIN ADF"),
        D("CAP_DUPLEX", type="TW_UINT16", group="TWAIN ADF",
          values=[("0","None"),("1","1-pass duplex"),("2","2-pass duplex")]),
        D("CAP_PAPERDETECTABLE", type="TW_BOOL", group="TWAIN ADF"),
        D("CAP_DOUBLEFEEDDETECTION", type="TW_UINT16", group="TWAIN ADF",
          description="Detect multi-page feed errors"),
        D("CAP_DOUBLEFEEDDETECTIONLENGTH / SENSITIVITY / RESPONSE", type="Various", group="TWAIN ADF"),
        D("CAP_PAPERHANDLING", type="TW_UINT16", group="TWAIN ADF",
          values=[("0","Normal"),("1","Fragile"),("2","Thick"),("3","Trifold"),("4","Photograph")]),
        # Sheet info
        D("ICAP_SUPPORTEDSIZES", type="TW_UINT16", group="TWAIN Sheet",
          values=[("0","None"),("1","Letter"),("2","Legal"),("3","Statement"),
                  ("4","Tabloid"),("5","A0"),("6","A1"),("7","A2"),("8","A3"),
                  ("9","A4"),("10","A5"),("11","A6"),("12","A7"),("13","A8"),
                  ("14","A9"),("15","A10"),("16","B0"),("17","B1"),("18","B2"),
                  ("19","B3"),("20","B4"),("21","B5"),("22","B6"),("23","B7"),
                  ("24","B8"),("25","B9"),("26","B10"),("27","C-size"),
                  ("28","D-size"),("29","E-size"),("30","Executive"),("31","US Folio"),
                  ("32","Business Card"),("33","Japanese Legal")]),
        D("CAP_DEVICEEVENT", type="TW_UINT16", group="TWAIN Events",
          values=[("0","CheckAutomaticCapture"),("1","CheckBattery"),("2","CheckDeviceOnline"),
                  ("3","CheckFlash"),("4","CheckPowerSupply"),("5","CheckResolution"),
                  ("6","DeviceAdded"),("7","DeviceOffline"),("8","DeviceReady"),
                  ("9","DeviceRemoved"),("10","ImageCaptured"),("11","ImageDeleted"),
                  ("12","PaperDoubleFeed"),("13","PaperJam"),("14","LampFailure"),
                  ("15","PowerSave"),("16","PowerSaveNotify")]),
        # Image info returned per scan
        D("TW_IMAGEINFO.XResolution / YResolution", type="TW_FIX32", group="TWAIN ImageInfo"),
        D("TW_IMAGEINFO.ImageWidth / ImageLength", type="TW_INT32 (pixels)", group="TWAIN ImageInfo"),
        D("TW_IMAGEINFO.SamplesPerPixel", type="TW_INT16", group="TWAIN ImageInfo"),
        D("TW_IMAGEINFO.BitsPerSample[8]", type="TW_INT16[]", group="TWAIN ImageInfo"),
        D("TW_IMAGEINFO.BitsPerPixel", type="TW_INT16", group="TWAIN ImageInfo"),
        D("TW_IMAGEINFO.Planar / PixelType / Compression", type="Various", group="TWAIN ImageInfo"),
        # Source / device info
        D("TW_IDENTITY.Manufacturer / ProductFamily / ProductName", type="TW_STR32", group="TWAIN Identity"),
        D("TW_IDENTITY.Version (major.minor.country.language)", type="TW_VERSION", group="TWAIN Identity"),
        # WIA (Windows Image Acquisition)
        D("WIA_DPS_DEVICE_ID", type="WIA Property ID 2", group="WIA Device Properties"),
        D("WIA_DPS_DOCUMENT_HANDLING_STATUS", type="WIA Property ID 3819", group="WIA Device Properties",
          values=[("1","Feed Ready"),("2","Flat Ready"),("4","Dup Ready"),
                  ("8","Flat Cover Up"),("16","Path Cover Open"),("32","Paper Jam"),
                  ("64","Paper Problem"),("128","Lamp Warming")]),
        D("WIA_DPS_DOCUMENT_HANDLING_SELECT", type="WIA Property ID 3088", group="WIA Device Properties",
          values=[("1","Feeder"),("2","Flatbed"),("4","Duplex"),("8","Auto Advance"),
                  ("16","Front Only"),("32","Back Only"),("64","Front First"),("128","Back First"),
                  ("256","Next Page"),("512","Prefeed")]),
        D("WIA_DPS_PAGES", type="WIA Property ID 3096", group="WIA Device Properties",
          description="Number of pages to scan (0 = all)"),
        D("WIA_IPS_XRES / YRES", type="WIA Property ID 6147/6148", group="WIA Item Properties"),
        D("WIA_IPS_XPOS / YPOS / XEXTENT / YEXTENT", type="WIA Property", group="WIA Item Properties"),
        D("WIA_IPS_CUR_INTENT", type="WIA Property ID 6146", group="WIA Item Properties",
          values=[("1","Color"),("2","Grayscale"),("4","Text/B&W"),("8","Best Quality"),
                  ("16","Min Size")]),
        D("WIA_IPA_DATATYPE / DEPTH / CHANNELS_PER_PIXEL / BITS_PER_CHANNEL", type="WIA Property",
          group="WIA Item Properties"),
        # ISIS
        D("ISIS PIXTYPE", type="ISIS capability", group="ISIS",
          description="Pixel type — 0=B&W, 1=halftone, 2=4-bit gray, 3=8-bit gray, 4=24-bit color"),
        D("ISIS RESOLUTION_X / RESOLUTION_Y", type="ISIS capability", group="ISIS"),
        D("ISIS DOCUMENT_LENGTH / WIDTH", type="ISIS capability", group="ISIS"),
        # Resulting file metadata
        D("EXIF Software", type="EXIF tag 0x0131", group="Output File Metadata",
          description="Scanner driver name/version (e.g. 'EPSON Scan')"),
        D("EXIF Make / Model", type="EXIF tag", group="Output File Metadata",
          description="Scanner make/model"),
        D("EXIF DateTime / DateTimeOriginal", type="EXIF tag", group="Output File Metadata",
          description="Scan timestamp"),
        D("EXIF XResolution / YResolution", type="EXIF tag", group="Output File Metadata"),
        D("EXIF ResolutionUnit", type="EXIF tag", group="Output File Metadata",
          values=[("1","None"),("2","Inch"),("3","Centimeter")]),
        D("XMP xmp:CreatorTool", type="XMP tag", group="Output File Metadata"),
        D("XMP photoshop:Source", type="XMP tag", group="Output File Metadata",
          description="Often 'Scanned' for scanner output"),
        D("PDF Producer (for PDF output)", type="PDF tag", group="Output File Metadata"),
        D("PDF Creator (for PDF output)", type="PDF tag", group="Output File Metadata",
          description="Scanner driver / PDF library"),
    ]
    return W(176, "Scanner Metadata", "Document/photo scanner output (TWAIN/WIA/ISIS-driven)",
        "IMG", "TWAIN 2.4 Specification + Microsoft WIA + Pixel Translations ISIS",
        "comprehensive",
        "Scanner metadata divides into three layers: (1) TWAIN/WIA/ISIS driver capabilities — what the "
        "scanner reports it can do (resolution, color modes, ADF status, paper sizes, duplex, batch "
        "settings, blank-page detection); (2) per-scan settings actually applied (chosen DPI, bit "
        "depth, region, brightness/contrast, output format); (3) embedded metadata in the output file "
        "(EXIF Make/Model/Software/DateTime, XMP CreatorTool, PDF Producer/Creator). TWAIN is the "
        "cross-platform standard used by most consumer scanners; WIA is Microsoft's Windows-native "
        "alternative; ISIS is the high-end production-scanner standard from EMC Captiva. This entry "
        "covers the comprehensive capability and image-info catalogs from all three.",
        attrs)


# ====================================================================
# 200 Drone Metadata — DJI / Skydio / Autel / Parrot
# ====================================================================
def drone():
    attrs = [
        # DJI XMP namespace (most common drone metadata schema)
        D("drone-dji:GpsLatitude / GpsLongitude / GpsAltitude", type="XMP", group="DJI Position",
          description="GPS location at moment of capture"),
        D("drone-dji:AbsoluteAltitude", type="XMP (m, MSL)", group="DJI Position",
          description="Mean sea level altitude"),
        D("drone-dji:RelativeAltitude", type="XMP (m, AGL)", group="DJI Position",
          description="Above ground / above home point"),
        D("drone-dji:GimbalRollDegree / GimbalPitchDegree / GimbalYawDegree", type="XMP", group="DJI Gimbal",
          description="Camera gimbal orientation in degrees"),
        D("drone-dji:FlightRollDegree / FlightPitchDegree / FlightYawDegree", type="XMP", group="DJI Aircraft",
          description="Aircraft body orientation"),
        D("drone-dji:FlightXSpeed / FlightYSpeed / FlightZSpeed", type="XMP (m/s)", group="DJI Aircraft",
          description="Body-frame velocity"),
        D("drone-dji:CamReverse", type="XMP (0/1)", group="DJI Camera"),
        D("drone-dji:GimbalReverse", type="XMP (0/1)", group="DJI Gimbal"),
        D("drone-dji:SelfData", type="XMP", group="DJI", description="Vendor blob — usually serial/firmware-internal"),
        D("drone-dji:CalibratedFocalLength", type="XMP", group="DJI Camera"),
        D("drone-dji:CalibratedOpticalCenterX / CalibratedOpticalCenterY", type="XMP", group="DJI Camera"),
        D("drone-dji:CalibratedShutterSpeed", type="XMP", group="DJI Camera"),
        D("drone-dji:RtkFlag", type="XMP", group="DJI RTK", description="RTK fix status"),
        D("drone-dji:RtkStdLon / RtkStdLat / RtkStdHgt", type="XMP", group="DJI RTK",
          description="RTK standard deviation horizontal / vertical (mm)"),
        D("drone-dji:DewarpData", type="XMP", group="DJI Camera",
          description="Lens distortion correction parameters"),
        D("drone-dji:DewarpFlag", type="XMP (0/1)", group="DJI Camera"),
        D("drone-dji:Latitude / Longitude / Altitude (deprecated forms)", type="XMP", group="DJI Position"),
        D("drone-dji:CameraSerialNumber / FlightControllerSerialNumber", type="XMP", group="DJI Identity"),
        D("drone-dji:LensSerialNumber", type="XMP", group="DJI Identity"),
        D("drone-dji:Make / Model", type="XMP", group="DJI Identity",
          description="Often 'DJI' / 'FC7203' (Mini 2) / 'FC8482' (Mavic 3) / etc."),
        D("drone-dji:HasCrop / CropLeft / CropRight / CropTop / CropBottom", type="XMP", group="DJI Crop"),
        D("drone-dji:HasSettings", type="XMP", group="DJI"),
        D("drone-dji:Latitude / Longitude DMS form", type="XMP", group="DJI Position"),
        D("drone-dji:ColorMode", type="XMP", group="DJI Camera",
          values=[("Normal","Standard"),("Vivid","Saturated"),("Beach","Beach preset"),
                  ("Dream","Soft preset"),("Classic","Film-emulation"),("Nostalgic","Nostalgic film"),
                  ("Mono","Monochrome"),("True Color","True color"),
                  ("D-Log","D-Log flat profile"),("D-Log M","D-Log medium"),("HLG","Hybrid Log Gamma HDR")]),
        D("drone-dji:CenterX / CenterY", type="XMP", group="DJI Camera"),
        # Thermal (DJI XT/H20T/M2EA/M3T)
        D("drone-dji:IsThermal", type="XMP", group="DJI Thermal"),
        D("drone-dji:ThermalK1 .. K4", type="XMP", group="DJI Thermal", description="Calibration constants"),
        D("FLIR:RawThermalImage", type="XMP/EXIF", group="DJI Thermal (FLIR)",
          description="Raw thermal sensor data (16-bit per pixel)"),
        D("FLIR:Emissivity / ObjectDistance / ReflectedApparentTemperature / AtmosphericTemperature / "
          "RelativeHumidity / IRWindowTemperature / IRWindowTransmission",
          type="XMP/EXIF", group="DJI Thermal (FLIR)", description="Thermal calibration parameters"),
        D("FLIR:PlanckR1 / PlanckR2 / PlanckB / PlanckF / PlanckO", type="XMP/EXIF", group="DJI Thermal (FLIR)",
          description="Planck radiation constants for radiometric conversion"),
        # Skydio XMP
        D("skydio:Make", type="XMP", group="Skydio", description="'Skydio'"),
        D("skydio:Model", type="XMP", group="Skydio", description="'Skydio 2', 'Skydio 2+', 'Skydio X10', etc."),
        D("skydio:LatitudeRef / LongitudeRef", type="XMP", group="Skydio"),
        D("skydio:Latitude / Longitude / Altitude", type="XMP", group="Skydio"),
        D("skydio:UserBatteryId / FlightBatteryCycles", type="XMP", group="Skydio"),
        D("skydio:HomeLatitude / HomeLongitude / HomeAltitude", type="XMP", group="Skydio"),
        D("skydio:VehicleAttitude (quat)", type="XMP", group="Skydio"),
        D("skydio:GimbalAttitude (quat)", type="XMP", group="Skydio"),
        D("skydio:FlightId", type="XMP", group="Skydio", description="UUID linking photo to flight log"),
        D("skydio:CaptureMode", type="XMP", group="Skydio",
          values=[("MANUAL","Pilot framing"),("AUTONOMOUS","Skill or follow"),("BURST","Burst mode")]),
        # Autel
        D("AUTEL:GpsAltitude / RelativeAltitude / RelativePosition", type="XMP", group="Autel"),
        D("AUTEL:GimbalDegree / FlightDegree", type="XMP", group="Autel"),
        D("AUTEL:DroneModel", type="XMP", group="Autel",
          description="EVO Lite, EVO II Pro, EVO II Dual 640T, etc."),
        # Parrot ANAFI
        D("Parrot:CameraPitch / CameraYaw / CameraRoll", type="XMP", group="Parrot"),
        D("Parrot:DroneSerialNumber", type="XMP", group="Parrot"),
        D("Parrot:Latitude / Longitude / Altitude", type="XMP", group="Parrot"),
        # Yuneec, others
        D("yuneec:CameraPitch / CameraRoll / CameraYaw", type="XMP", group="Yuneec"),
        # Inherited EXIF/XMP common to all drones
        D("EXIF Make / Model / Software", type="EXIF", group="Inherited EXIF",
          description="Captured at moment of exposure — see system 045"),
        D("EXIF GPS sub-IFD", type="EXIF block", group="Inherited EXIF",
          description="See system 046 — drones write full GPS lat/lon/alt/hdg/speed/timestamp"),
        D("EXIF GPS DateStamp / TimeStamp", type="EXIF tag", group="Inherited EXIF"),
        D("EXIF GPSImgDirection / GPSImgDirectionRef", type="EXIF tag", group="Inherited EXIF",
          description="Camera bearing (true north or magnetic)"),
        D("EXIF GPSDestLatitude/Longitude", type="EXIF tag", group="Inherited EXIF",
          description="Subject GPS (where camera is pointing)"),
        D("XMP xmp:CreateDate / ModifyDate / MetadataDate", type="XMP", group="Inherited XMP"),
        # Video metadata (drones also shoot video)
        D("MP4 udta\\@xyz atom", type="MP4 atom", group="Video Metadata",
          description="ISO 6709 GPS coordinates (lat,lon,alt) — written to QuickTime/MP4 udta"),
        D("MP4 com.apple.quicktime.location.ISO6709", type="MP4 atom", group="Video Metadata"),
        D("MP4 udta©day / ©dir / ©cmt / ©too / ©cpy / ©nam", type="MP4 atom", group="Video Metadata"),
        D("DJI .SRT subtitle file (companion to .MP4)", type="Sidecar", group="Video Metadata",
          description="Per-frame OSD telemetry: time, GPS, altitude, ISO, shutter, exposure, gimbal angles, etc."),
        D("DJI .LRF / .LRV (low-res preview)", type="Sidecar", group="Video Metadata",
          description="Proxy video for fast preview/transfer"),
        # Flight log integration
        D("Flight log linkage: FlightControllerSerialNumber + DateTime", type="Cross-ref", group="Flight Logs",
          description="Pairs photo with flight session log (.DAT, .txt, or DJI Cloud entry)"),
        D("DJI Care record / DJI account ID", type="Cloud-side", group="Flight Logs",
          description="If uploaded to DJI Cloud (Fly app) — operator account, registration, geofencing decisions"),
        # Remote ID (regulatory)
        D("ASTM F3411-22a Remote ID broadcast", type="Wireless beacon", group="Regulatory",
          description="FAA-required UAS Remote ID since Sept 2023 — UAS ID, location, altitude, velocity, time, control station location"),
        D("Remote ID: UAS Type", type="Beacon field", group="Regulatory",
          values=[("0","None / Not declared"),("1","Aeroplane"),("2","Helicopter / Multirotor"),
                  ("3","Gyroplane"),("4","Hybrid Lift"),("5","Ornithopter"),("6","Glider"),
                  ("7","Kite"),("8","Free Balloon"),("9","Captive Balloon"),
                  ("10","Airship"),("11","Free Fall / Parachute"),("12","Rocket"),("13","Tethered Powered Aircraft"),
                  ("14","Ground Obstacle"),("15","Other")]),
        D("Remote ID: ID Type", type="Beacon field", group="Regulatory",
          values=[("0","None"),("1","Serial Number (ANSI/CTA-2063-A)"),("2","CAA-Assigned ID"),
                  ("3","UTM-Assigned UUID"),("4","Specific Session ID")]),
        D("Remote ID: Operational Status", type="Beacon field", group="Regulatory",
          values=[("0","Undeclared"),("1","Ground"),("2","Airborne"),("3","Emergency"),("4","Remote ID System Failure")]),
    ]
    return W(200, "Drone Metadata", "Drone-captured stills/video — DJI, Skydio, Autel, Parrot, Yuneec",
        "IMG", "DJI XMP namespace (drone-dji:) + Skydio + Autel + Parrot ANAFI + FLIR thermal + ASTM F3411-22a Remote ID",
        "comprehensive",
        "Drones embed extensive metadata far beyond standard EXIF/XMP. The dominant schema is DJI's "
        "drone-dji: XMP namespace, which records aircraft position (GPS + RTK), altitudes (MSL, AGL), "
        "gimbal and aircraft attitudes, body-frame velocities, lens calibration, color profile (D-Log "
        "etc.), serial numbers (camera, gimbal, flight controller), and crop/dewarp parameters. "
        "Thermal-capable models (XT, H20T, M2EA/M3T) add full FLIR radiometric calibration. Skydio, "
        "Autel, Parrot ANAFI, and Yuneec each have their own XMP namespaces with similar fields. "
        "Drones also write rich MP4 metadata (©xyz GPS, .SRT per-frame telemetry sidecar). Since "
        "September 2023, FAA-mandated ASTM F3411-22a Remote ID broadcasts are also part of the drone "
        "metadata story (live wireless beacon, not embedded in files, but operationally critical).",
        attrs)


# ====================================================================
# Run all
# ====================================================================
def main():
    out = []
    out.append(heif())
    out.append(svg())
    out.append(webp())
    out.append(ios_photos())
    out.append(android_mediastore())
    out.append(camera_roll())
    out.append(scanner())
    out.append(drone())
    print("\n=== Image batch summary ===")
    for path, n in out:
        print(f"  {path.name}: {n} attributes")
    print(f"  Total: {len(out)} files, {sum(n for _, n in out)} attributes")


if __name__ == "__main__":
    main()
