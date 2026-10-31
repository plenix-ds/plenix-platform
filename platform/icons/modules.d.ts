/* Plenix · the icon modules' type (platform/icons/modules.d.ts)
   Summary: What `import X from 'plenix-platform/icons/<set>/<name>'` gives TypeScript: the module object
     platform/icons/layout.js writes for each icon (moduleObject). The build resolves the name (vite.platform.config.mjs,
     plenixIcons); this file only describes it. */
declare module 'plenix-platform/icons/*' {
  type Drawing = { viewBox: string; d: string; transform?: string; fillRule?: string; clipRule?: string };
  const icon: {
    name: string;
    set: 'plenix' | 'material';
    symbol: string;
    fillOutline: boolean;
    mirrored: boolean;
    drawings: Record<20 | 24, { outline: Drawing; fill: Drawing }>;
  };
  export default icon;
}
