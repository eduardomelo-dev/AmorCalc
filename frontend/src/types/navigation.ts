export type TabId =
  | 'calculator'
  | 'graphs'
  | 'functions'
  | 'equations'
  | 'statistics'
  | 'conversions'
  | 'formulas'
  | 'history'
  | 'settings';

export interface NavItem {
  id: TabId;
  label: string;
  iconName: string;
  badge?: string;
  description: string;
}
