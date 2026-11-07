export interface CalculationResult {
  success: boolean;
  result?: string;
  numeric?: number;
  error?: string;
  raw?: unknown;
}

export type AngleMode = 'deg' | 'rad';
