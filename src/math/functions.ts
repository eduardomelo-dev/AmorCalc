export interface LinearAnalysisResult {
  a: number;
  b: number;
  isLinear: boolean;
  root: number | null;
  behavior: 'crescente' | 'decrescente' | 'constante';
  yIntercept: { x: number; y: number };
  domain: string;
  imageRange: string;
  latexFormula: string;
  explanation: string[];
}

export interface QuadraticAnalysisResult {
  a: number;
  b: number;
  c: number;
  delta: number;
  rootsType: 'two_real' | 'double_real' | 'complex';
  realRoots: number[];
  concavity: 'para cima' | 'para baixo';
  vertex: { x: number; y: number; type: 'mínimo' | 'máximo' };
  symmetryAxis: number;
  domain: string;
  imageRange: string;
  yIntercept: { x: number; y: number };
  latexFormula: string;
  explanation: string[];
}

export interface ModularAnalysisResult {
  a: number;
  h: number;
  k: number;
  vertex: { x: number; y: number };
  roots: number[];
  opening: 'para cima' | 'para baixo';
  domain: string;
  imageRange: string;
  latexFormula: string;
  explanation: string[];
}

export function analyzeLinearFunction(a: number, b: number): LinearAnalysisResult {
  if (a === 0) {
    return {
      a,
      b,
      isLinear: false,
      root: null,
      behavior: 'constante',
      yIntercept: { x: 0, y: b },
      domain: 'ℝ',
      imageRange: `{${b}}`,
      latexFormula: `f(x) = ${b}`,
      explanation: [
        'Função Constante: f(x) = b. A reta é perfeitamente horizontal e paralela ao eixo x.',
        `Corta o eixo y no ponto (0, ${b}). Não possui raiz se b ≠ 0.`,
      ],
    };
  }

  const rawRoot = -b / a;
  const root = rawRoot === 0 ? 0 : rawRoot;
  const isLinear = b === 0;
  const behavior = a > 0 ? 'crescente' : 'decrescente';

  const bSign = b > 0 ? `+ ${b}` : b < 0 ? `- ${Math.abs(b)}` : '';
  const aStr = a === 1 ? '' : a === -1 ? '-' : `${a}`;
  const latexFormula = isLinear ? `f(x) = ${aStr}x` : `f(x) = ${aStr}x ${bSign}`;

  return {
    a,
    b,
    isLinear,
    root,
    behavior,
    yIntercept: { x: 0, y: b },
    domain: 'ℝ',
    imageRange: 'ℝ',
    latexFormula,
    explanation: [
      `Coeficiente angular: a = ${a} (${behavior.toUpperCase()})`,
      `Coeficiente linear: b = ${b} (intercepta o eixo y em (0, ${b}))`,
      `Raiz da função: x = -b/a = -(${b})/${a} = ${root}`,
      isLinear
        ? 'Como b = 0, trata-se de uma Função Linear legítima, passando exatamente pela origem (0, 0).'
        : 'Como b ≠ 0, trata-se de uma Função Afim completa.',
    ],
  };
}

export function analyzeQuadraticFunction(a: number, b: number, c: number): QuadraticAnalysisResult {
  if (a === 0) {
    throw new Error('O coeficiente "a" de uma função quadrática não pode ser zero');
  }

  const delta = b * b - 4 * a * c;
  const concavity = a > 0 ? 'para cima' : 'para baixo';
  const rawXv = -b / (2 * a);
  const xv = rawXv === 0 ? 0 : rawXv;
  const rawYv = -delta / (4 * a);
  const yv = rawYv === 0 ? 0 : rawYv;

  let rootsType: QuadraticAnalysisResult['rootsType'] = 'complex';
  const realRoots: number[] = [];

  if (delta > 0) {
    rootsType = 'two_real';
    const r1 = (-b - Math.sqrt(delta)) / (2 * a);
    const r2 = (-b + Math.sqrt(delta)) / (2 * a);
    realRoots.push(Math.min(r1, r2), Math.max(r1, r2));
  } else if (delta === 0) {
    rootsType = 'double_real';
    realRoots.push(xv);
  }

  const imageRange = a > 0 ? `[${yv}, +∞)` : `(-∞, ${yv}]`;

  const bSign = b > 0 ? `+ ${b}x` : b < 0 ? `- ${Math.abs(b)}x` : '';
  const cSign = c > 0 ? `+ ${c}` : c < 0 ? `- ${Math.abs(c)}` : '';
  const aStr = a === 1 ? '' : a === -1 ? '-' : `${a}`;
  const latexFormula = `f(x) = ${aStr}x^2 ${bSign} ${cSign}`.trim();

  return {
    a,
    b,
    c,
    delta,
    rootsType,
    realRoots,
    concavity,
    vertex: { x: xv, y: yv, type: a > 0 ? 'mínimo' : 'máximo' },
    symmetryAxis: xv,
    domain: 'ℝ',
    imageRange,
    yIntercept: { x: 0, y: c },
    latexFormula,
    explanation: [
      `Concavidade: a = ${a} (${concavity})`,
      `Discriminante (Delta): Δ = b² - 4ac = (${b})² - 4(${a})(${c}) = ${delta}`,
      delta > 0
        ? `Δ > 0: A parábola corta o eixo x em duas raízes reais distintas: x₁ = ${realRoots[0]} e x₂ = ${realRoots[1]}`
        : delta === 0
        ? `Δ = 0: A parábola tangencia o eixo x na raiz dupla x = ${realRoots[0]}`
        : 'Δ < 0: A parábola não intercepta o eixo x (raízes complexas)',
      `Vértice da Parábola: V(Xv, Yv) = (${xv}, ${yv}) — Ponto de ${a > 0 ? 'Mínimo' : 'Máximo'}`,
      `Eixo de Simetria: reta vertical x = ${xv}`,
      `Conjunto Imagem: Im = ${imageRange}`,
    ],
  };
}

export function analyzeModularFunction(a: number, h: number, k: number): ModularAnalysisResult {
  const opening = a > 0 ? 'para cima' : 'para baixo';
  const vertex = { x: h, y: k };

  // a|x - h| + k = 0 -> |x - h| = -k / a
  const roots: number[] = [];
  const val = -k / a;

  if (val > 0) {
    const r1 = h - val;
    const r2 = h + val;
    roots.push(Math.min(r1, r2), Math.max(r1, r2));
  } else if (val === 0) {
    roots.push(h);
  }

  const imageRange = a > 0 ? `[${k}, +∞)` : `(-∞, ${k}]`;
  const latexFormula = `f(x) = ${a === 1 ? '' : a}|x - ${h}| ${k >= 0 ? `+ ${k}` : `- ${Math.abs(k)}`}`;

  return {
    a,
    h,
    k,
    vertex,
    roots,
    opening,
    domain: 'ℝ',
    imageRange,
    latexFormula,
    explanation: [
      `Vértice do "V": V(h, k) = (${h}, ${k})`,
      `Abertura do gráfico: a = ${a} (${opening})`,
      roots.length === 2
        ? `Raízes: x₁ = ${roots[0]} e x₂ = ${roots[1]}`
        : roots.length === 1
        ? `Raiz única no vértice: x = ${roots[0]}`
        : 'Não intercepta o eixo x (sem raízes reais)',
      `Conjunto Imagem: Im = ${imageRange}`,
    ],
  };
}
