import React, { useState } from 'react';
import { solveLinearSystem } from '@backend/math/equations';
import { KatexMath } from '../../components/common/KatexMath';
import { Plus, Trash2, Sparkles } from 'lucide-react';

export const LinearSystemSolver: React.FC = () => {
  const [equations, setEquations] = useState<string[]>([
    'x + y = 5',
    'x - y = 1',
  ]);

  const [result, setResult] = useState(() => solveLinearSystem(['x + y = 5', 'x - y = 1']));

  const handleUpdate = (idx: number, val: string) => {
    setEquations((prev) => prev.map((eq, i) => (i === idx ? val : eq)));
  };

  const handleAdd = () => {
    if (equations.length < 4) {
      setEquations((prev) => [...prev, 'x + 2*y + z = 10']);
    }
  };

  const handleRemove = (idx: number) => {
    if (equations.length > 2) {
      setEquations((prev) => prev.filter((_, i) => i !== idx));
    }
  };

  const handleSolve = () => {
    setResult(solveLinearSystem(equations));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/50 shadow-xs flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-600 dark:text-pink-400" />
            <h3 className="text-sm font-extrabold text-pink-950 dark:text-pink-100">
              Sistema de Equações Lineares (2x2 ou 3x3)
            </h3>
          </div>
          {equations.length < 3 && (
            <button
              onClick={handleAdd}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-800 dark:bg-pink-950/60 dark:text-pink-200 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Adicionar Equação</span>
            </button>
          )}
        </div>

        {/* Lista de Equações */}
        <div className="flex flex-col gap-2">
          {equations.map((eq, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-pink-600 dark:text-pink-400 w-6">
                E{idx + 1}:
              </span>
              <input
                type="text"
                value={eq}
                onChange={(e) => handleUpdate(idx, e.target.value)}
                placeholder="Ex: 2x + 3y = 12"
                className="flex-1 px-3 py-2 rounded-xl bg-pink-50/60 dark:bg-amor-dark-card border border-pink-200 dark:border-pink-800 text-sm font-mono text-amor-ink dark:text-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              {equations.length > 2 && (
                <button
                  onClick={() => handleRemove(idx)}
                  className="p-2 rounded-xl text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-950/60 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleSolve}
          className="mt-2 w-full py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-amor hover:scale-[1.01] active:scale-95 transition"
        >
          Resolver Sistema Linear
        </button>

        {/* Resultado */}
        {result.success && result.latex && (
          <div className="mt-2 p-4 rounded-xl bg-pink-50/80 dark:bg-pink-950/40 border border-pink-200/80 dark:border-pink-900/40 text-center">
            <p className="text-xs text-amor-muted dark:text-amor-dark-muted font-bold mb-1">
              Solução do Sistema:
            </p>
            <div className="text-base sm:text-lg font-bold text-pink-800 dark:text-pink-200">
              <KatexMath math={result.latex} block />
            </div>
          </div>
        )}

        {result.error && (
          <p className="text-xs text-rose-500 font-bold">{result.error}</p>
        )}
      </div>
    </div>
  );
};
