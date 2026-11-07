import { describe, it, expect } from 'vitest';
import { evaluateExpression, formatMathResult } from '../../backend/src/math/evaluate';

describe('evaluateExpression', () => {
  it('realiza operações aritméticas básicas com precedência correta', () => {
    const res = evaluateExpression('2 + 3 * 4', 'deg');
    expect(res.success).toBe(true);
    expect(res.result).toBe('14');
  });

  it('suporta potenciação e radiciação', () => {
    const power = evaluateExpression('2^3', 'deg');
    expect(power.success).toBe(true);
    expect(power.result).toBe('8');

    const sqrt = evaluateExpression('sqrt(16)', 'deg');
    expect(sqrt.success).toBe(true);
    expect(sqrt.result).toBe('4');
  });

  it('calcula fatorial corretamente', () => {
    const fact = evaluateExpression('5!', 'deg');
    expect(fact.success).toBe(true);
    expect(fact.result).toBe('120');
  });

  it('respeita o modo de ângulo DEG para trigonometria', () => {
    const sin30 = evaluateExpression('sin(30)', 'deg');
    expect(sin30.success).toBe(true);
    expect(parseFloat(sin30.result!)).toBeCloseTo(0.5, 5);

    const cos60 = evaluateExpression('cos(60)', 'deg');
    expect(cos60.success).toBe(true);
    expect(parseFloat(cos60.result!)).toBeCloseTo(0.5, 5);
  });

  it('respeita o modo de ângulo RAD para trigonometria', () => {
    const sinPiHalf = evaluateExpression('sin(pi / 2)', 'rad');
    expect(sinPiHalf.success).toBe(true);
    expect(parseFloat(sinPiHalf.result!)).toBeCloseTo(1, 5);
  });

  it('calcula logaritmos decimais e naturais', () => {
    const log100 = evaluateExpression('log10(100)', 'deg');
    expect(log100.success).toBe(true);
    expect(log100.result).toBe('2');

    const lnE = evaluateExpression('log(e)', 'deg');
    expect(lnE.success).toBe(true);
    expect(parseFloat(lnE.result!)).toBeCloseTo(1, 5);
  });

  it('calcula porcentagem', () => {
    const perc = evaluateExpression('200 * 15%', 'deg');
    expect(perc.success).toBe(true);
    expect(perc.result).toBe('30');
  });

  it('trata divisão por zero graciosamente', () => {
    const divZero = evaluateExpression('10 / 0', 'deg');
    expect(divZero.success).toBe(false);
    expect(divZero.error).toContain('Divisão por zero');
  });

  it('trata sintaxe inválida sem lançar exceção não tratada', () => {
    const badSyntax = evaluateExpression('5 + * 2', 'deg');
    expect(badSyntax.success).toBe(false);
    expect(badSyntax.error).toBeDefined();
  });

  it('suporta operações com números complexos', () => {
    const comp = evaluateExpression('(2 + 3i) + (1 - i)', 'deg');
    expect(comp.success).toBe(true);
    expect(comp.result).toContain('3 + 2i');
  });

  it('formata números decimais evitando dizimas indesejadas de ponto flutuante', () => {
    const formatted = formatMathResult(0.1 + 0.2);
    expect(formatted).toBe('0.3');
  });
});
