export type Layout = 'wholePageLayout' | 'sidebarLayout';

export interface IPageLayoutContext {
    setLayoutType: (layout: Layout) => void;
    layout: Layout;
}