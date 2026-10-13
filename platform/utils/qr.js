/* Plenix · qrEncode
   Summary: The Plenix QR code encoder (ISO/IEC 18004, model 2): a text becomes the matrix of dark and light modules that
     QRCode draws. Plenix's own code, no dependency.
   Usage:
     const qr = qrEncode('https://plenix.lighthouseway.org/notes/', { level: 'M' });
     qr.size            // 29 (modules per side, without the quiet zone)
     qr.modules[y][x]   // true = a dark module
   Props:
     text: the value to encode, as UTF-8 bytes (byte mode)
     options.level: the error correction level: "L" (7%) | "M" (15%, default) | "Q" (25%) | "H" (30%)
     options.mask: a mask pattern 0..7; without it the encoder scores all eight and keeps the best
     options.minVersion, options.maxVersion: the versions to search (1..40); the smallest that holds the text wins
   Behavior:
     Returns { version, size, level, mask, modules } or throws a RangeError when the text does not fit in version 40.
     Function patterns (finders, timing, alignment, format and version information) follow the standard; the data is
       split into Reed-Solomon blocks over GF(256) (polynomial 0x11D) and interleaved.
   Notes:
     The quiet zone (four light modules on every side) is the drawing's job (QRCode adds it).
*/

const LEVELS = { L: { bits: 1, i: 0 }, M: { bits: 0, i: 1 }, Q: { bits: 3, i: 2 }, H: { bits: 2, i: 3 } };
// error correction codewords per block, and the number of blocks, by level (L, M, Q, H) and version (index 1..40)
const ECC_PER_BLOCK = [
  [-1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
  [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28],
  [-1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
  [-1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
];
const BLOCKS = [
  [-1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25],
  [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49],
  [-1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68],
  [-1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81]
];

const bit = (x, i) => ((x >>> i) & 1) !== 0;

// the modules a version has for data and error correction (everything but the function patterns)
function rawModules(ver) {
  let n = (16 * ver + 128) * ver + 64;
  if (ver >= 2) {
    const align = Math.floor(ver / 7) + 2;
    n -= (25 * align - 10) * align - 55;
    if (ver >= 7) n -= 36;
  }
  return n;
}
const dataCodewords = (ver, li) => Math.floor(rawModules(ver) / 8) - ECC_PER_BLOCK[li][ver] * BLOCKS[li][ver];

// GF(256) with the QR polynomial 0x11D
function mul(x, y) {
  let z = 0;
  for (let i = 7; i >= 0; i--) { z = (z << 1) ^ ((z >>> 7) * 0x11d); z ^= ((y >>> i) & 1) * x; }
  return z & 0xff;
}
function divisor(degree) {
  const out = new Array(degree).fill(0); out[degree - 1] = 1;
  let root = 1;
  for (let i = 0; i < degree; i++) {
    for (let j = 0; j < out.length; j++) { out[j] = mul(out[j], root); if (j + 1 < out.length) out[j] ^= out[j + 1]; }
    root = mul(root, 0x02);
  }
  return out;
}
function remainder(data, div) {
  const out = new Array(div.length).fill(0);
  for (const b of data) {
    const f = b ^ out.shift(); out.push(0);
    div.forEach((c, i) => { out[i] ^= mul(c, f); });
  }
  return out;
}

function utf8(text) {
  return Array.from(new TextEncoder().encode(String(text)));
}

function alignmentPositions(ver, size) {
  if (ver === 1) return [];
  const n = Math.floor(ver / 7) + 2;
  const step = ver === 32 ? 26 : Math.ceil((ver * 4 + 4) / (n * 2 - 2)) * 2;
  const out = [6];
  for (let pos = size - 7; out.length < n; pos -= step) out.splice(1, 0, pos);
  return out;
}

function penalty(m, size) {
  let score = 0;
  const line = (get) => {
    for (let a = 0; a < size; a++) {
      let run = 1, s = '';
      for (let b = 0; b < size; b++) {
        const v = get(a, b); s += v ? '1' : '0';
        if (b > 0 && v === get(a, b - 1)) { run++; if (run === 5) score += 3; else if (run > 5) score += 1; } else run = 1;
      }
      // a finder-like pattern with four light modules on one side
      for (const p of ['10111010000', '00001011101']) { let i = s.indexOf(p); while (i >= 0) { score += 40; i = s.indexOf(p, i + 1); } }
    }
  };
  line((y, x) => m[y][x]);
  line((x, y) => m[y][x]);
  for (let y = 0; y < size - 1; y++) for (let x = 0; x < size - 1; x++) { const c = m[y][x]; if (c === m[y][x + 1] && c === m[y + 1][x] && c === m[y + 1][x + 1]) score += 3; }
  let dark = 0; m.forEach((row) => row.forEach((v) => { if (v) dark++; }));
  score += Math.floor(Math.abs(dark * 100 / (size * size) - 50) / 5) * 10;
  return score;
}

const MASKS = [
  (x, y) => (x + y) % 2 === 0, (x, y) => y % 2 === 0, (x) => x % 3 === 0, (x, y) => (x + y) % 3 === 0,
  (x, y) => (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0, (x, y) => (x * y) % 2 + (x * y) % 3 === 0,
  (x, y) => ((x * y) % 2 + (x * y) % 3) % 2 === 0, (x, y) => ((x + y) % 2 + (x * y) % 3) % 2 === 0
];

export function qrEncode(text, options = {}) {
  const level = LEVELS[options.level] ? options.level : 'M';
  const li = LEVELS[level].i;
  const bytes = utf8(text);
  const minV = Math.max(1, options.minVersion || 1), maxV = Math.min(40, options.maxVersion || 40);
  let ver = minV;
  for (; ver <= maxV; ver++) if (4 + (ver < 10 ? 8 : 16) + bytes.length * 8 <= dataCodewords(ver, li) * 8) break;
  if (ver > maxV) throw new RangeError('qrEncode: the text is too long for a QR code at level ' + level);
  const size = ver * 4 + 17;

  // the data bits: byte mode, the count, the bytes, the terminator, then the pad codewords
  const bits = [];
  const put = (val, len) => { for (let i = len - 1; i >= 0; i--) bits.push((val >>> i) & 1); };
  put(4, 4); put(bytes.length, ver < 10 ? 8 : 16); bytes.forEach((b) => put(b, 8));
  const capacity = dataCodewords(ver, li) * 8;
  put(0, Math.min(4, capacity - bits.length));
  put(0, (8 - (bits.length % 8)) % 8);
  for (let pad = 0xec; bits.length < capacity; pad ^= 0xec ^ 0x11) put(pad, 8);
  const data = [];
  for (let i = 0; i < bits.length; i += 8) { let b = 0; for (let j = 0; j < 8; j++) b = (b << 1) | bits[i + j]; data.push(b); }

  // the blocks with their error correction, interleaved
  const nBlocks = BLOCKS[li][ver], eccLen = ECC_PER_BLOCK[li][ver], raw = Math.floor(rawModules(ver) / 8);
  const nShort = nBlocks - (raw % nBlocks), shortLen = Math.floor(raw / nBlocks);
  const div = divisor(eccLen), blocks = [];
  for (let i = 0, k = 0; i < nBlocks; i++) {
    const dat = data.slice(k, k + shortLen - eccLen + (i < nShort ? 0 : 1)); k += dat.length;
    const ecc = remainder(dat, div);
    if (i < nShort) dat.push(0);
    blocks.push(dat.concat(ecc));
  }
  const codewords = [];
  for (let i = 0; i < blocks[0].length; i++) blocks.forEach((b, j) => { if (i !== shortLen - eccLen || j >= nShort) codewords.push(b[i]); });

  // the function patterns
  const modules = Array.from({ length: size }, () => new Array(size).fill(false));
  const fixed = Array.from({ length: size }, () => new Array(size).fill(false));
  const set = (x, y, dark) => { modules[y][x] = dark; fixed[y][x] = true; };
  for (let i = 0; i < size; i++) { set(6, i, i % 2 === 0); set(i, 6, i % 2 === 0); }
  [[3, 3], [size - 4, 3], [3, size - 4]].forEach(([cx, cy]) => {
    for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) {
      const d = Math.max(Math.abs(dx), Math.abs(dy)), x = cx + dx, y = cy + dy;
      if (x >= 0 && x < size && y >= 0 && y < size) set(x, y, d !== 2 && d !== 4);
    }
  });
  const al = alignmentPositions(ver, size), last = al.length - 1;
  al.forEach((ay, i) => al.forEach((ax, j) => {
    if ((i === 0 && j === 0) || (i === 0 && j === last) || (i === last && j === 0)) return;
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) set(ax + dx, ay + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
  }));
  const drawFormat = (mask) => {
    const d = (LEVELS[level].bits << 3) | mask;
    let r = d; for (let i = 0; i < 10; i++) r = (r << 1) ^ ((r >>> 9) * 0x537);
    const f = ((d << 10) | r) ^ 0x5412;
    for (let i = 0; i <= 5; i++) set(8, i, bit(f, i));
    set(8, 7, bit(f, 6)); set(8, 8, bit(f, 7)); set(7, 8, bit(f, 8));
    for (let i = 9; i < 15; i++) set(14 - i, 8, bit(f, i));
    for (let i = 0; i < 8; i++) set(size - 1 - i, 8, bit(f, i));
    for (let i = 8; i < 15; i++) set(8, size - 15 + i, bit(f, i));
    set(8, size - 8, true);
  };
  drawFormat(0);
  if (ver >= 7) {
    let r = ver; for (let i = 0; i < 12; i++) r = (r << 1) ^ ((r >>> 11) * 0x1f25);
    const v = (ver << 12) | r;
    for (let i = 0; i < 18; i++) { const a = size - 11 + (i % 3), b = Math.floor(i / 3); set(a, b, bit(v, i)); set(b, a, bit(v, i)); }
  }

  // the codewords, in two-module columns from the bottom right, zigzagging up and down
  let n = 0;
  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5;
    for (let vert = 0; vert < size; vert++) for (let j = 0; j < 2; j++) {
      const x = right - j, up = ((right + 1) & 2) === 0, y = up ? size - 1 - vert : vert;
      if (!fixed[y][x] && n < codewords.length * 8) { modules[y][x] = bit(codewords[n >>> 3], 7 - (n & 7)); n++; }
    }
  }

  // the mask: the one asked for, or the one with the lowest penalty
  const apply = (mask) => { const f = MASKS[mask]; for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (!fixed[y][x] && f(x, y)) modules[y][x] = !modules[y][x]; };
  let mask = options.mask;
  if (!(mask >= 0 && mask <= 7)) {
    let best = Infinity;
    for (let k = 0; k < 8; k++) {
      apply(k); drawFormat(k);
      const p = penalty(modules, size);
      if (p < best) { best = p; mask = k; }
      apply(k);
    }
  }
  apply(mask); drawFormat(mask);
  return { version: ver, size, level, mask, modules };
}
