import React, { useState } from 'react';
import { FORMULAS_DATA } from './formulasData';
import { KatexMath } from '../../components/common/KatexMath';
import { BookOpen, Search, Sparkles } from 'lucide-react';

export const FormulasView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Todas as Fórmulas' },
    { id: 'algebra', label: 'Álgebra' },
    { id: 'geometria', label: 'Geometria' },
    { id: 'trigonometria', label: 'Trigonometria' },
    { id: 'calculo', label: 'Cálculo' },
    { id: 'fisica', label: 'Física Matemática' },
  ];

  const filteredFormulas = FORMULAS_DATA.filter((formula) => {
    const matchesCategory = selectedCategory === 'all' || formula.category === selectedCategory;
    const matchesSearch =
      formula.name.toLowerCase().includes(search.toLowerCase()) ||
      formula.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-5">
      {/* Header do Módulo */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/50 shadow-amor flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-pink-600 dark:text-pink-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-pink-950 dark:text-pink-100">
              Catálogo de Fórmulas Matemáticas em KaTeX
            </h2>
          </div>
          <p className="text-xs text-amor-muted dark:text-amor-dark-muted mt-0.5">
            A elegância e harmonia de fórmulas científicas organizadas com Rosalya ♡
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-100/70 dark:bg-pink-950/40 border border-pink-200/60 dark:border-pink-900/40 text-xs font-bold text-pink-700 dark:text-pink-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Alta Costura Matemática</span>
        </div>
      </div>

      {/* Barra de Busca e Filtro de Categoria */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-amor-muted absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar fórmula..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/50 text-xs sm:text-sm font-medium text-amor-ink dark:text-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-pink-600 text-white shadow-xs'
                  : 'bg-white/80 dark:bg-amor-dark-card text-amor-ink dark:text-pink-200 hover:bg-pink-100 dark:hover:bg-pink-950/50 border border-pink-200 dark:border-pink-900/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Fórmulas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFormulas.map((formula) => (
          <div
            key={formula.id}
            className="p-5 rounded-3xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/50 shadow-amor flex flex-col justify-between gap-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="text-sm font-extrabold text-pink-900 dark:text-pink-100">
                  {formula.name}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950/70 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800 uppercase">
                  {formula.category}
                </span>
              </div>

              {/* Renderização KaTeX */}
              <div className="my-3 py-3 px-2 rounded-2xl bg-pink-50/70 dark:bg-pink-950/30 border border-pink-200/60 dark:border-pink-900/40 text-center overflow-x-auto">
                <KatexMath math={formula.latex} block />
              </div>

              <p className="text-xs text-amor-muted dark:text-amor-dark-muted leading-relaxed">
                {formula.description}
              </p>
            </div>

            {/* Variáveis e Significados */}
            <div className="pt-2 border-t border-pink-100 dark:border-pink-900/30 text-[11px] space-y-1">
              <span className="font-bold text-pink-700 dark:text-pink-300 block">Significado dos termos:</span>
              {formula.variables.map((v, i) => (
                <div key={i} className="flex items-start gap-1.5 text-amor-ink dark:text-pink-200">
                  <span className="font-mono font-bold text-pink-600 dark:text-pink-400 shrink-0">
                    {v.symbol}:
                  </span>
                  <span>{v.meaning}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
