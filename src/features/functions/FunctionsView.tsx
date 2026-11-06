import React, { useState } from 'react';
import { LinearFunctionAnalysis } from './LinearFunctionAnalysis';
import { QuadraticFunctionAnalysis } from './QuadraticFunctionAnalysis';
import { ModularFunctionAnalysis } from './ModularFunctionAnalysis';
import { FunctionSquare, Sparkles } from 'lucide-react';

type FunctionTypeTab = 'linear' | 'quadratic' | 'modular';

export const FunctionsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FunctionTypeTab>('linear');

  const tabs: { id: FunctionTypeTab; label: string; formula: string }[] = [
    { id: 'linear', label: 'Função Afim & Linear', formula: 'f(x) = ax + b' },
    { id: 'quadratic', label: 'Função Quadrática (2º Grau)', formula: 'f(x) = ax² + bx + c' },
    { id: 'modular', label: 'Função Modular', formula: 'f(x) = a|x - h| + k' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-5">
      {/* Header do Módulo de Funções */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/50 shadow-amor flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <FunctionSquare className="w-5 h-5 text-pink-600 dark:text-pink-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-pink-950 dark:text-pink-100">
              Estudo Completo das Principais Funções
            </h2>
          </div>
          <p className="text-xs text-amor-muted dark:text-amor-dark-muted mt-0.5">
            Conceitos, raízes, vértice, concavidade, crescimento e domínio analítico com Nathaniel ♡
          </p>
        </div>

        <div className="flex items-center gap-1 text-xs font-bold text-pink-600 dark:text-pink-400 px-3 py-1 rounded-full bg-pink-100/70 dark:bg-pink-950/40 border border-pink-200/60 dark:border-pink-900/40 shrink-0">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Rigor Matemático</span>
        </div>
      </div>

      {/* Tabs Selector */}
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
              className={`text-[10px] font-mono ${
                activeTab === tab.id ? 'text-pink-100' : 'text-amor-muted dark:text-amor-dark-muted'
              }`}
            >
              {tab.formula}
            </span>
          </button>
        ))}
      </div>

      {/* Active Analysis View */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/50 shadow-amor">
        {activeTab === 'linear' && <LinearFunctionAnalysis />}
        {activeTab === 'quadratic' && <QuadraticFunctionAnalysis />}
        {activeTab === 'modular' && <ModularFunctionAnalysis />}
      </div>
    </div>
  );
};
