import { describe, it, expect } from 'vitest';
import { generateFunctionSeries, findCurveRootsAndExtrema } from '../../backend/src/math/graphEngine';

describe('graphEngine', () => {
  it('gera pontos uniformes para uma função quadrática f(x) = x^2 - 4x + 3', () => {
    const series = generateFunctionSeries('x^2 - 4*x + 3', -2, 6, 81);
    expect(series.xValues.length).toBe(81);
    expect(series.yValues.length).toBe(81);
    expect(series.xValues[0]).toBe(-2);
    expect(series.xValues[80]).toBe(6);

    // No ponto x = 2, f(2) = 4 - 8 + 3 = -1
    const idxX2 = series.xValues.findIndex((x) => Math.abs(x - 2) < 1e-4);
    expect(idxX2).toBeGreaterThanOrEqual(0);
    expect(series.yValues[idxX2]).toBeCloseTo(-1, 2);
  });

  it('trata assíntotas como 1/x retornando null próximo a zero sem travar', () => {
    const series = generateFunctionSeries('1 / x', -2, 2, 41);
    expect(series.xValues.length).toBe(41);
    // Próximo de zero, o valor deve ser null ou tratado para não explodir
    const zeroIdx = series.xValues.findIndex((x) => Math.abs(x) < 1e-6);
    if (zeroIdx >= 0) {
      expect(series.yValues[zeroIdx]).toBeNull();
    }
  });

  it('calcula numericamente raízes aproximadas de f(x) = x^2 - 4x + 3', () => {
    const { roots, vertex } = findCurveRootsAndExtrema('x^2 - 4*x + 3', -2, 6);
    expect(roots.length).toBe(2);
    expect(roots[0]).toBeCloseTo(1, 1);
    expect(roots[1]).toBeCloseTo(3, 1);

    expect(vertex).toBeDefined();
    if (vertex) {
      expect(vertex.x).toBeCloseTo(2, 1);
      expect(vertex.y).toBeCloseTo(-1, 1);
    }
  });
});
