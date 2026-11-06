import nerdamer from 'nerdamer';
import 'nerdamer/Algebra';
import 'nerdamer/Calculus';
import 'nerdamer/Solve';
import { sanitizeFunctionExpression } from './graphEngine';

export interface EquationResult {
  success: boolean;
  solutions: string[];
  latex?: string;
  error?: string;
}

export interface LinearSystemResult {
  success: boolean;
  solutions: Record<string, string>;
  latex?: string;
  error?: string;
}

export interface SymbolicResult {
  success: boolean;
  result?: string;
  latex?: string;
  error?: string;
}

export function solveAlgebraicEquation(eq: string, variable: string = 'x'): EquationResult {
  try {
    if (!eq.trim()) {
      return { success: false, solutions: [], error: 'Digite uma equação válida' };
    }

    // Se o usuário não digitou '= 0', mas digitou uma expressão
    let formattedEq = eq;
    if (!formattedEq.includes('=')) {
      formattedEq = `${formattedEq} = 0`;
    }

    const [leftSide, rightSide] = formattedEq.split('=').map((s) => s.trim());
    const sanitizedLeft = sanitizeFunctionExpression(leftSide);
    const sanitizedRight = sanitizeFunctionExpression(rightSide);
    const fullSanitized = `${sanitizedLeft} = ${sanitizedRight}`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawSolutions = (nerdamer as any).solve(fullSanitized, variable);
    const str = rawSolutions.toString();

    // Nerdamer retorna array no formato [val1, val2]
    let solutions: string[] = [];
    if (str.startsWith('[') && str.endsWith(']')) {
      const inner = str.slice(1, -1).trim();
      solutions = inner
        ? inner.split(',').map((s: string) => s.trim())
        : [];
    } else if (str) {
      solutions = [str];
    }

    // Gerar representação em LaTeX para KaTeX
    const solutionsLatex = solutions.length > 0
      ? solutions.map((s) => `${variable} = ${nerdamer(s).toTeX()}`).join('\\quad \\text{ou} \\quad ')
      : '\\text{Nenhuma solução encontrada em } \\mathbb{R}';

    return {
      success: true,
      solutions,
      latex: solutionsLatex,
    };
  } catch (err: unknown) {
    return {
      success: false,
      solutions: [],
      error: err instanceof Error ? err.message : 'Erro ao resolver equação algébrica',
    };
  }
}

export function solveLinearSystem(equations: string[]): LinearSystemResult {
  try {
    const validEquations = equations
      .map((eq) => eq.trim())
      .filter(Boolean)
      .map((eq) => {
        if (!eq.includes('=')) return `${sanitizeFunctionExpression(eq)} = 0`;
        const [l, r] = eq.split('=').map((s) => s.trim());
        return `${sanitizeFunctionExpression(l)} = ${sanitizeFunctionExpression(r)}`;
      });

    if (validEquations.length === 0) {
      return { success: false, solutions: {}, error: 'Nenhuma equação fornecida' };
    }

    // Nerdamer solveEquations retorna array de tuplas: [ ['x', 3], ['y', 2] ]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawResult = (nerdamer as any).solveEquations(validEquations) as [string, unknown][];
    const solutions: Record<string, string> = {};

    if (Array.isArray(rawResult)) {
      rawResult.forEach((item) => {
        if (Array.isArray(item) && item.length === 2) {
          solutions[item[0]] = String(item[1]);
        }
      });
    }

    const latex = Object.entries(solutions)
      .map(([k, v]) => `${k} = ${v}`)
      .join(', \\quad ');

    return {
      success: true,
      solutions,
      latex: `\\begin{cases} ${latex} \\end{cases}`,
    };
  } catch (err: unknown) {
    return {
      success: false,
      solutions: {},
      error: err instanceof Error ? err.message : 'Erro ao resolver sistema linear',
    };
  }
}

export function factorAlgebraic(expr: string): SymbolicResult {
  try {
    const sanitized = sanitizeFunctionExpression(expr);
    const factored = nerdamer(`factor(${sanitized})`);
    return {
      success: true,
      result: factored.toString(),
      latex: factored.toTeX(),
    };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Erro ao fatorar expressão',
    };
  }
}

export function simplifyAlgebraic(expr: string): SymbolicResult {
  try {
    const sanitized = sanitizeFunctionExpression(expr);
    const simplified = nerdamer(`simplify(${sanitized})`);
    return {
      success: true,
      result: simplified.toString(),
      latex: simplified.toTeX(),
    };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Erro ao simplificar expressão',
    };
  }
}

export function computeSymbolicDerivative(expr: string, variable: string = 'x'): SymbolicResult {
  try {
    const sanitized = sanitizeFunctionExpression(expr);
    const diff = nerdamer.diff(sanitized, variable);
    return {
      success: true,
      result: diff.toString(),
      latex: `\\frac{d}{d${variable}}\\left(${nerdamer(sanitized).toTeX()}\\right) = ${diff.toTeX()}`,
    };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Erro ao calcular derivada simbólica',
    };
  }
}

export function computeSymbolicIntegral(expr: string, variable: string = 'x'): SymbolicResult {
  try {
    const sanitized = sanitizeFunctionExpression(expr);
    const integrated = nerdamer.integrate(sanitized, variable);
    return {
      success: true,
      result: integrated.toString(),
      latex: `\\int \\left(${nerdamer(sanitized).toTeX()}\\right) d${variable} = ${integrated.toTeX()} + C`,
    };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Erro ao calcular integral simbólica',
    };
  }
}
