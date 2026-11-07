import { describe, it, expect } from 'vitest';
import { calculateStatistics, parseDataSet } from '../../backend/src/math/statistics';

describe('math/statistics', () => {
  it('faz parse correto de conjunto de dados a partir de string com espaços, vírgulas ou quebras de linha', () => {
    const data = parseDataSet('10, 20, 30; 40\n50  60');
    expect(data).toEqual([10, 20, 30, 40, 50, 60]);
  });

  it('calcula estatísticas descritivas completas para conjunto par', () => {
    // Dados ordenados: [2, 4, 4, 4, 5, 5, 7, 9] (n = 8)
    const stats = calculateStatistics([9, 2, 5, 4, 4, 5, 4, 7]);
    expect(stats.count).toBe(8);
    expect(stats.sum).toBe(40);
    expect(stats.mean).toBe(5);
    expect(stats.median).toBe(4.5);
    expect(stats.mode).toEqual([4]); // elemento mais frequente
    expect(stats.min).toBe(2);
    expect(stats.max).toBe(9);
    expect(stats.range).toBe(7);
    expect(stats.q1).toBe(4);
    expect(stats.q2).toBe(4.5);
    expect(stats.q3).toBe(5.5);
    expect(stats.iqr).toBe(1.5);
    expect(stats.variancePop).toBe(4);
    expect(stats.stdDevPop).toBe(2);
  });

  it('calcula estatísticas para conjunto ímpar e bimodal', () => {
    // [1, 2, 2, 3, 4, 4, 5] (modas: 2 e 4)
    const stats = calculateStatistics([1, 2, 2, 3, 4, 4, 5]);
    expect(stats.count).toBe(7);
    expect(stats.median).toBe(3);
    expect(stats.mode).toEqual([2, 4]);
  });

  it('lida graciosamente com conjunto vazio ou de 1 elemento', () => {
    expect(() => calculateStatistics([])).toThrow('Conjunto de dados vazio');
    const single = calculateStatistics([42]);
    expect(single.mean).toBe(42);
    expect(single.median).toBe(42);
    expect(single.stdDevPop).toBe(0);
  });
});
