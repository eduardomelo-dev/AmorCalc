import React, { useState, useMemo } from 'react';
import { UPlotChart, GraphSeriesItem } from './UPlotChart';
import { FunctionInputList, FunctionItem } from './FunctionInputList';
import { GraphControls } from './GraphControls';
import { generateFunctionSeries, findCurveRootsAndExtrema } from '@backend/math/graphEngine';
import { ThemeMode } from '../../types/theme';
import { LineChart, Sparkles, Target } from 'lucide-react';

interface GraphViewProps {
  theme?: ThemeMode;
}

export const GraphView: React.FC<GraphViewProps> = ({ theme = 'light' }) => {
  const [functions, setFunctions] = useState<FunctionItem[]>([
    { id: '1', expression: 'x^2 - 4x + 3', color: '#ed75b5', visible: true },
  ]);

  const [xMin, setXMin] = useState(-2);
  const [xMax, setXMax] = useState(6);
  const [showGrid, setShowGrid] = useState(true);

  const handleAddFunction = () => {
    const nextId = (functions.length + 1).toString();
    const colors = ['#3b82f6', '#10b981', '#e11d48', '#8b5cf6'];
    const color = colors[functions.length % colors.length];
    setFunctions((prev) => [
      ...prev,
      { id: nextId, expression: 'sin(x)', color, visible: true },
    ]);
  };

  const handleUpdateFunction = (id: string, updates: Partial<FunctionItem>) => {
    setFunctions((prev) =>
      prev.map((fn) => (fn.id === id ? { ...fn, ...updates } : fn))
    );
  };

  const handleRemoveFunction = (id: string) => {
    setFunctions((prev) => prev.filter((fn) => fn.id !== id));
  };

  const handleApplyPreset = (expr: string, min: number, max: number) => {
    setXMin(min);
    setXMax(max);
    setFunctions((prev) => [
      {
        id: prev[0]?.id || '1',
        expression: expr,
        color: prev[0]?.color || '#ed75b5',
        visible: true,
      },
    ]);
  };

  // Gerar dados do gráfico
  const { xValues, seriesList, analysis } = useMemo(() => {
    const pointsCount = 200;
    const firstActive = functions.find((f) => f.visible && f.expression.trim());

    let primaryXValues: number[] = [];
    const seriesResult: GraphSeriesItem[] = [];

    functions.forEach((fn) => {
      if (!fn.visible || !fn.expression.trim()) return;

      const series = generateFunctionSeries(fn.expression, xMin, xMax, pointsCount);
      if (series.xValues.length > 0 && primaryXValues.length === 0) {
        primaryXValues = series.xValues;
      }

      seriesResult.push({
        id: fn.id,
        expression: fn.expression,
        color: fn.color,
        visible: fn.visible,
        yValues: series.yValues,
      });
    });

    let curveAnalysis = null;
    if (firstActive) {
      curveAnalysis = findCurveRootsAndExtrema(firstActive.expression, xMin, xMax);
    }

    return {
      xValues: primaryXValues,
      seriesList: seriesResult,
      analysis: curveAnalysis,
    };
  }, [functions, xMin, xMax]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full max-w-6xl mx-auto">
      {/* Coluna Principal: Canvas do Gráfico uPlot */}
      <div className="lg:col-span-8 flex flex-col gap-4">
        {/* Painel do Gráfico */}
        <div className="rounded-3xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/50 p-4 shadow-amor flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LineChart className="w-5 h-5 text-pink-600 dark:text-pink-400" />
              <h2 className="text-base font-extrabold text-pink-950 dark:text-pink-100">
                Plano Cartesiano 2D Interativo
              </h2>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amor-muted">
              <span>Arraste para Zoom</span>
            </div>
          </div>

          <UPlotChart
            xValues={xValues}
            seriesList={seriesList}
            showGrid={showGrid}
            theme={theme}
          />
        </div>

        {/* Controles de Intervalo e Presets */}
        <GraphControls
          xMin={xMin}
          xMax={xMax}
          showGrid={showGrid}
          onUpdateRange={(min, max) => {
            setXMin(min);
            setXMax(max);
          }}
          onToggleGrid={() => setShowGrid(!showGrid)}
          onApplyPreset={handleApplyPreset}
        />
      </div>

      {/* Coluna Lateral: Lista de Funções & Análise de Raízes */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        {/* Gerenciador de Funções */}
        <div className="rounded-3xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/50 p-4 shadow-amor">
          <FunctionInputList
            functions={functions}
            onAddFunction={handleAddFunction}
            onUpdateFunction={handleUpdateFunction}
            onRemoveFunction={handleRemoveFunction}
          />
        </div>

        {/* Análise Analítica da Função Principal */}
        {analysis && (
          <div className="rounded-3xl bg-gradient-to-br from-pink-50 to-white dark:from-pink-950/40 dark:to-amor-dark-surface border border-pink-200/90 dark:border-pink-900/50 p-4 shadow-amor flex flex-col gap-2.5">
            <div className="flex items-center gap-2 pb-2 border-b border-pink-200/60 dark:border-pink-900/40">
              <Target className="w-4 h-4 text-pink-600 dark:text-pink-400" />
              <h3 className="text-xs font-extrabold text-pink-900 dark:text-pink-100 uppercase tracking-wider">
                Pontos Notáveis da Curva
              </h3>
            </div>

            {/* Raízes detectadas */}
            <div className="text-xs">
              <span className="font-bold text-amor-muted dark:text-amor-dark-muted">Raízes f(x) = 0: </span>
              {analysis.roots.length > 0 ? (
                <span className="font-mono font-extrabold text-pink-700 dark:text-pink-300">
                  {analysis.roots.map((r) => `x ≈ ${r.toFixed(2)}`).join('  e  ')}
                </span>
              ) : (
                <span className="text-amor-muted italic">Nenhuma raiz no intervalo atual</span>
              )}
            </div>

            {/* Vértice da Parábola */}
            {analysis.vertex && (
              <div className="text-xs">
                <span className="font-bold text-amor-muted dark:text-amor-dark-muted">
                  Vértice ({analysis.vertex.type === 'min' ? 'Mínimo' : 'Máximo'}):{' '}
                </span>
                <span className="font-mono font-extrabold text-pink-700 dark:text-pink-300">
                  V({analysis.vertex.x.toFixed(2)}, {analysis.vertex.y.toFixed(2)})
                </span>
              </div>
            )}

            <div className="pt-2 text-[11px] text-pink-600 dark:text-pink-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Calculado numericamente com precisão!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
