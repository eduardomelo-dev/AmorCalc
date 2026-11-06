import React, { useEffect } from 'react';
import { useCalculator } from '../../hooks/useCalculator';
import { Display } from './Display';
import { Keypad } from './Keypad';
import { MemoryControls } from './MemoryControls';
import { AngleMode, HistoryEntry } from '../../types/calculator';
import { History, Trash2, ArrowUpRight } from 'lucide-react';

interface CalculatorViewProps {
  angleMode: AngleMode;
  historyList: HistoryEntry[];
  onAddHistory: (entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => void;
  onClearHistory: () => void;
  onSelectHistoryItem: (expression: string) => void;
}

export const CalculatorView: React.FC<CalculatorViewProps> = ({
  angleMode,
  historyList,
  onAddHistory,
  onClearHistory,
  onSelectHistoryItem,
}) => {
  const {
    expression,
    result,
    error,
    memory,
    insert,
    clear,
    backspace,
    calculate,
    setExpressionDirectly,
    memoryClear,
    memoryRecall,
    memoryAdd,
    memorySubtract,
  } = useCalculator({ angleMode, onAddHistory });

  // Atalhos de teclado físicos
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignorar se o foco estiver num input de texto em outra aba
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (/^[0-9]$/.test(e.key)) {
        insert(e.key);
      } else if (['+', '-', '*', '/'].includes(e.key)) {
        insert(e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key);
      } else if (e.key === '.' || e.key === ',') {
        insert('.');
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
      } else if (e.key === 'Backspace') {
        backspace();
      } else if (e.key === 'Escape') {
        clear();
      } else if (e.key === '(' || e.key === ')') {
        insert(e.key);
      } else if (e.key === '^') {
        insert('^');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [insert, calculate, backspace, clear]);

  const recentHistory = historyList.slice(0, 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full max-w-5xl mx-auto">
      {/* Coluna Principal da Calculadora */}
      <div className="lg:col-span-8 flex flex-col gap-4">
        {/* Display Digital */}
        <Display
          expression={expression}
          result={result}
          error={error}
          angleMode={angleMode}
          memoryActive={memory !== 0}
        />

        {/* Controles de Memória */}
        <MemoryControls
          memory={memory}
          onClear={memoryClear}
          onRecall={memoryRecall}
          onAdd={memoryAdd}
          onSubtract={memorySubtract}
        />

        {/* Teclado Científico */}
        <div className="p-3 sm:p-4 rounded-3xl bg-white/70 dark:bg-amor-dark-surface/70 border border-pink-200 dark:border-pink-900/50 shadow-amor">
          <Keypad
            onInsert={insert}
            onClear={clear}
            onBackspace={backspace}
            onCalculate={calculate}
          />
        </div>
      </div>

      {/* Coluna Lateral: Histórico Rápido & Atalhos */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        {/* Histórico Recente */}
        <div className="rounded-3xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/50 p-4 shadow-amor flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-pink-100 dark:border-pink-900/40">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-pink-600 dark:text-pink-400" />
              <h3 className="text-sm font-extrabold text-pink-900 dark:text-pink-200">
                Histórico Rápido
              </h3>
            </div>
            {recentHistory.length > 0 && (
              <button
                onClick={onClearHistory}
                className="text-xs text-rose-500 hover:text-rose-600 font-bold flex items-center gap-1 transition"
                title="Limpar histórico recente"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Limpar</span>
              </button>
            )}
          </div>

          {recentHistory.length === 0 ? (
            <div className="py-8 text-center text-amor-muted dark:text-amor-dark-muted text-xs">
              <p>Nenhum cálculo recente ainda.</p>
              <p className="text-[11px] mt-1 text-pink-500/80">Faça um cálculo para salvar aqui! ♡</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1">
              {recentHistory.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setExpressionDirectly(item.expression);
                    if (onSelectHistoryItem) onSelectHistoryItem(item.expression);
                  }}
                  className="group p-2.5 rounded-2xl bg-pink-50/70 hover:bg-pink-100/90 dark:bg-pink-950/30 dark:hover:bg-pink-950/70 border border-pink-200/60 dark:border-pink-900/40 cursor-pointer transition flex items-center justify-between gap-2"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-xs text-amor-muted dark:text-amor-dark-muted truncate">
                      {item.expression}
                    </p>
                    <p className="font-mono text-sm font-bold text-pink-800 dark:text-pink-200 truncate">
                      = {item.result}
                    </p>
                  </div>
                  <button
                    className="p-1 rounded-lg text-pink-500 opacity-60 group-hover:opacity-100 transition"
                    title="Usar cálculo"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dicas de Funções e Atalhos */}
        <div className="rounded-3xl bg-gradient-to-br from-pink-100/60 to-purple-50/50 dark:from-pink-950/30 dark:to-purple-950/20 border border-pink-200/80 dark:border-pink-900/40 p-4 shadow-sm text-xs">
          <p className="font-bold text-pink-900 dark:text-pink-200 mb-2">
            💡 Dicas de Atalhos:
          </p>
          <ul className="space-y-1.5 text-amor-muted dark:text-amor-dark-muted text-[11px]">
            <li>• Use o teclado físico para números e sinais</li>
            <li>• <kbd className="px-1 py-0.5 rounded bg-white dark:bg-pink-900 text-pink-700 dark:text-pink-200 font-mono">Enter</kbd> para calcular o resultado</li>
            <li>• <kbd className="px-1 py-0.5 rounded bg-white dark:bg-pink-900 text-pink-700 dark:text-pink-200 font-mono">Esc</kbd> limpa todo o visor (AC)</li>
            <li>• <kbd className="px-1 py-0.5 rounded bg-white dark:bg-pink-900 text-pink-700 dark:text-pink-200 font-mono">Backspace</kbd> apaga o último item</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
