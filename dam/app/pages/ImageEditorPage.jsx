/* Plenix asset app · image editor (app/pages/ImageEditorPage.jsx): a focus-mode page for one picture (a mockup).
   Replaces image-editor.html's markup, image-editor.js and image-editor.css (batch 112). Every control changes one
   description of the edit (the state); the picture is drawn from it, and each finished change is kept so Undo and Redo
   step through them. Sliders preview while dragging and record when let go. Nothing is uploaded or saved: Save, Copy,
   Download and Export only say what they would do, in the status line over the canvas. The page is dark
   (<html data-plx-mode="dark">). */
import React from 'react';
import { AppShell, Toolbar, ToolRail, Button, ButtonGroup, Menu, MenuItem, Slider, Checkbox, Select, Field, Input, SegmentedControl, Icon, below, Stack, Inline, Text, DropZone } from 'plenix-platform';

const PRESETS = {
  'Grayscale': 'grayscale(1)', 'Black&White': 'grayscale(1) contrast(1.6)', 'Sepia': 'sepia(1)',
  'Vintage': 'sepia(0.5) contrast(0.9) brightness(1.05) saturate(0.85)', 'Polaroid': 'contrast(1.1) brightness(1.1) saturate(1.2) sepia(0.15)',
  'Kodachrome': 'contrast(1.25) saturate(1.3) sepia(0.12)', 'Technicolor': 'saturate(1.8) contrast(1.15) hue-rotate(-10deg)',
  'Brownie': 'sepia(0.6) contrast(1.1) brightness(0.95)', 'Lomo': 'contrast(1.3) saturate(1.2) brightness(0.95)', 'Invert': 'invert(1)',
};
const PRESET_FILES = { 'Black&White': 'black-white' };
const RATIOS = { '1:1 (Square)': '1 / 1', '16:9': '16 / 9', '9:16': '9 / 16', '4:3': '4 / 3', '3:4': '3 / 4', '2:1': '2 / 1', '1:2': '1 / 2' };
const RATIO_CHOICES = ['Original', 'Free Transform'].concat(Object.keys(RATIOS));
const FONTS = ['Lato', 'Arvo', 'Caveat', 'Corinthia', 'DancingScript', 'KodeMono', 'MadimiOne', 'MajorMonoDisplay', 'Montserrat', 'OpenSans'];
const EXPORTS = ['PNG', 'JPEG', 'SVG', 'TIFF', 'PSD', 'EPS', 'GIF', 'BMP', 'WebP', 'PDF'];
const SLIDERS = [['brightness', 'Brightness', -100, 100, '%'], ['contrast', 'Contrast', -100, 100, '%'], ['saturation', 'Saturation', -100, 100, '%'], ['hueRotation', 'Hue Rotation', 0, 360, ''],
  ['vibrance', 'Vibrance', -100, 100, ''], ['blur', 'Blur', 0, 20, ''], ['noise', 'Noise', 0, 100, ''], ['pixelate', 'Pixelate', 0, 50, '']];
const TOOLS = [['filters', 'Filters', 'ed-filters'], ['crop', 'Crop', 'ed-crop'], ['rotate', 'Rotate', 'ed-rotate-cw'], ['text', 'Text', 'ed-text'], ['image', 'Image', 'ed-image']];
const START = { brightness: 0, contrast: 0, saturation: 0, hueRotation: 0, vibrance: 0, blur: 0, noise: 0, pixelate: 0, sharpen: false, emboss: false, edge: false,
  preset: '', rotate: 0, flipX: false, flipY: false, crop: '', texts: [], overlay: null };

function useStatus() {
  const [msg, setMsg] = React.useState('');
  const timer = React.useRef(null);
  const say = (m) => { setMsg(m); clearTimeout(timer.current); timer.current = setTimeout(() => setMsg(''), 2600); };
  return [msg, say];
}

export function ImageEditorPage() {
  const [edit, setEdit] = React.useState(START);           // what is drawn (also while a slider moves)
  const [history, setHistory] = React.useState({ list: [JSON.stringify(START)], at: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [tool, setTool] = React.useState('filters');
  const [open, setOpen] = React.useState(() => !window.matchMedia(below('--plx-sys-shell-phone-below')).matches);   // on a phone the canvas comes first
  const [pending, setPending] = React.useState(null);      // an overlay picture chosen, not yet composed
  const [overlayOpts, setOverlayOpts] = React.useState({ opacity: 100, scale: 100 });
  const [text, setText] = React.useState({ text: '', font: 'Lato', weight: 'Regular', color: '#' + 'd4af37', align: 'left' });   // DATA: the default text color (the legacy editor's)
  const [ratio, setRatio] = React.useState('Original');
  const [dragOver, setDragOver] = React.useState(false);
  const [msg, say] = useStatus();
  const file = React.useRef(null);

  const commit = (next, message) => {
    setEdit(next);
    const snap = JSON.stringify(next);
    setHistory((h) => (snap === h.list[h.at] ? h : { list: h.list.slice(0, h.at + 1).concat(snap), at: h.at + 1 }));
    if (message) say(message);
  };
  const change = (patch, message) => commit({ ...edit, ...patch }, message);
  const step = (by) => {
    const next = history.at + by;
    if (next < 0) { say('Nothing to undo'); return; }
    if (next >= history.list.length) { say('Nothing to redo'); return; }
    const st = JSON.parse(history.list[next]);
    setHistory({ ...history, at: next }); setEdit(st); setPending(null); setRatio(st.crop || 'Original');
    say(by < 0 ? 'Undone' : 'Redone');
  };
  const zoomTo = (z) => { setZoom(z); say('Zoom ' + Math.round(z * 100) + '%'); };
  const chooseTool = (id) => { if (id === tool && open) { setOpen(false); return; } setTool(id); setOpen(true); };
  const useFile = (f) => {
    if (!f || f.type.indexOf('image/') !== 0) { say('That file is not an image'); return; }
    setPending({ src: URL.createObjectURL(f), ...overlayOpts });
    say('Image ready: adjust it, then choose Compose');
  };

  /* drawing */
  const f = [];
  if (edit.preset) f.push(PRESETS[edit.preset]);
  if (edit.brightness) f.push('brightness(' + (1 + edit.brightness / 100) + ')');
  if (edit.contrast) f.push('contrast(' + (1 + edit.contrast / 100) + ')');
  if (edit.saturation || edit.vibrance) f.push('saturate(' + Math.max(0, 1 + edit.saturation / 100 + edit.vibrance / 200) + ')');   // vibrance as a gentler saturation
  if (edit.hueRotation) f.push('hue-rotate(' + edit.hueRotation + 'deg)');
  if (edit.blur) f.push('blur(' + edit.blur / 4 + 'px)');
  const overlay = pending || edit.overlay;

  const header = (
    <header className="plx-image-editor__bar">
      <Toolbar label="Editor">
        <Toolbar.Group>
          <Button variant="primary" onClick={() => say('Saved')}>Save</Button>
          <Button onClick={() => say('Saved as a copy')}>Save as</Button>
          <Menu label="Export As" trigger={<Button caret>Export As</Button>}>
            {EXPORTS.map((x) => <MenuItem key={x} onSelect={() => say('Exported as ' + x)}>{x}</MenuItem>)}
          </Menu>
        </Toolbar.Group>
        <Toolbar.Group>
          <Button variant="ghost" iconOnly icon="ed-copy" label="Copy" onClick={() => say('Copied')} />
          <Button variant="ghost" iconOnly icon="ed-download" label="Download" onClick={() => say('Download started')} />
        </Toolbar.Group>
        <Toolbar.Group>
          <Button variant="ghost" iconOnly icon="ed-undo" label="Undo" disabled={history.at === 0} onClick={() => step(-1)} />
          <Button variant="ghost" iconOnly icon="ed-redo" label="Redo" disabled={history.at >= history.list.length - 1} onClick={() => step(1)} />
        </Toolbar.Group>
        <Toolbar.Group>
          <Button variant="ghost" iconOnly icon="ed-zoom-in" label="Zoom in" onClick={() => zoomTo(Math.min(4, zoom * 1.25))} />
          <Button variant="ghost" iconOnly icon="ed-zoom-out" label="Zoom out" onClick={() => zoomTo(Math.max(0.25, zoom / 1.25))} />
          <Button variant="ghost" iconOnly icon="ed-recenter" label="Recenter" onClick={() => zoomTo(1)} />
        </Toolbar.Group>
      </Toolbar>
    </header>
  );

  const panels = {
    filters: (
      <>
        {SLIDERS.map(([k, label, min, max, unit]) => (
          <Slider key={k} label={label} min={min} max={max} unit={unit} value={edit[k]} onChange={(v) => setEdit({ ...edit, [k]: v })} onCommit={(v) => change({ [k]: v })} />
        ))}
        <Stack gap="sm">
          {[['sharpen', 'Sharpen'], ['emboss', 'Emboss'], ['edge', 'Edge']].map(([k, l]) => <Checkbox key={k} name={k} label={l} checked={edit[k]} onChange={(e) => change({ [k]: e.target.checked })} />)}
        </Stack>
        <Text as="h3" variant="eyebrow">Built-In Filters</Text>
        <div className="plx-image-editor__presets" role="group" aria-label="Built-in filters">
          {Object.keys(PRESETS).map((name) => (
            <button key={name} type="button" className="plx-image-editor__preset" aria-pressed={edit.preset === name} onClick={() => change({ preset: edit.preset === name ? '' : name })}>
              <img src={'assets/editor/filter-' + (PRESET_FILES[name] || name.toLowerCase()) + '.svg'} alt="" width="100" height="56" />
              <span>{name}</span>
            </button>
          ))}
        </div>
      </>
    ),
    crop: (
      <>
        <Field label="Aspect Ratio"><Select name="aspectRatio" value={ratio} onChange={(e) => setRatio(e.target.value)}>{RATIO_CHOICES.map((r) => <option key={r}>{r}</option>)}</Select></Field>
        <Inline>
          <Button variant="primary" onClick={() => { const c = RATIOS[ratio] ? ratio : ''; change({ crop: c }, c ? 'Cropped to ' + ratio : 'Crop cleared'); }}>Crop</Button>
          <Button onClick={() => { setRatio('Original'); change({ crop: '' }, 'Crop cleared'); }}>Reset</Button>
        </Inline>
      </>
    ),
    rotate: (
      <div className="plx-image-editor__presets">
        <Button icon="ed-rotate-ccw" onClick={() => change({ rotate: edit.rotate - 90 })}>-90°</Button>
        <Button icon="ed-rotate-cw" onClick={() => change({ rotate: edit.rotate + 90 })}>+90°</Button>
        <Button icon="ed-flip-x" onClick={() => change({ flipX: !edit.flipX })}>Flip X</Button>
        <Button icon="ed-flip-y" onClick={() => change({ flipY: !edit.flipY })}>Flip Y</Button>
      </div>
    ),
    text: (
      <>
        <Input name="text" placeholder="Enter text..." aria-label="Text" value={text.text} onChange={(e) => setText({ ...text, text: e.target.value })} />
        <Field label="Font Family"><Select name="fontFamily" value={text.font} onChange={(e) => setText({ ...text, font: e.target.value })}>{FONTS.map((x) => <option key={x}>{x}</option>)}</Select></Field>
        <SegmentedControl label="Font Weight" value={text.weight} onChange={(w) => setText({ ...text, weight: w })} options={['Regular', 'Bold', 'Italic'].map((w) => ({ value: w, label: w }))} />
        <Field label="Color">
          <Inline>
            <Input name="color" type="color" aria-label="Color" className="plx-u-w-40px plx-u-h-28px plx-u-p-0" value={text.color} onChange={(e) => setText({ ...text, color: e.target.value })} />
            <Text variant="data">{text.color.toUpperCase()}</Text>
          </Inline>
        </Field>
        <ButtonGroup label="Align">
          {[['left', 'ed-align-left'], ['center', 'ed-align-center'], ['right', 'ed-align-right']].map(([a, ic]) => (
            <Button key={a} size="sm" iconOnly icon={ic} label={'Align ' + a} pressed={text.align === a} onClick={() => setText({ ...text, align: a })} />
          ))}
        </ButtonGroup>
        <div><Button variant="primary" onClick={() => {
          const t = text.text.trim();
          if (!t) { say('Type some text first'); return; }
          change({ texts: edit.texts.concat({ text: t, font: text.font, weight: text.weight, color: text.color, align: text.align }) }, 'Text added');
          setText({ ...text, text: '' });
        }}>Insert</Button></div>
      </>
    ),
    image: (
      <>
        <DropZone as="button" active={dragOver} className="plx-u-text-content-muted"
          onClick={() => file.current.click()} onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); useFile(e.dataTransfer.files[0]); }}>
          <Icon name="ed-download-2" size="lg" />
          <span>Drop image to overlay<br />or click to browse</span>
        </DropZone>
        <input ref={file} type="file" name="overlayFile" accept="image/*" className="plx-visually-hidden" tabIndex={-1} aria-label="Overlay image file"
          onChange={(e) => { useFile(e.target.files[0]); e.target.value = ''; }} />
        <Slider label="Opacity" unit="%" min={0} max={100} value={overlayOpts.opacity} onChange={(v) => { setOverlayOpts({ ...overlayOpts, opacity: v }); if (pending) setPending({ ...pending, opacity: v }); }} />
        <Slider label="Scale" unit="%" min={10} max={300} value={overlayOpts.scale} onChange={(v) => { setOverlayOpts({ ...overlayOpts, scale: v }); if (pending) setPending({ ...pending, scale: v }); }} />
        <div><Button variant="primary" onClick={() => { if (!pending) { say('Choose an image first'); return; } const p = pending; setPending(null); change({ overlay: p }, 'Image added'); }}>Compose</Button></div>
      </>
    ),
  };
  const toolLabel = TOOLS.find((t) => t[0] === tool)[1];

  return (
    <AppShell header={header} mainClassName="plx-shell-main">
      <h1 className="plx-visually-hidden">Plenix Asset Manager: Image Editor</h1>
      <ToolRail label="Tools" showLabels>
        {TOOLS.map(([id, label, icon]) => <ToolRail.Item key={id} icon={icon} label={label} pressed={open && tool === id} onClick={() => chooseTool(id)} />)}
      </ToolRail>
      {open ? (
        <aside aria-label={toolLabel + ' options'} className="plx-image-editor__panel">
          <Text as="h2" variant="eyebrow">{toolLabel}</Text>
          {panels[tool]}
        </aside>
      ) : null}
      <div className="plx-image-editor__canvas">
        {/* the edit reaches the picture only as the editor's custom properties (platform/patterns/ImageEditor) */}
        <div className="plx-image-editor__frame" style={{ '--plx-comp-image-editor-zoom': zoom }}>
          <img src="assets/editor/artwork.svg" width="420" height="420" alt="Image being edited: gold Coptic cross on a brown background"
            className={'plx-image-editor__image' + (edit.crop ? ' plx-image-editor__image--cropped' : '')}
            style={{ '--plx-comp-image-editor-filter': f.join(' ') || 'none', '--plx-comp-image-editor-ratio': edit.crop ? RATIOS[edit.crop] : 'auto',
              '--plx-comp-image-editor-transform': 'rotate(' + edit.rotate + 'deg) scale(' + (edit.flipX ? -1 : 1) + ',' + (edit.flipY ? -1 : 1) + ')' }} />
          {edit.texts.map((t, i) => (
            <span key={i} className={'plx-image-editor__text' + (t.weight === 'Bold' ? ' plx-image-editor__text--bold' : '') + (t.weight === 'Italic' ? ' plx-image-editor__text--italic' : '') + (t.align === 'center' ? ' plx-image-editor__text--center' : t.align === 'right' ? ' plx-image-editor__text--end' : '')}
              style={{ '--plx-comp-image-editor-text-color': t.color, '--plx-comp-image-editor-text-font': '"' + t.font + '", var(--plx-sys-font-body)', '--plx-comp-image-editor-text-top': (40 + i * 12) + '%' }}>{t.text}</span>
          ))}
          {overlay ? <img src={overlay.src} alt="" className="plx-image-editor__overlay" style={{ '--plx-comp-image-editor-overlay-opacity': overlay.opacity / 100, '--plx-comp-image-editor-overlay-scale': overlay.scale / 100 }} /> : null}
        </div>
        <div role="status" aria-live="polite" className="plx-image-editor__status">{msg}</div>
      </div>
    </AppShell>
  );
}
