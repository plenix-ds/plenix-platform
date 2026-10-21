import type { MediaViewerProps } from '../../platform/components/MediaViewer/MediaViewer.types';
const eager: MediaViewerProps = { items: [{ src: 'image.png', kind: 'image' }] };
const lazy: MediaViewerProps = { count: 1500, getItem: index => ({ src: String(index), kind: 'image' }), onIndexChange: index => index.toFixed() };
// @ts-expect-error count is numeric
const wrongCount: MediaViewerProps = { count: '1500', getItem: () => ({ src: '' }) };
// @ts-expect-error lazy items must have a source
const wrongItem: MediaViewerProps = { count: 1, getItem: () => ({ title: 'Missing source' }) };
// @ts-expect-error a lazy collection requires its accessor
const missingAccessor: MediaViewerProps = { count: 1500 };
// @ts-expect-error collection sources are mutually exclusive
const mixed: MediaViewerProps = { items: [], count: 2, getItem: () => ({ src: '' }) };
void [eager, lazy, wrongCount, wrongItem, missingAccessor, mixed];
