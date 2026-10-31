/* Plenix · cx (platform/utils/cx.ts): joins class names, skipping empty ones. Internal; not part of the public API. */
export function cx(...parts: unknown[]): string {
  return parts.filter(Boolean).join(' ');
}
