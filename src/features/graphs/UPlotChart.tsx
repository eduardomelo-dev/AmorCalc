import React, { useEffect, useRef } from 'react';
import uPlot from 'uplot';
import 'uplot/dist/uPlot.min.css';

export interface GraphSeriesItem {
  id: string;
  expression: string;
  color: string;
  visible: boolean;
  yValues: (number | null)[];
}

interface UPlotChartProps {
  xValues: number[];
  seriesList: GraphSeriesItem[];
  showGrid?: boolean;
  theme?: 'light' | 'dark';
}

export const UPlotChart: React.FC<UPlotChartProps> = ({
  xValues,
  seriesList,
  showGrid = true,
  theme = 'light',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const uplotRef = useRef<uPlot | null>(null);

  useEffect(() => {
    if (!containerRef.current || xValues.length === 0) return;

    // Destruir instância anterior
    if (uplotRef.current) {
      uplotRef.current.destroy();
      uplotRef.current = null;
    }

    const isDark = theme === 'dark';
    const gridColor = isDark ? 'rgba(83, 50, 76, 0.4)' : 'rgba(240, 199, 221, 0.6)';
    const textColor = isDark ? '#fdf2f8' : '#40263a';

    const width = containerRef.current.clientWidth || 600;
    const height = Math.min(Math.max(window.innerHeight * 0.45, 320), 460);

    const activeSeries = seriesList.filter((s) => s.visible && s.yValues.length === xValues.length);

    // Preparar dados no formato aceito pelo uPlot: [xArray, yArray1, yArray2, ...]
    const data: uPlot.AlignedData = [
      xValues,
      ...activeSeries.map((s) => s.yValues),
    ];

    const seriesConfig: uPlot.Series[] = [
      {}, // eixo X
      ...activeSeries.map((s) => ({
        label: s.expression || 'f(x)',
        stroke: s.color,
        width: 2.5,
        points: { show: false },
        spanGaps: false,
      })),
    ];

    const opts: uPlot.Options = {
      width,
      height,
      cursor: {
        drag: { x: true, y: true, setScale: true },
        points: { size: 6 },
      },
      scales: {
        x: { time: false },
        y: { auto: true },
      },
      axes: [
        {
          stroke: textColor,
          grid: { show: showGrid, stroke: gridColor, width: 1 },
          ticks: { stroke: gridColor, width: 1 },
          font: '11px "Quicksand", sans-serif',
          size: 30,
        },
        {
          stroke: textColor,
          grid: { show: showGrid, stroke: gridColor, width: 1 },
          ticks: { stroke: gridColor, width: 1 },
          font: '11px "Quicksand", sans-serif',
          size: 40,
        },
      ],
      series: seriesConfig,
    };

    try {
      uplotRef.current = new uPlot(opts, data, containerRef.current);
    } catch (e) {
      console.warn('Erro ao inicializar uPlot:', e);
    }

    const handleResize = () => {
      if (uplotRef.current && containerRef.current) {
        uplotRef.current.setSize({
          width: containerRef.current.clientWidth,
          height,
        });
      }
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      if (uplotRef.current) {
        uplotRef.current.destroy();
        uplotRef.current = null;
      }
    };
  }, [xValues, seriesList, showGrid, theme]);

  return (
    <div className="w-full relative overflow-hidden rounded-2xl bg-white/90 dark:bg-amor-dark-surface/90 border border-pink-200 dark:border-pink-900/50 p-2 sm:p-3 shadow-inner">
      <div ref={containerRef} className="w-full overflow-hidden" />
      {seriesList.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-amor-muted">
          Digite uma função para gerar o gráfico
        </div>
      )}
    </div>
  );
};
