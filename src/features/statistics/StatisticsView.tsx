import React, { useState, useMemo } from 'react';
import { parseDataSet, calculateStatistics, StatsSummary } from '../../math/statistics';
import { HistogramChart } from './HistogramChart';
import { BarChart3, Sparkles, AlertCircle } from 'lucide-react';

export const StatisticsView: React.FC = () => {
  const [inputText, setInputText] = useState('12, 15, 18, 22, 22, 25, 28, 30, 32, 35, 38, 40');

  const { stats, error }: { stats: StatsSummary | null; error: string | null } = useMemo(() => {
    try {
      const parsed = parseDataSet(inputText);
      if (parsed.length === 0) {
        return { stats: null, error: 'Insira pelo menos um número válido' };
      }
      return { stats: calculateStatistics(parsed), error: null };
    } catch (e) {
      return { stats: null, error: e instanceof Error ? e.message : 'Erro ao processar dados' };
    }
  }, [inputText]);

  const setSampleData = (sample: string) => {
    setInputText(sample);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-5">
      {/* Header do Módulo */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/50 shadow-amor flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-pink-600 dark:text-pink-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-pink-950 dark:text-pink-100">
              Estatística Descritiva & Análise de Dados
            </h2>
          </div>
          <p className="text-xs text-amor-muted dark:text-amor-dark-muted mt-0.5">
            Média, mediana, moda, variância, desvio padrão e distribuição em histograma com Kentin ♡
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-100/70 dark:bg-pink-950/40 border border-pink-200/60 dark:border-pink-900/40 text-xs font-bold text-pink-700 dark:text-pink-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Foco & Disciplina Militar</span>
        </div>
      </div>

      {/* Entrada de Dados */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/50 shadow-amor flex flex-col gap-3">
        <label className="text-xs font-extrabold text-pink-900 dark:text-pink-200">
          Conjunto de Dados (separe por vírgulas, espaços ou quebra de linha):
        </label>
        <textarea
          rows={3}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ex: 10, 20, 25, 30, 40, 50"
          className="w-full px-4 py-2.5 rounded-2xl bg-pink-50/60 dark:bg-amor-dark-card border border-pink-200 dark:border-pink-800 text-sm font-mono text-amor-ink dark:text-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        {/* Conjuntos de Teste / Presets */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="font-bold text-amor-muted">Exemplos rápidos:</span>
          <button
            onClick={() => setSampleData('2, 4, 4, 4, 5, 5, 7, 9')}
            className="px-2.5 py-1 rounded-xl bg-pink-100/80 hover:bg-pink-200 dark:bg-pink-950/60 text-pink-800 dark:text-pink-200 font-semibold transition"
          >
            Amostra Pequena (n=8)
          </button>
          <button
            onClick={() => setSampleData('10, 12, 14, 15, 15, 18, 19, 21, 24, 25, 29, 31, 35')}
            className="px-2.5 py-1 rounded-xl bg-pink-100/80 hover:bg-pink-200 dark:bg-pink-950/60 text-pink-800 dark:text-pink-200 font-semibold transition"
          >
            Distribuição Contínua (n=13)
          </button>
          <button
            onClick={() => setSampleData('1, 2, 2, 3, 4, 4, 5')}
            className="px-2.5 py-1 rounded-xl bg-pink-100/80 hover:bg-pink-200 dark:bg-pink-950/60 text-pink-800 dark:text-pink-200 font-semibold transition"
          >
            Bimodal (modas 2 e 4)
          </button>
        </div>
      </div>

      {/* Erro se houver */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Resultados Estatísticos */}
      {stats && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Métricas Resumidas em Cards */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/40 shadow-xs">
                <span className="text-[11px] font-bold text-amor-muted block">Total de Elementos (n)</span>
                <span className="text-xl font-extrabold text-pink-700 dark:text-pink-300 font-mono">{stats.count}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/40 shadow-xs">
                <span className="text-[11px] font-bold text-amor-muted block">Média Aritmética (x̄)</span>
                <span className="text-xl font-extrabold text-pink-700 dark:text-pink-300 font-mono">{stats.mean.toFixed(2)}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/40 shadow-xs">
                <span className="text-[11px] font-bold text-amor-muted block">Mediana (Q2)</span>
                <span className="text-xl font-extrabold text-pink-700 dark:text-pink-300 font-mono">{stats.median}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/40 shadow-xs">
                <span className="text-[11px] font-bold text-amor-muted block">Moda(s)</span>
                <span className="text-base sm:text-lg font-extrabold text-pink-700 dark:text-pink-300 font-mono">
                  {stats.mode.length > 0 ? stats.mode.join(', ') : 'Amodal'}
                </span>
              </div>
            </div>

            {/* Medidas de Dispersão */}
            <div className="p-4 sm:p-5 rounded-3xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/50 shadow-amor flex flex-col gap-3">
              <h3 className="text-xs font-extrabold text-pink-900 dark:text-pink-200 uppercase tracking-wider">
                Medidas de Dispersão & Variabilidade
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-2xl bg-pink-50/70 dark:bg-pink-950/30 border border-pink-200/60 dark:border-pink-900/40">
                  <span className="text-[10px] font-bold text-amor-muted block">Variância Amostral (s²)</span>
                  <span className="text-base font-extrabold text-pink-800 dark:text-pink-200 font-mono">
                    {stats.varianceSample.toFixed(3)}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-pink-50/70 dark:bg-pink-950/30 border border-pink-200/60 dark:border-pink-900/40">
                  <span className="text-[10px] font-bold text-amor-muted block">Desvio Padrão Amostral (s)</span>
                  <span className="text-base font-extrabold text-pink-800 dark:text-pink-200 font-mono">
                    {stats.stdDevSample.toFixed(3)}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-pink-50/70 dark:bg-pink-950/30 border border-pink-200/60 dark:border-pink-900/40">
                  <span className="text-[10px] font-bold text-amor-muted block">Desvio Padrão Pop. (σ)</span>
                  <span className="text-base font-extrabold text-pink-800 dark:text-pink-200 font-mono">
                    {stats.stdDevPop.toFixed(3)}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-pink-50/70 dark:bg-pink-950/30 border border-pink-200/60 dark:border-pink-900/40">
                  <span className="text-[10px] font-bold text-amor-muted block">Mínimo / Máximo</span>
                  <span className="text-base font-extrabold text-pink-800 dark:text-pink-200 font-mono">
                    {stats.min} ... {stats.max}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-pink-50/70 dark:bg-pink-950/30 border border-pink-200/60 dark:border-pink-900/40">
                  <span className="text-[10px] font-bold text-amor-muted block">Amplitude Total (Range)</span>
                  <span className="text-base font-extrabold text-pink-800 dark:text-pink-200 font-mono">
                    {stats.range}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-pink-50/70 dark:bg-pink-950/30 border border-pink-200/60 dark:border-pink-900/40">
                  <span className="text-[10px] font-bold text-amor-muted block">Intervalo Interquartil (IQR)</span>
                  <span className="text-base font-extrabold text-pink-800 dark:text-pink-200 font-mono">
                    {stats.iqr.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Histograma Visual */}
            <div className="p-4 sm:p-5 rounded-3xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/50 shadow-amor flex flex-col gap-2">
              <h3 className="text-xs font-extrabold text-pink-950 dark:text-pink-200 uppercase tracking-wider">
                Distribuição de Frequências (Histograma)
              </h3>
              <HistogramChart bins={stats.histogramBins} />
            </div>
          </div>

          {/* Coluna Separatriz de Quartis e Tabela de Frequência */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Boxplot / Quartis */}
            <div className="p-4 rounded-3xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/50 shadow-amor flex flex-col gap-2.5">
              <h3 className="text-xs font-extrabold text-pink-950 dark:text-pink-200 uppercase tracking-wider">
                Quartis & Separatrizes
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 rounded-xl bg-pink-50/70 dark:bg-pink-950/30 font-medium">
                  <span className="text-amor-muted">1º Quartil (Q1 - 25%):</span>
                  <span className="font-mono font-bold text-pink-700 dark:text-pink-300">{stats.q1.toFixed(2)}</span>
                </div>
                <div className="flex justify-between p-2 rounded-xl bg-pink-50/70 dark:bg-pink-950/30 font-medium">
                  <span className="text-amor-muted">2º Quartil (Mediana - 50%):</span>
                  <span className="font-mono font-bold text-pink-700 dark:text-pink-300">{stats.q2.toFixed(2)}</span>
                </div>
                <div className="flex justify-between p-2 rounded-xl bg-pink-50/70 dark:bg-pink-950/30 font-medium">
                  <span className="text-amor-muted">3º Quartil (Q3 - 75%):</span>
                  <span className="font-mono font-bold text-pink-700 dark:text-pink-300">{stats.q3.toFixed(2)}</span>
                </div>
                <div className="flex justify-between p-2 rounded-xl bg-pink-50/70 dark:bg-pink-950/30 font-medium">
                  <span className="text-amor-muted">Soma dos Valores (Σ):</span>
                  <span className="font-mono font-bold text-pink-700 dark:text-pink-300">{stats.sum}</span>
                </div>
              </div>
            </div>

            {/* Tabela de Frequência Absoluta e Relativa */}
            <div className="p-4 rounded-3xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/50 shadow-amor flex flex-col gap-2.5 max-h-[300px] overflow-y-auto">
              <h3 className="text-xs font-extrabold text-pink-950 dark:text-pink-200 uppercase tracking-wider">
                Tabela de Frequências
              </h3>
              <div className="space-y-1 text-xs">
                {stats.frequencies.map((f, i) => (
                  <div key={i} className="flex justify-between py-1 px-2 rounded-lg hover:bg-pink-50 dark:hover:bg-pink-950/40">
                    <span className="font-mono font-bold text-amor-ink dark:text-pink-200">x = {f.value}</span>
                    <span className="font-mono text-pink-600 dark:text-pink-400">
                      {f.count}x ({((f.count / stats.count) * 100).toFixed(1)}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
