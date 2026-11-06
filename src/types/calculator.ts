export interface CalculationResult {
  success: boolean;
  result?: string;
  numeric?: number;
  error?: string;
  raw?: unknown;
}

export interface HistoryEntry {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
  favorite?: boolean;
  category?: 'calculator' | 'equations' | 'statistics';
}

export type AngleMode = 'deg' | 'rad';
