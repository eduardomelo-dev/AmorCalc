export interface StatsSummary {
  count: number;
  sum: number;
  mean: number;
  median: number;
  mode: number[];
  min: number;
  max: number;
  range: number;
  variancePop: number;
  varianceSample: number;
  stdDevPop: number;
  stdDevSample: number;
  q1: number;
  q2: number;
  q3: number;
  iqr: number;
  frequencies: { value: number; count: number }[];
  histogramBins: { range: string; min: number; max: number; count: number }[];
}

/** Lê números separados por espaço, vírgula, ponto e vírgula ou quebra de linha. */
export function parseDataSet(input: string): number[] {
  if (!input || !input.trim()) return [];

  // Quebrar por vírgulas, ponto e vírgula, espaços ou novas linhas
  const tokens = input
    .trim()
    .split(/[\s,;]+/)
    .filter(Boolean);

  const numbers: number[] = [];
  for (const token of tokens) {
    const num = parseFloat(token);
    if (!isNaN(num) && Number.isFinite(num)) {
      numbers.push(num);
    }
  }

  return numbers;
}

function calculatePercentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  if (sorted.length === 1) return sorted[0];

  const pos = (sorted.length - 1) * p;
  const base = Math.floor(pos);
  const rest = pos - base;

  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  }
  return sorted[base];
}

/** Calcula medidas descritivas e faixas do histograma para uma lista de valores. */
export function calculateStatistics(data: number[]): StatsSummary {
  if (data.length === 0) {
    throw new Error('Conjunto de dados vazio');
  }

  const sorted = [...data].sort((a, b) => a - b);
  const count = sorted.length;
  const sum = sorted.reduce((acc, v) => acc + v, 0);
  const mean = sum / count;
  const min = sorted[0];
  const max = sorted[count - 1];
  const range = max - min;

  // Mediana
  const mid = Math.floor(count / 2);
  const median = count % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

  // Moda & Frequências
  const freqMap = new Map<number, number>();
  for (const n of sorted) {
    freqMap.set(n, (freqMap.get(n) || 0) + 1);
  }

  let maxFreq = 0;
  const frequencies: { value: number; count: number }[] = [];
  freqMap.forEach((c, v) => {
    frequencies.push({ value: v, count: c });
    if (c > maxFreq) maxFreq = c;
  });

  const mode: number[] = [];
  if (maxFreq > 1) {
    freqMap.forEach((c, v) => {
      if (c === maxFreq) mode.push(v);
    });
  }

  // Variância e Desvio Padrão
  const sumSquaredDiffs = sorted.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0);
  const variancePop = sumSquaredDiffs / count;
  const varianceSample = count > 1 ? sumSquaredDiffs / (count - 1) : 0;
  const stdDevPop = Math.sqrt(variancePop);
  const stdDevSample = Math.sqrt(varianceSample);

  // Quartis
  const q1 = calculatePercentile(sorted, 0.25);
  const q2 = median;
  const q3 = calculatePercentile(sorted, 0.75);
  const iqr = q3 - q1;

  // Histograma em faixas
  const binsCount = Math.min(Math.max(Math.round(Math.sqrt(count)), 4), 8);
  const binWidth = range === 0 ? 1 : range / binsCount;
  const histogramBins: StatsSummary['histogramBins'] = [];

  for (let i = 0; i < binsCount; i++) {
    const bMin = min + i * binWidth;
    const bMax = i === binsCount - 1 ? max + 0.0001 : min + (i + 1) * binWidth;
    const bCount = sorted.filter((v) => v >= bMin && v < bMax).length;
    histogramBins.push({
      range: `${bMin.toFixed(1)} - ${bMax.toFixed(1)}`,
      min: bMin,
      max: bMax,
      count: bCount,
    });
  }

  return {
    count,
    sum,
    mean,
    median,
    mode,
    min,
    max,
    range,
    variancePop,
    varianceSample,
    stdDevPop,
    stdDevSample,
    q1,
    q2,
    q3,
    iqr,
    frequencies,
    histogramBins,
  };
}
