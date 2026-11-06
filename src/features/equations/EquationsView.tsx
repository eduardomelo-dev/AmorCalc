import React, { useState } from 'react';
import { PolynomialSolver } from './PolynomialSolver';
import { LinearSystemSolver } from './LinearSystemSolver';
import { SymbolicCalculus } from './SymbolicCalculus';
import { Sigma, BookOpen } from 'lucide-react';

type EquationSubTab = 'polynomial' | 'systems' | 'calculus';

export const EquationsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<EquationSubTab>('polynomial');

  const tabs: { id: EquationSubTab; label: string; desc: string }[] = [
    { id: 'polynomial', label: 'Equações & Polinômios', desc: 'Raízes e fatoração com Nerdamer' },
    { id: 'systems', label: 'Sistemas Lineares', desc: 'Sistemas 2x2 e 3x3' },
    { id: 'calculus', label: 'Cálculo Simbólico', desc: 'Derivadas e integrais exatas' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-5">
      {/* Header do Módulo */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/50 shadow-amor flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Sigma className="w-5 h-5 text-pink-600 dark:text-pink-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-pink-950 dark:text-pink-100">
              Álgebra Simbólica & Equações
            </h2>
          </div>
          <p className="text-xs text-amor-muted dark:text-amor-dark-muted mt-0.5">
            A harmonia da matemática com resoluções analíticas exatas e KaTeX ♡
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-100/70 dark:bg-pink-950/40 border border-pink-200/60 dark:border-pink-900/40 text-xs font-bold text-pink-700 dark:text-pink-300">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Nerdamer Engine</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-start px-4 py-2.5 rounded-2xl text-left transition-all shrink-0 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-amor scale-[1.02]'
                : 'bg-white/80 dark:bg-amor-dark-card text-amor-ink dark:text-amor-dark-text hover:bg-pink-100/70 dark:hover:bg-pink-950/40 border border-pink-200 dark:border-pink-900/40'
            }`}
          >
            <span className="text-xs sm:text-sm font-extrabold">{tab.label}</span>
            <span
              className={`text-[10px] ${
                activeTab === tab.id ? 'text-pink-100' : 'text-amor-muted dark:text-amor-dark-muted'
              }`}
            >
              {tab.desc}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/50 shadow-amor">
        {activeTab === 'polynomial' && <PolynomialSolver />}
        {activeTab === 'systems' && <LinearSystemSolver />}
        {activeTab === 'calculus' && <SymbolicCalculus />}
      </div>
    </div>
  );
};
