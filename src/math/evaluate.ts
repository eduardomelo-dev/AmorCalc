import * as math from 'mathjs';
import { sanitizeMathExpression } from './parser';
import { AngleMode, CalculationResult } from '../types/calculator';

// Criação de instância isolada de mathjs para segurança
const mathInstance = math.create(math.all);

/**
 * Cria escopo personalizado que adapta funções trigonométricas conforme o modo angular (DEG vs RAD)
 */
function createTrigScope(angleMode: AngleMode): Record<string, unknown> {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  if (angleMode === 'deg') {
    return {
      sin: (x: number) => Math.sin(toRad(x)),
      cos: (x: number) => Math.cos(toRad(x)),
      tan: (x: number) => {
        // Tratar assíntotas da tangente (ex: tan(90) ou tan(270))
        const mod = Math.abs(x) % 180;
        if (Math.abs(mod - 90) < 1e-9) {
          throw new Error('Tangente indefinida para este ângulo');
        }
        return Math.tan(toRad(x));
      },
      asin: (x: number) => toDeg(Math.asin(x)),
      acos: (x: number) => toDeg(Math.acos(x)),
      atan: (x: number) => toDeg(Math.atan(x)),
      sec: (x: number) => 1 / Math.cos(toRad(x)),
      csc: (x: number) => 1 / Math.sin(toRad(x)),
      cot: (x: number) => 1 / Math.tan(toRad(x)),
    };
  }

  // Em RAD, usa as funções padrão de mathjs
  return {};
}

export function formatMathResult(val: unknown, precision: number = 10): string {
  if (val === undefined || val === null) return '';

  if (typeof val === 'number') {
    if (!Number.isFinite(val)) {
      if (val === Infinity || val === -Infinity) {
        throw new Error('Divisão por zero ou valor infinito');
      }
      return 'Indefinido';
    }
    // Arredondamento limpo para evitar erros de ponto flutuante como 0.30000000000000004
    const rounded = parseFloat(val.toPrecision(precision));
    return rounded.toString();
  }

  if (typeof val === 'object') {
    // Tratar frações mathjs
    if ('isFraction' in (val as object)) {
      return (val as { s: number; n: number; d: number }).n + '/' + (val as { d: number }).d;
    }
    // Tratar números complexos
    if ('isComplex' in (val as object)) {
      const c = val as { re: number; im: number };
      const re = parseFloat(c.re.toPrecision(precision));
      const im = parseFloat(c.im.toPrecision(precision));
      if (im === 0) return re.toString();
      if (re === 0) return `${im}i`;
      const sign = im > 0 ? '+' : '-';
      return `${re} ${sign} ${Math.abs(im)}i`;
    }
    // Tratar matrizes
    if ('toArray' in (val as object)) {
      return JSON.stringify((val as { toArray: () => unknown }).toArray());
    }
  }

  return String(val);
}

export function evaluateExpression(expr: string, angleMode: AngleMode = 'deg'): CalculationResult {
  try {
    const sanitized = sanitizeMathExpression(expr);
    if (!sanitized) {
      return { success: false, error: 'Expressão vazia' };
    }

    const scope = createTrigScope(angleMode);
    const compiled = mathInstance.compile(sanitized);
    const rawResult = compiled.evaluate(scope);

    // Validação de infinitos gerados por divisão direta (ex: 10 / 0)
    if (typeof rawResult === 'number' && !Number.isFinite(rawResult)) {
      return {
        success: false,
        error: 'Divisão por zero ou valor indefinido',
      };
    }

    const formatted = formatMathResult(rawResult);

    return {
      success: true,
      result: formatted,
      numeric: typeof rawResult === 'number' ? rawResult : undefined,
      raw: rawResult,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Erro no cálculo';
    
    // Tratamento de mensagens amigáveis em português
    let friendly = errorMsg;
    if (errorMsg.includes('Unexpected type of argument') || errorMsg.includes('Cannot convert')) {
      friendly = 'Argumento inválido na expressão';
    } else if (errorMsg.includes('Unexpected end of expression') || errorMsg.includes('Parenthesis')) {
      friendly = 'Parênteses ou sintaxe incompleta';
    } else if (errorMsg.includes('Value expected') || errorMsg.includes('Unexpected part')) {
      friendly = 'Sintaxe matemática incorreta';
    }

    return {
      success: false,
      error: friendly,
    };
  }
}
