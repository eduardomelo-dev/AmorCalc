import React, { useState, useMemo } from 'react';
import { analyzeQuadraticFunction } from '../../math/functions';
import { KatexMath } from '../../components/common/KatexMath';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const QuadraticFunctionAnalysis: React.FC = () => {
  const [a, setA] = useState(1);
  const [b, setB] = useState(-4);
  const [c, setC] = useState(3);

  const analysis = useMemo(() => {
    try {
      return analyzeQuadraticFunction(a === 0 ? 1 : a, b, c);
    } catch {
      return analyzeQuadraticFunction(1, b, c);
    }
  }, [a, b, c]);

  return (
    <div className="flex flex-col gap-4">
      {/* Input de Coeficientes a, b, c */}
      <div className="p-4 rounded-2xl bg-pink-50/70 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-900/50">
        <p className="text-xs font-bold text-pink-900 dark:text-pink-200 mb-3">
          Defina os coeficientes da função quadrática f(x) = ax² + bx + c:
        </p>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-amor-muted dark:text-amor-dark-muted mb-1">
              a (a ≠ 0):
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
              b:
            </label>
            <input
              type="number"
              step="any"
              value={b}
              onChange={(e) => setB(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-amor-dark-card border border-pink-200 dark:border-pink-800 text-sm font-bold font-mono text-amor-ink dark:text-pink-100"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-amor-muted dark:text-amor-dark-muted mb-1">
              c:
            </label>
            <input
              type="number"
              step="any"
              value={c}
              onChange={(e) => setC(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-amor-dark-card border border-pink-200 dark:border-pink-800 text-sm font-bold font-mono text-amor-ink dark:text-pink-100"
            />
          </div>
        </div>
      </div>

      {/* Fórmula Renderizada em KaTeX */}
      <div className="p-4 rounded-2xl bg-white dark:bg-amor-dark-card border border-pink-200 dark:border-pink-900/50 text-center shadow-xs">
        <p className="text-xs text-amor-muted dark:text-amor-dark-muted font-bold mb-1">
          Lei da Função Quadrática:
        </p>
        <div className="text-lg sm:text-xl font-bold text-pink-800 dark:text-pink-200">
          <KatexMath math={analysis.latexFormula} block />
        </div>
      </div>

      {/* Grid de Propriedades Analíticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/40">
          <p className="text-[11px] font-bold text-amor-muted">Discriminante (Δ):</p>
          <p className="text-base font-extrabold text-pink-700 dark:text-pink-300 font-mono mt-0.5">
            Δ = {analysis.delta}
          </p>
          <p className="text-[10px] text-amor-muted mt-0.5">
            {analysis.delta > 0
              ? 'Δ > 0 (Duas raízes reais distintas)'
              : analysis.delta === 0
              ? 'Δ = 0 (Uma raiz real dupla)'
              : 'Δ < 0 (Sem raízes reais)'}
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/40">
          <p className="text-[11px] font-bold text-amor-muted">Raízes f(x) = 0:</p>
          <p className="text-base font-extrabold text-pink-700 dark:text-pink-300 font-mono mt-0.5">
            {analysis.realRoots.length > 0
              ? analysis.realRoots.map((r) => `x = ${r}`).join(' e ')
              : 'Complexas / Inexistentes em ℝ'}
          </p>
          <p className="text-[10px] text-amor-muted mt-0.5">Pontos de interseção com o eixo x</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/40">
          <p className="text-[11px] font-bold text-amor-muted">
            Vértice V(Xv, Yv) — {analysis.vertex.type.toUpperCase()}:
          </p>
          <p className="text-base font-extrabold text-pink-700 dark:text-pink-300 font-mono mt-0.5">
            V({analysis.vertex.x}, {analysis.vertex.y})
          </p>
          <p className="text-[10px] text-amor-muted mt-0.5">
            Xv = -b/(2a) | Yv = -Δ/(4a)
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/40">
          <p className="text-[11px] font-bold text-amor-muted">Concavidade da Parábola:</p>
          <p className="text-base font-extrabold text-pink-700 dark:text-pink-300 capitalize mt-0.5">
            Voltada {analysis.concavity}
          </p>
          <p className="text-[10px] text-amor-muted mt-0.5">
            {analysis.a > 0 ? 'a > 0 (formato de U)' : 'a < 0 (formato de U invertido)'}
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/40">
          <p className="text-[11px] font-bold text-amor-muted">Eixo de Simetria:</p>
          <p className="text-base font-extrabold text-pink-700 dark:text-pink-300 font-mono mt-0.5">
            x = {analysis.symmetryAxis}
          </p>
          <p className="text-[10px] text-amor-muted mt-0.5">Reta vertical divisora da parábola</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/40">
          <p className="text-[11px] font-bold text-amor-muted">Conjunto Imagem:</p>
          <p className="text-base font-extrabold text-pink-700 dark:text-pink-300 mt-0.5">
            Im = {analysis.imageRange}
          </p>
          <p className="text-[10px] text-amor-muted mt-0.5">Valores que f(x) pode assumir</p>
        </div>
      </div>

      {/* Explicação Didática */}
      <div className="p-4 rounded-2xl bg-pink-100/60 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-900/40">
        <p className="text-xs font-extrabold text-pink-900 dark:text-pink-200 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>Passo a Passo com Nathaniel:</span>
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
