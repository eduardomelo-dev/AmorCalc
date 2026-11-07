import * as math from 'mathjs';
import { sanitizeMathExpression } from './parser';

export interface FunctionSeries {
  xValues: number[];
  yValues: (number | null)[];
}

export interface CurveAnalysis {
  roots: number[];
  vertex?: { x: number; y: number; type: 'min' | 'max' };
}

/** Ajusta a notação de uma função para que o mecanismo matemático consiga interpretá-la. */
export function sanitizeFunctionExpression(expr: string): string {
  let sanitized = sanitizeMathExpression(expr);
  // Garante que expressões como '4x' ou '2x' se tornem '4*x' ou '2*x'
  sanitized = sanitized
    .replace(/(\d)\s*([a-zA-Z])/g, '$1*$2')
    .replace(/([a-zA-Z])\s*(\()/g, '$1*(')
    .replace(/\)\s*([a-zA-Z])/g, ')*$1');

  // Caso específico: funções conhecidas não devem ter * antes de parênteses (ex: sin*, cos*, sqrt*)
  sanitized = sanitized.replace(/\b(sin|cos|tan|log|log10|sqrt|abs)\*\(/g, '$1(');

  return sanitized;
}

/** Calcula os pontos que serão desenhados para uma função dentro do intervalo informado. */
export function generateFunctionSeries(
  expr: string,
  xMin: number,
  xMax: number,
  pointsCount: number = 200
): FunctionSeries {
  const xValues: number[] = [];
  const yValues: (number | null)[] = [];

  const sanitized = sanitizeFunctionExpression(expr);
  let compiled: math.EvalFunction;
  try {
    compiled = math.compile(sanitized);
  } catch {
    return { xValues: [], yValues: [] };
  }

  const step = (xMax - xMin) / (pointsCount - 1);

  for (let i = 0; i < pointsCount; i++) {
    const x = xMin + i * step;
    xValues.push(x);

    try {
      const val = compiled.evaluate({ x, e: Math.E, pi: Math.PI });
      if (typeof val === 'number' && Number.isFinite(val) && Math.abs(val) < 1e6) {
        yValues.push(val);
      } else {
        yValues.push(null);
      }
    } catch {
      yValues.push(null);
    }
  }

  return { xValues, yValues };
}

/** Procura raízes e um possível vértice da curva usando amostragem numérica. */
export function findCurveRootsAndExtrema(
  expr: string,
  xMin: number,
  xMax: number
): CurveAnalysis {
  const sanitized = sanitizeFunctionExpression(expr);
  let compiled: math.EvalFunction;
  try {
    compiled = math.compile(sanitized);
  } catch {
    return { roots: [] };
  }

  const evaluateX = (x: number): number | null => {
    try {
      const val = compiled.evaluate({ x, e: Math.E, pi: Math.PI });
      return typeof val === 'number' && Number.isFinite(val) ? val : null;
    } catch {
      return null;
    }
  };

  const roots: number[] = [];
  const steps = 400;
  const dx = (xMax - xMin) / steps;
  let prevX = xMin;
  let prevY = evaluateX(prevX);

  let minPoint: { x: number; y: number } | null = null;
  let maxPoint: { x: number; y: number } | null = null;

  for (let i = 1; i <= steps; i++) {
    const currX = xMin + i * dx;
    const currY = evaluateX(currX);

    if (prevY !== null && currY !== null) {
      // Rastrear mínimo e máximo para detectar vértice
      if (!minPoint || currY < minPoint.y) {
        minPoint = { x: currX, y: currY };
      }
      if (!maxPoint || currY > maxPoint.y) {
        maxPoint = { x: currX, y: currY };
      }

      // Detecção de cruzamento de zero (raiz)
      if (prevY * currY <= 0) {
        // Refinamento por bissecção
        let a = prevX;
        let b = currX;
        for (let iter = 0; iter < 12; iter++) {
          const mid = (a + b) / 2;
          const midY = evaluateX(mid);
          if (midY === null || Math.abs(midY) < 1e-7) {
            a = mid;
            break;
          }
          if (prevY * midY <= 0) {
            b = mid;
          } else {
            a = mid;
          }
        }
        const root = (a + b) / 2;
        if (!roots.some((r) => Math.abs(r - root) < 0.1)) {
          roots.push(root);
        }
      }
    }

    prevX = currX;
    prevY = currY;
  }

  // Identificar vértice em curvas parabólicas/quadráticas
  let vertex: CurveAnalysis['vertex'] = undefined;
  if (expr.includes('^2') || expr.includes('x^2')) {
    if (minPoint && minPoint.x > xMin + dx && minPoint.x < xMax - dx) {
      vertex = { x: minPoint.x, y: minPoint.y, type: 'min' };
    } else if (maxPoint && maxPoint.x > xMin + dx && maxPoint.x < xMax - dx) {
      vertex = { x: maxPoint.x, y: maxPoint.y, type: 'max' };
    }
  }

  return { roots, vertex };
}
