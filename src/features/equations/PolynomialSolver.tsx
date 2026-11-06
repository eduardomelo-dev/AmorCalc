import React, { useState } from 'react';
import { solveAlgebraicEquation, factorAlgebraic, simplifyAlgebraic } from '../../math/equations';
import { KatexMath } from '../../components/common/KatexMath';
import { Sparkles } from 'lucide-react';

export const PolynomialSolver: React.FC = () => {
  const [equation, setEquation] = useState('x^2 - 5x + 6 = 0');
  const [polyExpr, setPolyExpr] = useState('x^2 - 4');

  const [equationResult, setEquationResult] = useState(() => solveAlgebraicEquation('x^2 - 5x + 6 = 0', 'x'));
  const [factorResult, setFactorResult] = useState(() => factorAlgebraic('x^2 - 4'));
  const [simplifyResult, setSimplifyResult] = useState(() => simplifyAlgebraic('(x^2 - 1)/(x - 1)'));

  const handleSolve = () => {
    setEquationResult(solveAlgebraicEquation(equation, 'x'));
  };

  const handleFactor = () => {
    setFactorResult(factorAlgebraic(polyExpr));
  };

  const handleSimplify = () => {
    setSimplifyResult(simplifyAlgebraic(polyExpr));
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Resolução de Equações */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/50 shadow-xs flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-pink-600 dark:text-pink-400" />
          <h3 className="text-sm font-extrabold text-pink-950 dark:text-pink-100">
            Resolução de Equações Polinomiais (1º, 2º e Grau Superior)
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          <input
            type="text"
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
            placeholder="Ex: 2x^2 - 8 = 0 ou x^3 - x = 0"
            className="flex-1 w-full px-4 py-2.5 rounded-xl bg-pink-50/60 dark:bg-amor-dark-card border border-pink-200 dark:border-pink-800 text-sm font-mono text-amor-ink dark:text-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            onClick={handleSolve}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-amor hover:scale-[1.02] active:scale-95 transition"
          >
            Resolver
          </button>
        </div>

        {/* Resultado com KaTeX */}
        {equationResult.success && equationResult.latex && (
          <div className="mt-2 p-3.5 rounded-xl bg-pink-50/80 dark:bg-pink-950/40 border border-pink-200/80 dark:border-pink-900/40 text-center">
            <p className="text-xs text-amor-muted dark:text-amor-dark-muted font-bold mb-1">
              Solução Exata Calculada:
            </p>
            <div className="text-base sm:text-lg font-bold text-pink-800 dark:text-pink-200">
              <KatexMath math={equationResult.latex} block />
            </div>
          </div>
        )}

        {equationResult.error && (
          <p className="text-xs text-rose-500 font-bold">{equationResult.error}</p>
        )}
      </div>

      {/* Fatoração e Simplificação Algébrica */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/50 shadow-xs flex flex-col gap-3">
        <h3 className="text-sm font-extrabold text-pink-950 dark:text-pink-100">
          Fatoração e Simplificação Simbólica
        </h3>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          <input
            type="text"
            value={polyExpr}
            onChange={(e) => setPolyExpr(e.target.value)}
            placeholder="Ex: x^2 - 4 ou (x^2 - 1)/(x - 1)"
            className="flex-1 w-full px-4 py-2.5 rounded-xl bg-pink-50/60 dark:bg-amor-dark-card border border-pink-200 dark:border-pink-800 text-sm font-mono text-amor-ink dark:text-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleFactor}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl font-bold text-xs bg-pink-100 hover:bg-pink-200 dark:bg-pink-950/70 text-pink-800 dark:text-pink-200 transition"
            >
              Fatorar
            </button>
            <button
              onClick={handleSimplify}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl font-bold text-xs bg-pink-100 hover:bg-pink-200 dark:bg-pink-950/70 text-pink-800 dark:text-pink-200 transition"
            >
              Simplificar
            </button>
          </div>
        </div>

        {/* Resultados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
          {factorResult.success && factorResult.latex && (
            <div className="p-3 rounded-xl bg-pink-50/60 dark:bg-pink-950/30 border border-pink-200/60 dark:border-pink-900/40 text-center">
              <span className="text-[11px] font-bold text-amor-muted">Forma Fatorada:</span>
              <div className="text-sm sm:text-base font-bold text-pink-700 dark:text-pink-300 mt-1">
                <KatexMath math={factorResult.latex} block />
              </div>
            </div>
          )}

          {simplifyResult.success && simplifyResult.latex && (
            <div className="p-3 rounded-xl bg-pink-50/60 dark:bg-pink-950/30 border border-pink-200/60 dark:border-pink-900/40 text-center">
              <span className="text-[11px] font-bold text-amor-muted">Expressão Simplificada:</span>
              <div className="text-sm sm:text-base font-bold text-pink-700 dark:text-pink-300 mt-1">
                <KatexMath math={simplifyResult.latex} block />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
