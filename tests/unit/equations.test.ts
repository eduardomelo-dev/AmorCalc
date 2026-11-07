import { describe, it, expect } from 'vitest';
import {
  solveAlgebraicEquation,
  solveLinearSystem,
  factorAlgebraic,
  simplifyAlgebraic,
  computeSymbolicDerivative,
  computeSymbolicIntegral,
} from '../../backend/src/math/equations';

describe('math/equations (Nerdamer + KaTeX)', () => {
  describe('Resolução de Equações', () => {
    it('resolve equação de 1º grau: 2*x + 6 = 0 -> x = -3', () => {
      const res = solveAlgebraicEquation('2*x + 6 = 0', 'x');
      expect(res.success).toBe(true);
      expect(res.solutions).toContain('-3');
    });

    it('resolve equação de 2º grau: x^2 - 9 = 0 -> x = 3 e x = -3', () => {
      const res = solveAlgebraicEquation('x^2 - 9 = 0', 'x');
      expect(res.success).toBe(true);
      expect(res.solutions).toEqual(expect.arrayContaining(['3', '-3']));
    });

    it('trata equações com sintaxe inválida graciosamente', () => {
      const res = solveAlgebraicEquation('x + = = 5', 'x');
      expect(res.success).toBe(false);
      expect(res.error).toBeDefined();
    });
  });

  describe('Sistemas de Equações', () => {
    it('resolve sistema linear 2x2: x + y = 5 e x - y = 1 -> x = 3, y = 2', () => {
      const res = solveLinearSystem(['x + y = 5', 'x - y = 1']);
      expect(res.success).toBe(true);
      expect(res.solutions['x']).toBe('3');
      expect(res.solutions['y']).toBe('2');
    });

    it('resolve sistema linear 3x3 com variáveis x, y, z', () => {
      const res = solveLinearSystem([
        'x + y + z = 6',
        '2*y + 5*z = -4',
        '2*x + 5*y - z = 27',
      ]);
      expect(res.success).toBe(true);
      expect(res.solutions['x']).toBeDefined();
      expect(res.solutions['y']).toBeDefined();
      expect(res.solutions['z']).toBeDefined();
    });
  });

  describe('Polinômios, Fatoração e Simplificação', () => {
    it('fatora polinômio quadrático: x^2 - 4', () => {
      const res = factorAlgebraic('x^2 - 4');
      expect(res.success).toBe(true);
      expect(res.result).toContain('(-2+x)*(2+x)');
    });

    it('simplifica expressão algébrica: (x^2 - 1)/(x - 1) -> x + 1', () => {
      const res = simplifyAlgebraic('(x^2 - 1)/(x - 1)');
      expect(res.success).toBe(true);
      expect(res.result).toContain('1+x');
    });
  });

  describe('Cálculo Simbólico (Derivadas e Integrais)', () => {
    it('calcula derivada simbólica: d/dx (x^3 + 2*x) -> 3*x^2 + 2', () => {
      const res = computeSymbolicDerivative('x^3 + 2*x', 'x');
      expect(res.success).toBe(true);
      expect(res.result).toContain('2+3*x^2');
      expect(res.latex).toBeDefined();
    });

    it('calcula integral simbólica: ∫ (2*x) dx -> x^2', () => {
      const res = computeSymbolicIntegral('2*x', 'x');
      expect(res.success).toBe(true);
      expect(res.result).toBe('x^2');
    });
  });
});
