import React from 'react';
import { AngleMode } from '@backend/types/calculator';
import { AlertCircle, Heart } from 'lucide-react';

interface DisplayProps {
  expression: string;
  result: string;
  error: string | null;
  angleMode: AngleMode;
  memoryActive: boolean;
}

export const Display: React.FC<DisplayProps> = ({
  expression,
  result,
  error,
  angleMode,
  memoryActive,
}) => {
  return (
    <div className="w-full bg-gradient-to-b from-white to-pink-50/70 dark:from-amor-dark-surface dark:to-pink-950/20 rounded-3xl p-4 sm:p-5 border-2 border-pink-200 dark:border-pink-900/60 shadow-amor flex flex-col justify-between min-h-[120px] sm:min-h-[140px] transition-all">
      {/* Top Status Bar in Display */}
      <div className="flex items-center justify-between text-xs font-bold text-amor-muted dark:text-amor-dark-muted pb-1 border-b border-pink-100 dark:border-pink-950/40">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 text-[10px] uppercase tracking-wider font-extrabold">
            {angleMode}
          </span>
          {memoryActive && (
            <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-[10px] font-extrabold animate-pulse">
              M
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-[11px] text-pink-600 dark:text-pink-400">
          <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
          <span>AmorCalc Científica</span>
        </div>
      </div>

      {/* Expression input area */}
      <div className="mt-2 text-right overflow-x-auto whitespace-nowrap scrollbar-none">
        <div className="font-mono text-base sm:text-xl font-medium text-amor-muted dark:text-amor-dark-muted tracking-wide">
          {expression || <span className="opacity-40">0</span>}
        </div>
      </div>

      {/* Result or Error area */}
      <div className="mt-1 text-right overflow-x-auto whitespace-nowrap">
        {error ? (
          <div className="flex items-center justify-end gap-1.5 text-rose-500 font-bold text-sm sm:text-base animate-fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        ) : (
          <div className="font-mono text-2xl sm:text-4xl font-extrabold text-pink-950 dark:text-pink-100 tracking-tight">
            {result ? `= ${result}` : <span className="text-pink-300 dark:text-pink-900/50">0</span>}
          </div>
        )}
      </div>
    </div>
  );
};
