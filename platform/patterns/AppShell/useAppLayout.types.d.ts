export interface AppLayoutBack { label: React.ReactNode; onBack(): void; ref?: React.RefObject<HTMLElement | null>; }
export interface AppLayoutState {
  mode: 'inline' | 'rail' | 'overlay' | 'bar' | 'screen' | 'none'; open: boolean; expanded: boolean; width: number | null;
  setWidth(width: number): void; toggle(): void; close(): void; small: boolean; narrow: boolean;
  barEl: HTMLElement | null; parentEl: HTMLElement | null; slotEl: HTMLElement | null; hasSideNav: boolean;
  page: string; layout: string;
  claimPage(kind: string): () => void; parentRow: boolean; claimParentRow(): () => void;
  detailBack: AppLayoutBack | null; claimBack(back: AppLayoutBack): () => void;
  [key: string]: unknown;
}
/** The layout state for the panes, or null outside an AppShell. */
export declare function useAppLayout(): AppLayoutState | null;
