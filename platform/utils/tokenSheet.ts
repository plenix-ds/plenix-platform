/* Plenix · plenixTokens
   Summary: The Plenix tokens as an adoptable stylesheet, for a shadow root or a page Plenix does not own (a browser
     extension's content script): every --plx-* custom property, light and dark, and nothing else.
   Usage:
     const sheet = await plenixTokens();                     // tokens.css beside plenix.js / plenix.css on the CDN
     shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, sheet];
     await plenixTokens(chrome.runtime.getURL('plenix/tokens.css'));   // a self-hosted copy
   Props:
     url: the tokens.css address (optional): window.PlenixTokens when set, else tokens.css beside the Plenix script or
       stylesheet on the page
   Behavior: Loads the file once per address and returns the same CSSStyleSheet each time. The sheet sets the tokens on
     :root and on :host, so a shadow root's host carries them; the theme follows data-plx-mode and data-plx-theme on the
     page or the host. Rejects when no address is known or the file does not load.
   Notes: tokens.css is generated with each release (build-packages.js): /cdn/<version>/tokens.css, also in the
     self-hosting archive. It has no @import, so it can be adopted (replaceSync). */
const sheets = new Map<string, Promise<CSSStyleSheet>>();
type WithTokens = Window & { PlenixTokens?: unknown };

function tokensUrl(): string | null {
  if (typeof window !== 'undefined' && typeof (window as WithTokens).PlenixTokens === 'string' && (window as WithTokens).PlenixTokens) return (window as WithTokens).PlenixTokens as string;
  if (typeof document === 'undefined') return null;
  const at = [...document.querySelectorAll<HTMLScriptElement | HTMLLinkElement>('script[src], link[rel="stylesheet"][href]')].map((el) => (el as HTMLScriptElement).src || (el as HTMLLinkElement).href)
    .find((url) => /\/plenix(\.esm|\.min)?\.(js|css)(\?|#|$)/.test(url));
  return at ? new URL('tokens.css', at).href : null;
}

export function plenixTokens(url?: string | null): Promise<CSSStyleSheet> {
  const href = url || tokensUrl();
  if (!href) return Promise.reject(new Error('plenixTokens: no tokens.css address; pass one, or set window.PlenixTokens'));
  if (!sheets.has(href)) {
    sheets.set(href, fetch(href).then((response) => {
      if (!response.ok) throw new Error('plenixTokens: ' + href + ' answered ' + response.status);
      return response.text();
    }).then((css) => { const sheet = new CSSStyleSheet(); sheet.replaceSync(css); return sheet; })
      .catch((error) => { sheets.delete(href); throw error; }));
  }
  return sheets.get(href)!;
}
