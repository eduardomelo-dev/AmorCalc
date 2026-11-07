export interface HistoryEntry {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
  favorite?: boolean;
  category?: 'calculator' | 'equations' | 'statistics';
}
