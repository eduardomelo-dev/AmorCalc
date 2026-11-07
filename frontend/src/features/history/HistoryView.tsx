import React, { useState } from 'react';
import { HistoryEntry } from '../../types/history';
import { History, Star, Trash2, ArrowUpRight, Search, Download } from 'lucide-react';

interface HistoryViewProps {
  historyList: HistoryEntry[];
  onToggleFavorite: (id: string) => void;
  onClearHistory: () => void;
  onRemoveItem: (id: string) => void;
  onRestoreCalculation: (expression: string) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  historyList,
  onToggleFavorite,
  onClearHistory,
  onRemoveItem,
  onRestoreCalculation,
}) => {
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');
  const [search, setSearch] = useState('');

  const filtered = historyList.filter((item) => {
    const matchesFilter = filter === 'all' || (filter === 'favorites' && item.favorite);
    const matchesSearch =
      item.expression.toLowerCase().includes(search.toLowerCase()) ||
      item.result.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const exportHistoryAsJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(historyList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `amorcalc_historico_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-5">
      {/* Header */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/50 shadow-amor flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-pink-600 dark:text-pink-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-pink-950 dark:text-pink-100">
              Histórico Persistente de Cálculos
            </h2>
          </div>
          <p className="text-xs text-amor-muted dark:text-amor-dark-muted mt-0.5">
            Suas memórias e conquistas salvas com a Docete (Sucrette) ♡
          </p>
        </div>

        <div className="flex items-center gap-2">
          {historyList.length > 0 && (
            <>
              <button
                onClick={exportHistoryAsJson}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-100/80 hover:bg-pink-200 dark:bg-pink-950/70 text-xs font-bold text-pink-800 dark:text-pink-200 transition"
                title="Exportar histórico como arquivo JSON"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar</span>
              </button>
              <button
                onClick={onClearHistory}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 dark:bg-rose-950/50 text-xs font-bold text-rose-700 dark:text-rose-300 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Limpar Tudo</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Barra de Filtros e Busca */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-amor-muted absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar histórico..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/50 text-xs sm:text-sm font-medium text-amor-ink dark:text-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filter === 'all'
                ? 'bg-pink-600 text-white shadow-xs'
                : 'bg-white/80 dark:bg-amor-dark-card text-amor-ink dark:text-pink-200 border border-pink-200 dark:border-pink-900'
            }`}
          >
            Todos ({historyList.length})
          </button>
          <button
            onClick={() => setFilter('favorites')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
              filter === 'favorites'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-white/80 dark:bg-amor-dark-card text-amor-ink dark:text-pink-200 border border-pink-200 dark:border-pink-900'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Favoritos ({historyList.filter((i) => i.favorite).length})</span>
          </button>
        </div>
      </div>

      {/* Lista de Itens do Histórico */}
      {filtered.length === 0 ? (
        <div className="p-10 rounded-3xl bg-white/70 dark:bg-amor-dark-surface/70 border border-pink-200 dark:border-pink-900/50 text-center flex flex-col items-center justify-center gap-2">
          <p className="text-sm font-bold text-amor-muted dark:text-amor-dark-muted">
            Nenhum cálculo encontrado neste filtro.
          </p>
          <p className="text-xs text-pink-600 dark:text-pink-400">
            Realize cálculos nas outras abas para que eles fiquem salvos aqui automaticamente! ♡
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-white/85 dark:bg-amor-dark-surface/85 border border-pink-200 dark:border-pink-900/50 shadow-xs flex items-center justify-between gap-3 group hover:border-pink-400 transition"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {item.category && (
                    <span className="text-[10px] uppercase font-bold text-amor-muted">
                      {item.category}
                    </span>
                  )}
                </div>
                <p className="font-mono text-sm text-amor-ink dark:text-pink-100 font-bold truncate">
                  {item.expression}
                </p>
                <p className="font-mono text-base font-extrabold text-pink-600 dark:text-pink-400 truncate">
                  = {item.result}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => onToggleFavorite(item.id)}
                  className={`p-2 rounded-xl transition ${
                    item.favorite
                      ? 'text-amber-500 fill-amber-500 bg-amber-50 dark:bg-amber-950/40'
                      : 'text-gray-400 hover:text-amber-500 hover:bg-pink-50 dark:hover:bg-pink-950/40'
                  }`}
                  title={item.favorite ? 'Remover dos favoritos' : 'Favoritar cálculo'}
                >
                  <Star className={`w-4 h-4 ${item.favorite ? 'fill-amber-500' : ''}`} />
                </button>

                <button
                  onClick={() => onRestoreCalculation(item.expression)}
                  className="p-2 rounded-xl text-pink-600 dark:text-pink-400 hover:bg-pink-100 dark:hover:bg-pink-950/60 transition"
                  title="Restaurar cálculo na Calculadora"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-2 rounded-xl text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-950/60 transition"
                  title="Excluir este item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
