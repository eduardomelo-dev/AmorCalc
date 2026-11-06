import React from 'react';

interface HistogramBin {
  range: string;
  min: number;
  max: number;
  count: number;
}

interface HistogramChartProps {
  bins: HistogramBin[];
}

export const HistogramChart: React.FC<HistogramChartProps> = ({ bins }) => {
  if (bins.length === 0) return null;

  const maxCount = Math.max(...bins.map((b) => b.count), 1);

  return (
    <div className="w-full flex flex-col gap-2 pt-2">
      <div className="flex items-end justify-between gap-2 h-44 px-3 py-2 bg-pink-50/60 dark:bg-pink-950/20 rounded-2xl border border-pink-200/80 dark:border-pink-900/40">
        {bins.map((bin, idx) => {
          const heightPercent = (bin.count / maxCount) * 100;
          return (
            <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
              <span className="text-[10px] font-bold text-pink-700 dark:text-pink-300 opacity-0 group-hover:opacity-100 transition-opacity">
                {bin.count}
              </span>
              <div
                style={{ height: `${Math.max(heightPercent, 6)}%` }}
                className="w-full max-w-[48px] bg-gradient-to-t from-pink-500 to-pink-400 dark:from-pink-600 dark:to-pink-400 rounded-t-xl group-hover:brightness-110 transition-all shadow-xs"
              />
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-1 px-1">
        {bins.map((bin, idx) => (
          <div key={idx} className="flex-1 text-center truncate">
            <span className="text-[9px] sm:text-[10px] font-mono text-amor-muted dark:text-amor-dark-muted truncate block">
              {bin.range}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
