import React, { useState } from 'react';
import { Delete, Sparkles } from 'lucide-react';

interface KeypadProps {
  onInsert: (val: string) => void;
  onClear: () => void;
  onBackspace: () => void;
  onCalculate: () => void;
}

export const Keypad: React.FC<KeypadProps> = ({
  onInsert,
  onClear,
  onBackspace,
  onCalculate,
}) => {
  const [showInverseTrig, setShowInverseTrig] = useState(false);

  return (
    <div className="flex flex-col gap-2.5 w-full select-none">
      {/* Scientific Function Grid */}
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
        <button
          onClick={() => setShowInverseTrig(!showInverseTrig)}
          className={`py-2 px-1 text-xs font-bold rounded-xl transition-all border ${
            showInverseTrig
              ? 'bg-pink-600 text-white border-pink-700 shadow-xs'
              : 'bg-pink-100/90 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-900/40 hover:bg-pink-200'
          }`}
          title="Alternar funções inversas"
        >
          2nd
        </button>

        <button
          onClick={() => onInsert(showInverseTrig ? 'asin(' : 'sin(')}
          className="py-2 px-1 text-xs sm:text-sm font-bold rounded-xl bg-pink-100/90 dark:bg-pink-950/60 text-pink-800 dark:text-pink-200 hover:bg-pink-200 dark:hover:bg-pink-900/60 transition border border-pink-200 dark:border-pink-900/40"
        >
          {showInverseTrig ? 'sin⁻¹' : 'sin'}
        </button>

        <button
          onClick={() => onInsert(showInverseTrig ? 'acos(' : 'cos(')}
          className="py-2 px-1 text-xs sm:text-sm font-bold rounded-xl bg-pink-100/90 dark:bg-pink-950/60 text-pink-800 dark:text-pink-200 hover:bg-pink-200 dark:hover:bg-pink-900/60 transition border border-pink-200 dark:border-pink-900/40"
        >
          {showInverseTrig ? 'cos⁻¹' : 'cos'}
        </button>

        <button
          onClick={() => onInsert(showInverseTrig ? 'atan(' : 'tan(')}
          className="py-2 px-1 text-xs sm:text-sm font-bold rounded-xl bg-pink-100/90 dark:bg-pink-950/60 text-pink-800 dark:text-pink-200 hover:bg-pink-200 dark:hover:bg-pink-900/60 transition border border-pink-200 dark:border-pink-900/40"
        >
          {showInverseTrig ? 'tan⁻¹' : 'tan'}
        </button>

        <button
          onClick={() => onInsert('pi')}
          className="py-2 px-1 text-xs sm:text-sm font-bold rounded-xl bg-pink-100/90 dark:bg-pink-950/60 text-pink-800 dark:text-pink-200 hover:bg-pink-200 dark:hover:bg-pink-900/60 transition border border-pink-200 dark:border-pink-900/40"
        >
          π
        </button>

        <button
          onClick={() => onInsert('^2')}
          className="py-2 px-1 text-xs sm:text-sm font-bold rounded-xl bg-pink-100/90 dark:bg-pink-950/60 text-pink-800 dark:text-pink-200 hover:bg-pink-200 dark:hover:bg-pink-900/60 transition border border-pink-200 dark:border-pink-900/40"
        >
          x²
        </button>

        <button
          onClick={() => onInsert('^')}
          className="py-2 px-1 text-xs sm:text-sm font-bold rounded-xl bg-pink-100/90 dark:bg-pink-950/60 text-pink-800 dark:text-pink-200 hover:bg-pink-200 dark:hover:bg-pink-900/60 transition border border-pink-200 dark:border-pink-900/40"
        >
          xʸ
        </button>

        <button
          onClick={() => onInsert('sqrt(')}
          className="py-2 px-1 text-xs sm:text-sm font-bold rounded-xl bg-pink-100/90 dark:bg-pink-950/60 text-pink-800 dark:text-pink-200 hover:bg-pink-200 dark:hover:bg-pink-900/60 transition border border-pink-200 dark:border-pink-900/40"
        >
          √
        </button>

        <button
          onClick={() => onInsert('log10(')}
          className="py-2 px-1 text-xs sm:text-sm font-bold rounded-xl bg-pink-100/90 dark:bg-pink-950/60 text-pink-800 dark:text-pink-200 hover:bg-pink-200 dark:hover:bg-pink-900/60 transition border border-pink-200 dark:border-pink-900/40"
        >
          log
        </button>

        <button
          onClick={() => onInsert('e')}
          className="py-2 px-1 text-xs sm:text-sm font-bold rounded-xl bg-pink-100/90 dark:bg-pink-950/60 text-pink-800 dark:text-pink-200 hover:bg-pink-200 dark:hover:bg-pink-900/60 transition border border-pink-200 dark:border-pink-900/40"
        >
          e
        </button>

        <button
          onClick={() => onInsert('(')}
          className="py-2 px-1 text-xs sm:text-sm font-bold rounded-xl bg-pink-100/90 dark:bg-pink-950/60 text-pink-800 dark:text-pink-200 hover:bg-pink-200 dark:hover:bg-pink-900/60 transition border border-pink-200 dark:border-pink-900/40"
        >
          (
        </button>

        <button
          onClick={() => onInsert(')')}
          className="py-2 px-1 text-xs sm:text-sm font-bold rounded-xl bg-pink-100/90 dark:bg-pink-950/60 text-pink-800 dark:text-pink-200 hover:bg-pink-200 dark:hover:bg-pink-900/60 transition border border-pink-200 dark:border-pink-900/40"
        >
          )
        </button>

        <button
          onClick={() => onInsert('!')}
          className="py-2 px-1 text-xs sm:text-sm font-bold rounded-xl bg-pink-100/90 dark:bg-pink-950/60 text-pink-800 dark:text-pink-200 hover:bg-pink-200 dark:hover:bg-pink-900/60 transition border border-pink-200 dark:border-pink-900/40"
        >
          n!
        </button>

        <button
          onClick={() => onInsert('ln(')}
          className="py-2 px-1 text-xs sm:text-sm font-bold rounded-xl bg-pink-100/90 dark:bg-pink-950/60 text-pink-800 dark:text-pink-200 hover:bg-pink-200 dark:hover:bg-pink-900/60 transition border border-pink-200 dark:border-pink-900/40"
        >
          ln
        </button>

        <button
          onClick={() => onInsert('i')}
          className="py-2 px-1 text-xs sm:text-sm font-bold rounded-xl bg-pink-100/90 dark:bg-pink-950/60 text-pink-800 dark:text-pink-200 hover:bg-pink-200 dark:hover:bg-pink-900/60 transition border border-pink-200 dark:border-pink-900/40"
          title="Unidade imaginária"
        >
          i
        </button>
      </div>

      {/* Main Standard Keypad Grid */}
      <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
        {/* Row 1 */}
        <button
          onClick={onClear}
          className="py-3 px-2 rounded-2xl font-black text-sm sm:text-base bg-rose-100 hover:bg-rose-200 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 dark:hover:bg-rose-900/60 transition shadow-xs"
        >
          AC
        </button>

        <button
          onClick={onBackspace}
          className="py-3 px-2 rounded-2xl font-bold flex items-center justify-center bg-pink-100/80 hover:bg-pink-200 text-pink-800 dark:bg-pink-950/60 dark:text-pink-200 dark:hover:bg-pink-900/60 transition shadow-xs"
          title="Apagar caractere"
          aria-label="Apagar"
        >
          <Delete className="w-5 h-5" />
        </button>

        <button
          onClick={() => onInsert('%')}
          className="py-3 px-2 rounded-2xl font-extrabold text-sm sm:text-base bg-pink-100/80 hover:bg-pink-200 text-pink-800 dark:bg-pink-950/60 dark:text-pink-200 transition shadow-xs"
        >
          %
        </button>

        <button
          onClick={() => onInsert('÷')}
          className="py-3 px-2 rounded-2xl font-extrabold text-lg sm:text-xl bg-pink-500 hover:bg-pink-600 text-white shadow-amor transition"
        >
          ÷
        </button>

        {/* Row 2 */}
        <button
          onClick={() => onInsert('7')}
          className="py-3 px-2 rounded-2xl font-bold text-lg sm:text-xl bg-white hover:bg-pink-50 text-amor-ink dark:bg-amor-dark-card dark:text-amor-dark-text dark:hover:bg-pink-950/40 border border-pink-200/80 dark:border-pink-900/40 transition shadow-xs active:scale-95"
        >
          7
        </button>
        <button
          onClick={() => onInsert('8')}
          className="py-3 px-2 rounded-2xl font-bold text-lg sm:text-xl bg-white hover:bg-pink-50 text-amor-ink dark:bg-amor-dark-card dark:text-amor-dark-text dark:hover:bg-pink-950/40 border border-pink-200/80 dark:border-pink-900/40 transition shadow-xs active:scale-95"
        >
          8
        </button>
        <button
          onClick={() => onInsert('9')}
          className="py-3 px-2 rounded-2xl font-bold text-lg sm:text-xl bg-white hover:bg-pink-50 text-amor-ink dark:bg-amor-dark-card dark:text-amor-dark-text dark:hover:bg-pink-950/40 border border-pink-200/80 dark:border-pink-900/40 transition shadow-xs active:scale-95"
        >
          9
        </button>
        <button
          onClick={() => onInsert('×')}
          className="py-3 px-2 rounded-2xl font-extrabold text-lg sm:text-xl bg-pink-500 hover:bg-pink-600 text-white shadow-amor transition"
        >
          ×
        </button>

        {/* Row 3 */}
        <button
          onClick={() => onInsert('4')}
          className="py-3 px-2 rounded-2xl font-bold text-lg sm:text-xl bg-white hover:bg-pink-50 text-amor-ink dark:bg-amor-dark-card dark:text-amor-dark-text dark:hover:bg-pink-950/40 border border-pink-200/80 dark:border-pink-900/40 transition shadow-xs active:scale-95"
        >
          4
        </button>
        <button
          onClick={() => onInsert('5')}
          className="py-3 px-2 rounded-2xl font-bold text-lg sm:text-xl bg-white hover:bg-pink-50 text-amor-ink dark:bg-amor-dark-card dark:text-amor-dark-text dark:hover:bg-pink-950/40 border border-pink-200/80 dark:border-pink-900/40 transition shadow-xs active:scale-95"
        >
          5
        </button>
        <button
          onClick={() => onInsert('6')}
          className="py-3 px-2 rounded-2xl font-bold text-lg sm:text-xl bg-white hover:bg-pink-50 text-amor-ink dark:bg-amor-dark-card dark:text-amor-dark-text dark:hover:bg-pink-950/40 border border-pink-200/80 dark:border-pink-900/40 transition shadow-xs active:scale-95"
        >
          6
        </button>
        <button
          onClick={() => onInsert('-')}
          className="py-3 px-2 rounded-2xl font-extrabold text-lg sm:text-xl bg-pink-500 hover:bg-pink-600 text-white shadow-amor transition"
        >
          -
        </button>

        {/* Row 4 */}
        <button
          onClick={() => onInsert('1')}
          className="py-3 px-2 rounded-2xl font-bold text-lg sm:text-xl bg-white hover:bg-pink-50 text-amor-ink dark:bg-amor-dark-card dark:text-amor-dark-text dark:hover:bg-pink-950/40 border border-pink-200/80 dark:border-pink-900/40 transition shadow-xs active:scale-95"
        >
          1
        </button>
        <button
          onClick={() => onInsert('2')}
          className="py-3 px-2 rounded-2xl font-bold text-lg sm:text-xl bg-white hover:bg-pink-50 text-amor-ink dark:bg-amor-dark-card dark:text-amor-dark-text dark:hover:bg-pink-950/40 border border-pink-200/80 dark:border-pink-900/40 transition shadow-xs active:scale-95"
        >
          2
        </button>
        <button
          onClick={() => onInsert('3')}
          className="py-3 px-2 rounded-2xl font-bold text-lg sm:text-xl bg-white hover:bg-pink-50 text-amor-ink dark:bg-amor-dark-card dark:text-amor-dark-text dark:hover:bg-pink-950/40 border border-pink-200/80 dark:border-pink-900/40 transition shadow-xs active:scale-95"
        >
          3
        </button>
        <button
          onClick={() => onInsert('+')}
          className="py-3 px-2 rounded-2xl font-extrabold text-lg sm:text-xl bg-pink-500 hover:bg-pink-600 text-white shadow-amor transition"
        >
          +
        </button>

        {/* Row 5 */}
        <button
          onClick={() => onInsert('0')}
          className="py-3 px-2 rounded-2xl font-bold text-lg sm:text-xl bg-white hover:bg-pink-50 text-amor-ink dark:bg-amor-dark-card dark:text-amor-dark-text dark:hover:bg-pink-950/40 border border-pink-200/80 dark:border-pink-900/40 transition shadow-xs active:scale-95"
        >
          0
        </button>
        <button
          onClick={() => onInsert('.')}
          className="py-3 px-2 rounded-2xl font-extrabold text-lg sm:text-xl bg-white hover:bg-pink-50 text-amor-ink dark:bg-amor-dark-card dark:text-amor-dark-text dark:hover:bg-pink-950/40 border border-pink-200/80 dark:border-pink-900/40 transition shadow-xs active:scale-95"
        >
          .
        </button>
        <button
          onClick={() => onInsert('ans')}
          className="py-3 px-2 rounded-2xl font-bold text-xs sm:text-sm bg-pink-100/90 hover:bg-pink-200 text-pink-800 dark:bg-pink-950/60 dark:text-pink-200 transition shadow-xs"
          title="Última resposta calculada"
        >
          Ans
        </button>
        <button
          onClick={onCalculate}
          className="py-3 px-2 rounded-2xl font-extrabold text-xl bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white shadow-amor scale-102 transition flex items-center justify-center gap-1 active:scale-95"
        >
          <Sparkles className="w-4 h-4" />
          <span>=</span>
        </button>
      </div>
    </div>
  );
};
