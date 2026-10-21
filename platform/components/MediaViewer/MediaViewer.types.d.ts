export interface MediaViewerItem {
  src: string; alt?: string; title?: React.ReactNode; meta?: React.ReactNode[]; kind?: 'image' | 'video';
  poster?: string; audio?: string;
  tracks?: Array<{ src: string; kind?: string; label?: string; srcLang?: string; default?: boolean }>;
}
export interface MediaViewerOptions {
  open?: boolean; onClose?: () => void; index?: number; defaultIndex?: number; onIndexChange?: (index: number) => void;
  label?: string; actions?: React.ReactNode; className?: string;
  strings?: Partial<Record<'label' | 'close' | 'previous' | 'next' | 'counter', string>>;
}
export type MediaViewerProps = MediaViewerOptions & (
  { items: MediaViewerItem[]; count?: never; getItem?: never } |
  { items?: never; count: number; getItem: (index: number) => MediaViewerItem | undefined }
);
export declare const MediaViewer: React.ComponentType<MediaViewerProps>;
