/* Plenix · cx (platform/utils/cx.js): joins class names, skipping empty ones. Internal; not part of the public API. */
export function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}
