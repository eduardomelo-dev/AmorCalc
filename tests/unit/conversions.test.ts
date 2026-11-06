import { describe, it, expect } from 'vitest';
import { convertUnit, getAvailableCategories, getUnitsForCategory } from '../../src/math/conversions';

describe('math/conversions', () => {
  it('converte comprimento: metros para quilômetros e centímetros', () => {
    expect(convertUnit(1500, 'm', 'km', 'length')).toBeCloseTo(1.5, 4);
    expect(convertUnit(2.5, 'm', 'cm', 'length')).toBeCloseTo(250, 4);
  });

  it('converte massa: quilogramas para gramas e libras', () => {
    expect(convertUnit(5, 'kg', 'g', 'mass')).toBe(5000);
    expect(convertUnit(1, 'kg', 'lb', 'mass')).toBeCloseTo(2.20462, 2);
  });

  it('converte temperatura: Celsius, Fahrenheit e Kelvin com precisão', () => {
    expect(convertUnit(0, 'C', 'F', 'temperature')).toBeCloseTo(32, 2);
    expect(convertUnit(100, 'C', 'F', 'temperature')).toBeCloseTo(212, 2);
    expect(convertUnit(25, 'C', 'K', 'temperature')).toBeCloseTo(298.15, 2);
    expect(convertUnit(300, 'K', 'C', 'temperature')).toBeCloseTo(26.85, 2);
  });

  it('impede temperatura abaixo do zero absoluto em Kelvin', () => {
    expect(() => convertUnit(-10, 'K', 'C', 'temperature')).toThrow('abaixo do zero absoluto');
  });

  it('converte velocidade: km/h para m/s', () => {
    expect(convertUnit(72, 'km/h', 'm/s', 'speed')).toBeCloseTo(20, 2);
  });

  it('converte pressão: atm para bar e psi', () => {
    expect(convertUnit(1, 'atm', 'bar', 'pressure')).toBeCloseTo(1.01325, 3);
    expect(convertUnit(1, 'atm', 'psi', 'pressure')).toBeCloseTo(14.696, 2);
  });

  it('fornece todas as 9 categorias obrigatórias', () => {
    const categories = getAvailableCategories();
    expect(categories.length).toBe(9);
    expect(categories.map((c) => c.id)).toEqual(
      expect.arrayContaining([
        'length',
        'mass',
        'temperature',
        'area',
        'volume',
        'time',
        'speed',
        'energy',
        'pressure',
      ])
    );
    const lengthUnits = getUnitsForCategory('length');
    expect(lengthUnits.length).toBeGreaterThan(0);
  });
});
