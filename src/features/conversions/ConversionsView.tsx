import React, { useState, useMemo } from 'react';
import {
  UnitCategory,
  getAvailableCategories,
  getUnitsForCategory,
  convertUnit,
} from '../../math/conversions';
import { ArrowLeftRight, Sparkles, AlertCircle } from 'lucide-react';

export const ConversionsView: React.FC = () => {
  const categories = useMemo(() => getAvailableCategories(), []);
  const [selectedCategory, setSelectedCategory] = useState<UnitCategory>('length');

  const units = useMemo(() => getUnitsForCategory(selectedCategory), [selectedCategory]);
  const [fromUnit, setFromUnit] = useState<string>(units[0]?.id || 'm');
  const [toUnit, setToUnit] = useState<string>(units[1]?.id || 'km');
  const [inputValue, setInputValue] = useState<number>(1);

  // Trocar unidades de entrada/saída quando muda a categoria
  const handleSelectCategory = (cat: UnitCategory) => {
    setSelectedCategory(cat);
    const catUnits = getUnitsForCategory(cat);
    setFromUnit(catUnits[0]?.id || '');
    setToUnit(catUnits[1]?.id || catUnits[0]?.id || '');
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const { convertedValue, error } = useMemo(() => {
    try {
      const res = convertUnit(inputValue, fromUnit, toUnit, selectedCategory);
      return { convertedValue: res, error: null };
    } catch (e) {
      return { convertedValue: null, error: e instanceof Error ? e.message : 'Erro na conversão' };
    }
  }, [inputValue, fromUnit, toUnit, selectedCategory]);

  const fromDef = units.find((u) => u.id === fromUnit);
  const toDef = units.find((u) => u.id === toUnit);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-5">
      {/* Header do Módulo */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/50 shadow-amor flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="w-5 h-5 text-pink-600 dark:text-pink-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-pink-950 dark:text-pink-100">
              Conversor Universal de 9 Categorias de Unidades
            </h2>
          </div>
          <p className="text-xs text-amor-muted dark:text-amor-dark-muted mt-0.5">
            Mude de escalas com máxima precisão e o estilo contagiante de Alexy ♡
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-100/70 dark:bg-pink-950/40 border border-pink-200/60 dark:border-pink-900/40 text-xs font-bold text-pink-700 dark:text-pink-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>9 Categorias Completas</span>
        </div>
      </div>

      {/* Grid Seletor de Categorias */}
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleSelectCategory(cat.id)}
            className={`flex flex-col items-center justify-center p-2.5 rounded-2xl text-center transition-all ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-b from-pink-500 to-pink-600 text-white shadow-amor scale-105'
                : 'bg-white/80 dark:bg-amor-dark-card text-amor-ink dark:text-pink-200 hover:bg-pink-100/80 dark:hover:bg-pink-950/40 border border-pink-200 dark:border-pink-900/40'
            }`}
          >
            <span className="text-xs font-extrabold">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Painel Principal de Conversão */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/50 shadow-amor flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          {/* Unidade Origem */}
          <div className="md:col-span-5 flex flex-col gap-2">
            <label className="text-xs font-bold text-amor-muted">Valor de Origem:</label>
            <input
              type="number"
              step="any"
              value={inputValue}
              onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-2xl bg-pink-50/60 dark:bg-amor-dark-card border border-pink-200 dark:border-pink-800 text-lg font-extrabold font-mono text-pink-950 dark:text-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-amor-dark-card border border-pink-200 dark:border-pink-800 text-xs font-bold text-amor-ink dark:text-pink-100 cursor-pointer"
            >
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Botão de Inversão / Troca */}
          <div className="md:col-span-1 flex items-center justify-center">
            <button
              onClick={handleSwap}
              className="p-3 rounded-2xl bg-pink-100 hover:bg-pink-200 dark:bg-pink-950/70 dark:hover:bg-pink-900 text-pink-800 dark:text-pink-200 shadow-sm transition hover:scale-110 active:scale-95"
              title="Inverter unidades"
              aria-label="Trocar"
            >
              <ArrowLeftRight className="w-5 h-5" />
            </button>
          </div>

          {/* Unidade Destino */}
          <div className="md:col-span-5 flex flex-col gap-2">
            <label className="text-xs font-bold text-amor-muted">Valor Convertido:</label>
            <div className="w-full px-4 py-3 rounded-2xl bg-pink-100/60 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-900/40 text-lg font-extrabold font-mono text-pink-800 dark:text-pink-200 truncate">
              {convertedValue !== null ? (
                <span>
                  {parseFloat(convertedValue.toPrecision(8))} {toDef?.symbol}
                </span>
              ) : (
                <span className="text-amor-muted text-sm">—</span>
              )}
            </div>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-amor-dark-card border border-pink-200 dark:border-pink-800 text-xs font-bold text-amor-ink dark:text-pink-100 cursor-pointer"
            >
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Mensagem de Erro se houver violação física (ex: Kelvin negativo) */}
        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Resumo da Equivalência */}
        {!error && convertedValue !== null && (
          <div className="p-3.5 rounded-2xl bg-pink-50/70 dark:bg-pink-950/30 border border-pink-200/70 dark:border-pink-900/40 text-center">
            <span className="text-xs font-bold text-amor-muted">Equivalência Direta:</span>
            <p className="text-base font-extrabold text-pink-700 dark:text-pink-300 font-mono mt-1">
              {inputValue} {fromDef?.name} = {parseFloat(convertedValue.toPrecision(8))} {toDef?.name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
