import React from 'react';
import { Plus, Eye, EyeOff, Trash2, Sparkles } from 'lucide-react';

export interface FunctionItem {
  id: string;
  expression: string;
  color: string;
  visible: boolean;
}

const PRESET_COLORS = [
  '#ed75b5', // Rosa AmorCalc
  '#3b82f6', // Azul Armin
  '#e11d48', // Vermelho Castiel
  '#10b981', // Verde Lysandre
  '#8b5cf6', // Roxo Kentin
  '#f59e0b', // Âmbar Nathaniel
];

interface FunctionInputListProps {
  functions: FunctionItem[];
  onAddFunction: () => void;
  onUpdateFunction: (id: string, updates: Partial<FunctionItem>) => void;
  onRemoveFunction: (id: string) => void;
}

export const FunctionInputList: React.FC<FunctionInputListProps> = ({
  functions,
  onAddFunction,
  onUpdateFunction,
  onRemoveFunction,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-extrabold text-pink-900 dark:text-pink-100 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-pink-500" />
          <span>Funções a plotar f(x)</span>
        </h3>
        <button
          onClick={onAddFunction}
          className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-800 dark:bg-pink-950/70 dark:text-pink-200 transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Nova Função</span>
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {functions.map((fn, index) => (
          <div
            key={fn.id}
            className="flex items-center gap-2 p-2 rounded-2xl bg-pink-50/70 dark:bg-pink-950/30 border border-pink-200/80 dark:border-pink-900/40 transition"
          >
            {/* Color picker dot */}
            <div className="relative group shrink-0">
              <span
                className="w-4 h-4 rounded-full inline-block cursor-pointer shadow-xs border border-white"
                style={{ backgroundColor: fn.color }}
              />
              {/* Dropdown color palette */}
              <div className="hidden group-hover:flex absolute left-0 top-6 z-20 bg-white dark:bg-amor-dark-surface p-1.5 rounded-xl shadow-lg border border-pink-200 dark:border-pink-900 gap-1">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => onUpdateFunction(fn.id, { color: c })}
                    className="w-4 h-4 rounded-full border border-pink-100"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            <span className="font-mono text-xs font-bold text-pink-700 dark:text-pink-300">
              f{index + 1}(x) =
            </span>

            <input
              type="text"
              value={fn.expression}
              onChange={(e) => onUpdateFunction(fn.id, { expression: e.target.value })}
              placeholder="Ex: x^2 - 4x + 3"
              className="flex-1 bg-white dark:bg-amor-dark-card px-3 py-1.5 rounded-xl border border-pink-200 dark:border-pink-900 text-xs sm:text-sm font-mono text-amor-ink dark:text-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />

            <button
              onClick={() => onUpdateFunction(fn.id, { visible: !fn.visible })}
              className={`p-1.5 rounded-xl transition ${
                fn.visible
                  ? 'text-pink-600 dark:text-pink-400 hover:bg-pink-100 dark:hover:bg-pink-900/60'
                  : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              title={fn.visible ? 'Ocultar curva' : 'Mostrar curva'}
            >
              {fn.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>

            {functions.length > 1 && (
              <button
                onClick={() => onRemoveFunction(fn.id)}
                className="p-1.5 rounded-xl text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-950/60 transition"
                title="Excluir função"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
