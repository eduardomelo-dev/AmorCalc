import React, { useState, useMemo } from 'react';
import { analyzeLinearFunction } from '@backend/math/functions';
import { KatexMath } from '../../components/common/KatexMath';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const LinearFunctionAnalysis: React.FC = () => {
  const [a, setA] = useState(2);
  const [b, setB] = useState(-4);

  const analysis = useMemo(() => analyzeLinearFunction(a, b), [a, b]);

  return (
    <div className="flex flex-col gap-4">
      {/* Input de Coeficientes */}
      <div className="p-4 rounded-2xl bg-pink-50/70 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-900/50">
        <p className="text-xs font-bold text-pink-900 dark:text-pink-200 mb-3">
          Defina os coeficientes da função afim f(x) = ax + b:
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-amor-muted dark:text-amor-dark-muted mb-1">
              Coeficiente angular (a):
            </label>
            <input
              type="number"
              step="any"
              value={a}
              onChange={(e) => setA(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-amor-dark-card border border-pink-200 dark:border-pink-800 text-sm font-bold font-mono text-amor-ink dark:text-pink-100"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-amor-muted dark:text-amor-dark-muted mb-1">
              Coeficiente linear (b):
            </label>
            <input
              type="number"
              step="any"
              value={b}
              onChange={(e) => setB(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-amor-dark-card border border-pink-200 dark:border-pink-800 text-sm font-bold font-mono text-amor-ink dark:text-pink-100"
            />
          </div>
        </div>
      </div>

      {/* Fórmula Renderizada em KaTeX */}
      <div className="p-4 rounded-2xl bg-white dark:bg-amor-dark-card border border-pink-200 dark:border-pink-900/50 text-center shadow-xs">
        <p className="text-xs text-amor-muted dark:text-amor-dark-muted font-bold mb-1">
          Equação da Reta:
        </p>
        <div className="text-lg sm:text-xl font-bold text-pink-800 dark:text-pink-200">
          <KatexMath math={analysis.latexFormula} block />
        </div>
      </div>

      {/* Grid de Propriedades Analíticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/40">
          <p className="text-[11px] font-bold text-amor-muted">Raiz da Função (f(x) = 0):</p>
          <p className="text-base font-extrabold text-pink-700 dark:text-pink-300 font-mono mt-0.5">
            {analysis.root !== null ? `x = ${analysis.root}` : 'Não possui raiz'}
          </p>
          <p className="text-[10px] text-amor-muted mt-0.5">
            Ponto de corte no eixo x: ({analysis.root ?? '—'}, 0)
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/40">
          <p className="text-[11px] font-bold text-amor-muted">Comportamento:</p>
          <p className="text-base font-extrabold text-pink-700 dark:text-pink-300 capitalize mt-0.5">
            {analysis.behavior}
          </p>
          <p className="text-[10px] text-amor-muted mt-0.5">
            {analysis.a > 0 ? 'a > 0 (inclinação ascendente)' : analysis.a < 0 ? 'a < 0 (inclinação descendente)' : 'a = 0 (reta horizontal)'}
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/40">
          <p className="text-[11px] font-bold text-amor-muted">Intercepto no Eixo Y:</p>
          <p className="text-base font-extrabold text-pink-700 dark:text-pink-300 font-mono mt-0.5">
            (0, {analysis.b})
          </p>
          <p className="text-[10px] text-amor-muted mt-0.5">Valor de f(0) = b</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/40">
          <p className="text-[11px] font-bold text-amor-muted">Domínio e Imagem:</p>
          <p className="text-base font-extrabold text-pink-700 dark:text-pink-300 mt-0.5">
            D = ℝ | Im = {analysis.imageRange}
          </p>
          <p className="text-[10px] text-amor-muted mt-0.5">Válido para todo x real</p>
        </div>
      </div>

      {/* Explicação passo a passo */}
      <div className="p-4 rounded-2xl bg-pink-100/60 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-900/40">
        <p className="text-xs font-extrabold text-pink-900 dark:text-pink-200 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>Caderno de Estudos com Nathaniel:</span>
        </p>
        <ul className="space-y-1.5 text-xs text-amor-ink dark:text-pink-200 font-medium">
          {analysis.explanation.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
