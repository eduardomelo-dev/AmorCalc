import React from 'react';
import { Grid, RotateCcw } from 'lucide-react';

interface GraphControlsProps {
  xMin: number;
  xMax: number;
  showGrid: boolean;
  onUpdateRange: (min: number, max: number) => void;
  onToggleGrid: () => void;
  onApplyPreset: (expr: string, min: number, max: number) => void;
}

export const GraphControls: React.FC<GraphControlsProps> = ({
  xMin,
  xMax,
  showGrid,
  onUpdateRange,
  onToggleGrid,
  onApplyPreset,
}) => {
  return (
    <div className="flex flex-col gap-3 p-3.5 rounded-2xl bg-white/70 dark:bg-amor-dark-surface/70 border border-pink-200 dark:border-pink-900/50 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Intervalo de X */}
        <div className="flex items-center gap-2 text-xs font-bold text-amor-ink dark:text-amor-dark-text">
          <span>Intervalo X:</span>
          <input
            type="number"
            value={xMin}
            onChange={(e) => onUpdateRange(parseFloat(e.target.value) || -10, xMax)}
            className="w-16 px-2 py-1 rounded-xl bg-white dark:bg-amor-dark-card border border-pink-200 dark:border-pink-800 text-center font-mono"
          />
          <span>até</span>
          <input
            type="number"
            value={xMax}
            onChange={(e) => onUpdateRange(xMin, parseFloat(e.target.value) || 10)}
            className="w-16 px-2 py-1 rounded-xl bg-white dark:bg-amor-dark-card border border-pink-200 dark:border-pink-800 text-center font-mono"
          />
        </div>

        {/* Botoes de Ação */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleGrid}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-xl border transition ${
              showGrid
                ? 'bg-pink-100 dark:bg-pink-950/70 text-pink-700 dark:text-pink-300 border-pink-300 dark:border-pink-800'
                : 'bg-white dark:bg-amor-dark-card text-gray-400 border-gray-200 dark:border-gray-800'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Grade</span>
          </button>

          <button
            onClick={() => onUpdateRange(-5, 5)}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-xl bg-pink-100 hover:bg-pink-200 dark:bg-pink-950/60 dark:hover:bg-pink-900 text-pink-800 dark:text-pink-200 transition"
            title="Redefinir intervalo para [-5, 5]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Padrão</span>
          </button>
        </div>
      </div>

      {/* Atalhos de Funções Típicas (Presets do Caderno de Estudo) */}
      <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-pink-100 dark:border-pink-900/30 text-[11px]">
        <span className="font-bold text-pink-600 dark:text-pink-400">Exemplos:</span>
        <button
          onClick={() => onApplyPreset('x^2 - 4x + 3', -2, 6)}
          className="px-2 py-0.5 rounded-lg bg-pink-50 hover:bg-pink-100 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-900 font-mono transition"
        >
          x² - 4x + 3
        </button>
        <button
          onClick={() => onApplyPreset('2*x + 1', -5, 5)}
          className="px-2 py-0.5 rounded-lg bg-pink-50 hover:bg-pink-100 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-900 font-mono transition"
        >
          Afim: 2x + 1
        </button>
        <button
          onClick={() => onApplyPreset('sin(x)', -6.28, 6.28)}
          className="px-2 py-0.5 rounded-lg bg-pink-50 hover:bg-pink-100 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-900 font-mono transition"
        >
          sin(x)
        </button>
        <button
          onClick={() => onApplyPreset('abs(x)', -5, 5)}
          className="px-2 py-0.5 rounded-lg bg-pink-50 hover:bg-pink-100 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-900 font-mono transition"
        >
          Modular: |x|
        </button>
      </div>
    </div>
  );
};
