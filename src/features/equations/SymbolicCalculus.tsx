import React, { useState } from 'react';
import { computeSymbolicDerivative, computeSymbolicIntegral } from '../../math/equations';
import { KatexMath } from '../../components/common/KatexMath';
import { Sparkles } from 'lucide-react';

export const SymbolicCalculus: React.FC = () => {
  const [expr, setExpr] = useState('x^3 + 3*x^2 - 5*x + 2');
  const [variable, setVariable] = useState('x');

  const [diffResult, setDiffResult] = useState(() => computeSymbolicDerivative('x^3 + 3*x^2 - 5*x + 2', 'x'));
  const [intResult, setIntResult] = useState(() => computeSymbolicIntegral('x^3 + 3*x^2 - 5*x + 2', 'x'));

  const handleCompute = () => {
    setDiffResult(computeSymbolicDerivative(expr, variable));
    setIntResult(computeSymbolicIntegral(expr, variable));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/50 shadow-xs flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-pink-600 dark:text-pink-400" />
          <h3 className="text-sm font-extrabold text-pink-950 dark:text-pink-100">
            Cálculo Simbólico (Derivadas & Integrais Indefinidas)
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          <input
            type="text"
            value={expr}
            onChange={(e) => setExpr(e.target.value)}
            placeholder="Ex: x^3 + sin(x) ou 2*x*e^x"
            className="flex-1 w-full px-4 py-2.5 rounded-xl bg-pink-50/60 dark:bg-amor-dark-card border border-pink-200 dark:border-pink-800 text-sm font-mono text-amor-ink dark:text-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-amor-muted">em relação a:</span>
            <input
              type="text"
              value={variable}
              onChange={(e) => setVariable(e.target.value || 'x')}
              className="w-12 px-2 py-2 rounded-xl bg-pink-50/60 dark:bg-amor-dark-card border border-pink-200 dark:border-pink-800 text-center text-sm font-mono font-bold"
            />
            <button
              onClick={handleCompute}
              className="px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-amor hover:scale-[1.02] active:scale-95 transition"
            >
              Calcular
            </button>
          </div>
        </div>

        {/* Resultados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          {/* Derivada */}
          <div className="p-4 rounded-xl bg-pink-50/70 dark:bg-pink-950/30 border border-pink-200/70 dark:border-pink-900/40 text-center">
            <span className="text-xs font-extrabold text-pink-700 dark:text-pink-300">
              Derivada d/dx:
            </span>
            {diffResult.success && diffResult.latex ? (
              <div className="text-sm sm:text-base font-bold text-amor-ink dark:text-pink-100 mt-2">
                <KatexMath math={diffResult.latex} block />
              </div>
            ) : (
              <p className="text-xs text-rose-500 mt-2">{diffResult.error}</p>
            )}
          </div>

          {/* Integral */}
          <div className="p-4 rounded-xl bg-pink-50/70 dark:bg-pink-950/30 border border-pink-200/70 dark:border-pink-900/40 text-center">
            <span className="text-xs font-extrabold text-pink-700 dark:text-pink-300">
              Integral Indefinida ∫ dx:
            </span>
            {intResult.success && intResult.latex ? (
              <div className="text-sm sm:text-base font-bold text-amor-ink dark:text-pink-100 mt-2">
                <KatexMath math={intResult.latex} block />
              </div>
            ) : (
              <p className="text-xs text-rose-500 mt-2">{intResult.error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
