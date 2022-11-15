export type Layout = 'commonLayout' | 'dashboardLayout';

export interface IPageLayoutContext {
    setLayoutType: (layout: Layout) => void;
    layout: Layout;
}