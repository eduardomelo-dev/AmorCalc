import { describe, it, expect } from 'vitest';
import {
  analyzeLinearFunction,
  analyzeQuadraticFunction,
  analyzeModularFunction,
} from '../../src/math/functions';

describe('math/functions', () => {
  describe('Função Afim / Linear f(x) = ax + b', () => {
    it('analisa função afim crescente f(x) = 2x - 4', () => {
      const res = analyzeLinearFunction(2, -4);
      expect(res.a).toBe(2);
      expect(res.b).toBe(-4);
      expect(res.root).toBe(2); // 2x - 4 = 0 -> x = 2
      expect(res.behavior).toBe('crescente');
      expect(res.yIntercept).toEqual({ x: 0, y: -4 });
      expect(res.isLinear).toBe(false);
      expect(res.latexFormula).toContain('2x - 4');
    });

    it('analisa função linear que passa pela origem f(x) = 3x', () => {
      const res = analyzeLinearFunction(3, 0);
      expect(res.root).toBe(0);
      expect(res.isLinear).toBe(true);
      expect(res.yIntercept).toEqual({ x: 0, y: 0 });
    });

    it('analisa função afim decrescente f(x) = -5x + 10', () => {
      const res = analyzeLinearFunction(-5, 10);
      expect(res.root).toBe(2);
      expect(res.behavior).toBe('decrescente');
    });
  });

  describe('Função Quadrática f(x) = ax^2 + bx + c', () => {
    it('analisa parábola com duas raízes reais distintas f(x) = x^2 - 4x + 3', () => {
      const res = analyzeQuadraticFunction(1, -4, 3);
      expect(res.delta).toBe(4); // (-4)^2 - 4(1)(3) = 16 - 12 = 4
      expect(res.rootsType).toBe('two_real');
      expect(res.realRoots).toEqual([1, 3]);
      expect(res.concavity).toBe('para cima');
      expect(res.vertex).toEqual({ x: 2, y: -1, type: 'mínimo' });
      expect(res.symmetryAxis).toBe(2);
      expect(res.imageRange).toBe('[-1, +∞)');
    });

    it('analisa parábola com concavidade para baixo e raiz dupla f(x) = -x^2 + 2x - 1', () => {
      const res = analyzeQuadraticFunction(-1, 2, -1);
      expect(res.delta).toBe(0);
      expect(res.rootsType).toBe('double_real');
      expect(res.realRoots).toEqual([1]);
      expect(res.concavity).toBe('para baixo');
      expect(res.vertex).toEqual({ x: 1, y: 0, type: 'máximo' });
      expect(res.imageRange).toBe('(-∞, 0]');
    });

    it('analisa parábola sem raízes reais f(x) = x^2 + 4', () => {
      const res = analyzeQuadraticFunction(1, 0, 4);
      expect(res.delta).toBe(-16);
      expect(res.rootsType).toBe('complex');
      expect(res.realRoots).toEqual([]);
      expect(res.vertex).toEqual({ x: 0, y: 4, type: 'mínimo' });
    });
  });

  describe('Função Modular f(x) = a|x - h| + k', () => {
    it('analisa função modular padrão f(x) = |x|', () => {
      const res = analyzeModularFunction(1, 0, 0);
      expect(res.vertex).toEqual({ x: 0, y: 0 });
      expect(res.roots).toEqual([0]);
      expect(res.opening).toBe('para cima');
      expect(res.imageRange).toBe('[0, +∞)');
    });

    it('analisa função modular transladada f(x) = 2|x - 3| - 4', () => {
      const res = analyzeModularFunction(2, 3, -4);
      expect(res.vertex).toEqual({ x: 3, y: -4 });
      // 2|x - 3| = 4 -> |x - 3| = 2 -> x = 5 ou x = 1
      expect(res.roots).toEqual([1, 5]);
      expect(res.imageRange).toBe('[-4, +∞)');
    });
  });
});
