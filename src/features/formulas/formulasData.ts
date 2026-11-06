export interface MathFormula {
  id: string;
  category: 'algebra' | 'geometria' | 'trigonometria' | 'calculo' | 'fisica';
  name: string;
  latex: string;
  description: string;
  variables: { symbol: string; meaning: string }[];
}

export const FORMULAS_DATA: MathFormula[] = [
  {
    id: 'bhaskara',
    category: 'algebra',
    name: 'Fórmula de Bhaskara',
    latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
    description: 'Determina as raízes reais ou complexas de uma equação quadrática ax² + bx + c = 0.',
    variables: [
      { symbol: 'a, b, c', meaning: 'Coeficientes da equação polinomial' },
      { symbol: 'Δ = b² - 4ac', meaning: 'Discriminante da equação' },
    ],
  },
  {
    id: 'vertice-parabola',
    category: 'algebra',
    name: 'Coordenadas do Vértice da Parábola',
    latex: 'X_v = -\\frac{b}{2a}, \\quad Y_v = -\\frac{\\Delta}{4a}',
    description: 'Ponto extremo de máximo ou mínimo da função quadrática f(x) = ax² + bx + c.',
    variables: [
      { symbol: 'X_v', meaning: 'Abscissa do vértice (eixo de simetria)' },
      { symbol: 'Y_v', meaning: 'Ordenada do vértice (valor extremo)' },
    ],
  },
  {
    id: 'pitagoras',
    category: 'geometria',
    name: 'Teorema de Pitágoras',
    latex: 'a^2 + b^2 = c^2',
    description: 'Em qualquer triângulo retângulo, o quadrado da hipotenusa é igual à soma dos quadrados dos catetos.',
    variables: [
      { symbol: 'c', meaning: 'Comprimento da hipotenusa' },
      { symbol: 'a, b', meaning: 'Comprimento dos catetos' },
    ],
  },
  {
    id: 'area-circulo',
    category: 'geometria',
    name: 'Área do Círculo e Circunferência',
    latex: 'A = \\pi r^2, \\quad C = 2\\pi r',
    description: 'Área superficial e comprimento perimetral de um círculo de raio r.',
    variables: [
      { symbol: 'r', meaning: 'Raio do círculo' },
      { symbol: 'π', meaning: 'Constante de Arquimedes (~3.14159)' },
    ],
  },
  {
    id: 'identidade-trig',
    category: 'trigonometria',
    name: 'Identidade Trigonométrica Fundamental',
    latex: '\\sin^2(\\theta) + \\cos^2(\\theta) = 1',
    description: 'Relação básica que une seno e cosseno para qualquer ângulo real θ no círculo trigonométrico.',
    variables: [{ symbol: 'θ', meaning: 'Ângulo medido em radianos ou graus' }],
  },
  {
    id: 'lei-dos-senos',
    category: 'trigonometria',
    name: 'Lei dos Senos e Cossenos',
    latex: '\\frac{a}{\\sin(A)} = \\frac{b}{\\sin(B)} = \\frac{c}{\\sin(C)}, \\quad a^2 = b^2 + c^2 - 2bc\\cos(A)',
    description: 'Relações métricas universais para qualquer triângulo plano.',
    variables: [
      { symbol: 'a, b, c', meaning: 'Comprimentos dos lados' },
      { symbol: 'A, B, C', meaning: 'Ângulos opostos aos respectivos lados' },
    ],
  },
  {
    id: 'regra-da-cadeia',
    category: 'calculo',
    name: 'Regra da Cadeia (Derivadas)',
    latex: '\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x)',
    description: 'Método de diferenciação de funções compostas.',
    variables: [
      { symbol: 'f(u)', meaning: 'Função externa' },
      { symbol: 'g(x)', meaning: 'Função interna' },
    ],
  },
  {
    id: 'teorema-fundamental-calculo',
    category: 'calculo',
    name: 'Teorema Fundamental do Cálculo',
    latex: '\\int_a^b f(x)\\,dx = F(b) - F(a), \\quad \\text{onde } F\'(x) = f(x)',
    description: 'Conexão essencial entre a diferenciação e a integração definida.',
    variables: [
      { symbol: 'f(x)', meaning: 'Função integranda contínua' },
      { symbol: 'F(x)', meaning: 'Antiderivada ou primitiva de f' },
    ],
  },
  {
    id: 'segunda-lei-newton',
    category: 'fisica',
    name: 'Segunda Lei de Newton (Dinâmica)',
    latex: '\\vec{F}_{res} = m \\cdot \\vec{a}',
    description: 'A força resultante aplicada sobre um corpo é proporcional à aceleração produzida.',
    variables: [
      { symbol: 'F', meaning: 'Força resultante (Newtons, N)' },
      { symbol: 'm', meaning: 'Massa do corpo (kg)' },
      { symbol: 'a', meaning: 'Aceleração adquirida (m/s²)' },
    ],
  },
];
