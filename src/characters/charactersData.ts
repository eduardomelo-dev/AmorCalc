import { TabId } from '../types/navigation';

export interface Character {
  id: string;
  name: string;
  title: string;
  role: string;
  avatarSvg: string;
  quotes: string[];
  themeColor: string;
  accentBg: string;
}

export const CHARACTERS: Record<string, Character> = {
  armin: {
    id: 'armin',
    name: 'Armin',
    title: 'Gamer Lógico',
    role: 'Calculadora Científica',
    themeColor: '#3b82f6',
    accentBg: '#eff6ff',
    quotes: [
      'Não precisa calcular de cabeça no modo hard! Eu e o AmorCalc fazemos o combo perfeito pra você! 🎮♡',
      'Funções trigonométricas são como combos de videogame: pegue o ângulo certo e acerte em cheio!',
      'Calculando... deu crítico! Resultado com precisão máxima na tela! ✨',
      'Complexos, matrizes ou potenciação? Pode mandar qualquer boss matemático!',
    ],
    avatarSvg: `
      <svg viewBox="0 0 100 100" class="w-full h-full">
        <circle cx="50" cy="50" r="46" fill="#dbeafe" stroke="#3b82f6" stroke-width="3"/>
        <!-- Cabelo preto bagunçado -->
        <path d="M22 45 C20 20, 40 12, 50 12 C60 12, 80 20, 78 45 C78 30, 68 22, 50 22 C32 22, 22 30, 22 45 Z" fill="#1e293b"/>
        <path d="M20 42 C15 52, 22 62, 26 55" fill="#1e293b"/>
        <path d="M80 42 C85 52, 78 62, 74 55" fill="#1e293b"/>
        <!-- Rosto -->
        <circle cx="50" cy="54" r="26" fill="#fde2d2"/>
        <!-- Franja característica -->
        <path d="M28 36 C34 44, 42 38, 48 46 C52 38, 62 44, 72 36 C66 30, 36 28, 28 36 Z" fill="#1e293b"/>
        <!-- Olhos azuis brilhantes -->
        <ellipse cx="40" cy="52" rx="4.5" ry="6" fill="#2563eb"/>
        <ellipse cx="60" cy="52" rx="4.5" ry="6" fill="#2563eb"/>
        <circle cx="41.5" cy="50" r="2" fill="#ffffff"/>
        <circle cx="61.5" cy="50" r="2" fill="#ffffff"/>
        <!-- Sorriso animado -->
        <path d="M44 65 Q50 71 56 65" fill="none" stroke="#b91c1c" stroke-width="2.5" stroke-linecap="round"/>
        <!-- Fone gamer ciano -->
        <path d="M20 40 A32 32 0 0 1 80 40" fill="none" stroke="#06b6d4" stroke-width="4.5" stroke-linecap="round"/>
        <rect x="16" y="38" width="7" height="14" rx="3.5" fill="#0891b2"/>
        <rect x="77" y="38" width="7" height="14" rx="3.5" fill="#0891b2"/>
        <!-- Touca / gorro gamer -->
        <path d="M30 20 Q50 8 70 20" stroke="#0ea5e9" stroke-width="4" fill="none"/>
      </svg>
    `,
  },
  castiel: {
    id: 'castiel',
    name: 'Castiel',
    title: 'Guitarrista Rebelde',
    role: 'Gráficos Interativos',
    themeColor: '#e11d48',
    accentBg: '#fff1f2',
    quotes: [
      'Uma parábola dessas não mete medo na gente. Dá zoom aí pra ver as raízes! 🎸♡',
      'Curvas suaves, assíntotas no talo... isso sim é que é traçado com atitude.',
      'Se o gráfico parecer confuso, ajusta o intervalo no painel. Não vacila!',
      'Gostei da função. Ela sobe mais rápido que solo de guitarra!',
    ],
    avatarSvg: `
      <svg viewBox="0 0 100 100" class="w-full h-full">
        <circle cx="50" cy="50" r="46" fill="#ffe4e6" stroke="#e11d48" stroke-width="3"/>
        <!-- Cabelo vermelho icônico -->
        <path d="M20 46 C16 18, 38 10, 50 10 C65 10, 84 18, 80 48 C78 28, 68 18, 50 18 C32 18, 22 28, 20 46 Z" fill="#b91c1c"/>
        <path d="M18 40 C12 55, 24 64, 26 56" fill="#991b1b"/>
        <path d="M82 40 C88 55, 76 64, 74 56" fill="#991b1b"/>
        <!-- Rosto -->
        <circle cx="50" cy="54" r="26" fill="#fde2d2"/>
        <!-- Franja desfiada vermelha -->
        <path d="M26 34 C36 48, 42 36, 46 50 C52 38, 66 50, 74 34 C64 26, 36 24, 26 34 Z" fill="#b91c1c"/>
        <!-- Olhos cinzas desafiadores -->
        <ellipse cx="40" cy="53" rx="4.5" ry="5.5" fill="#475569"/>
        <ellipse cx="60" cy="53" rx="4.5" ry="5.5" fill="#475569"/>
        <circle cx="41.5" cy="51" r="1.8" fill="#ffffff"/>
        <circle cx="61.5" cy="51" r="1.8" fill="#ffffff"/>
        <path d="M35 45 L45 48" stroke="#334155" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M65 45 L55 48" stroke="#334155" stroke-width="2.5" stroke-linecap="round"/>
        <!-- Sorriso de lado irônico -->
        <path d="M45 66 Q52 68 58 64" fill="none" stroke="#7f1d1d" stroke-width="2.5" stroke-linecap="round"/>
        <!-- Gargantilha / Jaqueta -->
        <path d="M38 78 L62 78" stroke="#18181b" stroke-width="4" stroke-linecap="round"/>
      </svg>
    `,
  },
  nathaniel: {
    id: 'nathaniel',
    name: 'Nathaniel',
    title: 'Delegado Estudioso',
    role: 'Funções Matemáticas',
    themeColor: '#d97706',
    accentBg: '#fffbeb',
    quotes: [
      'Estudar funções afins e quadráticas fica mais fácil quando analisamos cada coeficiente com calma. 📚♡',
      'Observe o delta: quando Δ > 0 temos duas raízes reais distintas cortando o eixo x!',
      'O vértice da parábola nos dá o ponto extremo exato de máximo ou mínimo. Muito elegante!',
      'Organizei todas as propriedades e o domínio pra você não se perder nos estudos.',
    ],
    avatarSvg: `
      <svg viewBox="0 0 100 100" class="w-full h-full">
        <circle cx="50" cy="50" r="46" fill="#fef3c7" stroke="#d97706" stroke-width="3"/>
        <!-- Cabelo Loiro Dourado arrumado -->
        <path d="M22 45 C20 18, 40 12, 50 12 C62 12, 80 18, 78 45 C76 28, 66 20, 50 20 C34 20, 24 28, 22 45 Z" fill="#eab308"/>
        <!-- Rosto -->
        <circle cx="50" cy="54" r="26" fill="#fde2d2"/>
        <!-- Franja alinhada e refinada -->
        <path d="M26 36 C34 45, 42 42, 50 44 C58 42, 66 45, 74 36 C64 28, 36 28, 26 36 Z" fill="#eab308"/>
        <!-- Olhos castanho-dourados gentis -->
        <ellipse cx="40" cy="52" rx="4.5" ry="6" fill="#92400e"/>
        <ellipse cx="60" cy="52" rx="4.5" ry="6" fill="#92400e"/>
        <circle cx="41.5" cy="50" r="2" fill="#ffffff"/>
        <circle cx="61.5" cy="50" r="2" fill="#ffffff"/>
        <!-- Sorriso gentil e encorajador -->
        <path d="M43 65 Q50 70 57 65" fill="none" stroke="#b45309" stroke-width="2.5" stroke-linecap="round"/>
        <!-- Colarinho azul social -->
        <path d="M38 78 L50 86 L62 78" fill="#3b82f6" stroke="#1d4ed8" stroke-width="1.5"/>
        <path d="M50 86 L50 96" stroke="#dc2626" stroke-width="3"/>
      </svg>
    `,
  },
  lysandre: {
    id: 'lysandre',
    name: 'Lysandre',
    title: 'Poeta Vitoriano',
    role: 'Equações e Álgebra',
    themeColor: '#059669',
    accentBg: '#ecfdf5',
    quotes: [
      'A harmonia de uma equação reside no equilíbrio entre suas incógnitas... quase uma poesia. 🖋️♡',
      'Fatorar um polinômio revela sua verdadeira e mais pura essência matemática.',
      'O cálculo diferencial e integral é a dança contínua do infinito na ponta dos dedos.',
      'Onde deixei meu bloco de notas? Ah, felizmente o AmorCalc guardou todas as soluções.',
    ],
    avatarSvg: `
      <svg viewBox="0 0 100 100" class="w-full h-full">
        <circle cx="50" cy="50" r="46" fill="#d1fae5" stroke="#059669" stroke-width="3"/>
        <!-- Cabelo Prateado com pontas escuras vitoriano -->
        <path d="M22 45 C18 16, 42 12, 50 12 C62 12, 82 16, 78 45 C76 28, 66 22, 50 22 C34 22, 24 28, 22 45 Z" fill="#e2e8f0"/>
        <!-- Rosto pálido e nobre -->
        <circle cx="50" cy="54" r="26" fill="#fff1f2"/>
        <!-- Franja elegante ondulada -->
        <path d="M26 36 C34 46, 44 40, 50 48 C56 40, 68 46, 74 36 C64 26, 36 26, 26 36 Z" fill="#cbd5e1"/>
        <path d="M24 45 C20 54, 22 62, 26 56" fill="#475569"/>
        <path d="M76 45 C80 54, 78 62, 74 56" fill="#475569"/>
        <!-- Heterocromia: olho direito verde, olho esquerdo âmbar/dourado -->
        <ellipse cx="40" cy="52" rx="4.5" ry="6" fill="#059669"/>
        <ellipse cx="60" cy="52" rx="4.5" ry="6" fill="#d97706"/>
        <circle cx="41.5" cy="50" r="2" fill="#ffffff"/>
        <circle cx="61.5" cy="50" r="2" fill="#ffffff"/>
        <!-- Expressão serena e sutil -->
        <path d="M44 65 Q50 68 56 65" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round"/>
        <!-- Gravata vitoriana clássica -->
        <path d="M46 76 L54 76 L52 88 L48 88 Z" fill="#065f46"/>
        <circle cx="50" cy="80" r="2" fill="#fbbf24"/>
      </svg>
    `,
  },
  kentin: {
    id: 'kentin',
    name: 'Kentin',
    title: 'Determinado & Focado',
    role: 'Estatística Descritiva',
    themeColor: '#7c3aed',
    accentBg: '#f5f3ff',
    quotes: [
      'Disciplina com os dados! Média, mediana e desvio padrão calculados sem erro! 🍪♡',
      'Treinei duro na academia militar e agora trago essa mesma precisão para a estatística.',
      'Quer um biscoito de chocolate para dar energia na análise desse conjunto de dados?',
      'A variância e os quartis mostram com exatidão a dispersão dos seus resultados.',
    ],
    avatarSvg: `
      <svg viewBox="0 0 100 100" class="w-full h-full">
        <circle cx="50" cy="50" r="46" fill="#ede9fe" stroke="#7c3aed" stroke-width="3"/>
        <!-- Cabelo Castanho curto militar moderno -->
        <path d="M24 44 C22 18, 42 14, 50 14 C62 14, 78 18, 76 44 C74 28, 64 22, 50 22 C36 22, 26 28, 24 44 Z" fill="#582f1b"/>
        <!-- Rosto -->
        <circle cx="50" cy="54" r="26" fill="#fde2d2"/>
        <!-- Franja estilosa -->
        <path d="M28 36 C36 44, 44 38, 50 44 C56 38, 66 44, 72 36 C64 28, 36 28, 28 36 Z" fill="#4a2511"/>
        <!-- Olhos verdes penetrantes -->
        <ellipse cx="40" cy="52" rx="4.5" ry="6" fill="#15803d"/>
        <ellipse cx="60" cy="52" rx="4.5" ry="6" fill="#15803d"/>
        <circle cx="41.5" cy="50" r="2" fill="#ffffff"/>
        <circle cx="61.5" cy="50" r="2" fill="#ffffff"/>
        <!-- Sorriso confiante -->
        <path d="M43 65 Q50 71 57 65" fill="none" stroke="#7c2d12" stroke-width="2.5" stroke-linecap="round"/>
        <!-- Tag militar dog-tag discreta -->
        <path d="M42 78 L58 78" stroke="#334155" stroke-width="3" stroke-linecap="round"/>
        <rect x="47" y="80" width="6" height="10" rx="2" fill="#94a3b8"/>
      </svg>
    `,
  },
  alexy: {
    id: 'alexy',
    name: 'Alexy',
    title: 'Estiloso & Energético',
    role: 'Conversões de Unidades',
    themeColor: '#ec4899',
    accentBg: '#fdf2f8',
    quotes: [
      'Trocar de unidades é como combinar looks no shopping: precisa ter harmonia e proporção perfeita! 🛍️✨',
      'De metros pra pés, de Celsius pra Kelvin... mudar de escala nunca foi tão fabuloso!',
      'Precisão com estilo! Converti num piscar de olhos pra você arrasar nos cálculos.',
      'Você é demais! Se precisar converter qualquer grandeza, estarei aqui na primeira fila!',
    ],
    avatarSvg: `
      <svg viewBox="0 0 100 100" class="w-full h-full">
        <circle cx="50" cy="50" r="46" fill="#fce7f3" stroke="#ec4899" stroke-width="3"/>
        <!-- Cabelo Azul elétrico alegre -->
        <path d="M22 45 C18 16, 42 12, 50 12 C62 12, 82 16, 78 45 C76 26, 66 18, 50 18 C34 18, 24 26, 22 45 Z" fill="#0284c7"/>
        <!-- Rosto animado -->
        <circle cx="50" cy="54" r="26" fill="#fde2d2"/>
        <!-- Franja despojada azul -->
        <path d="M26 34 C36 46, 44 38, 52 46 C60 38, 70 46, 74 34 C64 24, 36 24, 26 34 Z" fill="#0369a1"/>
        <!-- Olhos violeta cintilantes -->
        <ellipse cx="40" cy="52" rx="4.5" ry="6" fill="#9333ea"/>
        <ellipse cx="60" cy="52" rx="4.5" ry="6" fill="#9333ea"/>
        <circle cx="41.5" cy="50" r="2" fill="#ffffff"/>
        <circle cx="61.5" cy="50" r="2" fill="#ffffff"/>
        <!-- Piscadela com brilho / Sorrisão -->
        <path d="M42 64 Q50 72 58 64" fill="none" stroke="#be185d" stroke-width="3" stroke-linecap="round"/>
        <!-- Fone de ouvido rosa chiclete -->
        <path d="M18 42 A34 34 0 0 1 82 42" fill="none" stroke="#ec4899" stroke-width="4.5" stroke-linecap="round"/>
        <circle cx="19" cy="45" r="5" fill="#f43f5e"/>
        <circle cx="81" cy="45" r="5" fill="#f43f5e"/>
      </svg>
    `,
  },
  rosalya: {
    id: 'rosalya',
    name: 'Rosalya',
    title: 'Fascinante & Detalhista',
    role: 'Catálogo de Fórmulas',
    themeColor: '#a855f7',
    accentBg: '#faf5ff',
    quotes: [
      'Uma fórmula matemática bem expressa é como alta-costura: pura perfeição em cada detalhe. 💎♡',
      'Selecionei as fórmulas mais deslumbrantes da álgebra, geometria e cálculo pra você brilhar.',
      'Nada supera a beleza de uma fração bem equilibrada renderizada em KaTeX.',
      'Você merece o melhor repertório para os seus estudos. Vamos revisar juntos?',
    ],
    avatarSvg: `
      <svg viewBox="0 0 100 100" class="w-full h-full">
        <circle cx="50" cy="50" r="46" fill="#f3e8ff" stroke="#a855f7" stroke-width="3"/>
        <!-- Cabelo Platinado longo deslumbrante -->
        <path d="M20 46 C16 14, 40 10, 50 10 C65 10, 84 14, 80 46 C76 24, 66 18, 50 18 C34 18, 24 24, 20 46 Z" fill="#f1f5f9"/>
        <path d="M16 42 C10 65, 18 80, 22 72" fill="#e2e8f0"/>
        <path d="M84 42 C90 65, 82 80, 78 72" fill="#e2e8f0"/>
        <!-- Rosto gracioso -->
        <circle cx="50" cy="54" r="26" fill="#fef2f2"/>
        <!-- Franja fina elegante -->
        <path d="M26 34 C36 44, 44 38, 50 44 C56 38, 66 44, 74 34 C64 26, 36 26, 26 34 Z" fill="#e2e8f0"/>
        <!-- Olhos âmbar/dourados magnéticos -->
        <ellipse cx="40" cy="52" rx="4.5" ry="6" fill="#d97706"/>
        <ellipse cx="60" cy="52" rx="4.5" ry="6" fill="#d97706"/>
        <circle cx="41.5" cy="50" r="2" fill="#ffffff"/>
        <circle cx="61.5" cy="50" r="2" fill="#ffffff"/>
        <!-- Sorriso charmoso -->
        <path d="M44 65 Q50 69 56 65" fill="none" stroke="#be185d" stroke-width="2" stroke-linecap="round"/>
        <!-- Laço / fita lilás no cabelo -->
        <path d="M68 22 C74 18, 76 26, 72 26 C76 30, 68 34, 66 26 Z" fill="#c084fc"/>
      </svg>
    `,
  },
  sucrette: {
    id: 'sucrette',
    name: 'Docete (Sucrette)',
    title: 'Nossa Protagonista',
    role: 'Histórico & Configurações',
    themeColor: '#ec4899',
    accentBg: '#fff0f7',
    quotes: [
      'Cada cálculo que você faz te deixa mais perto dos seus maiores objetivos! Sonhe alto! ♡✨',
      'Aqui no histórico guardamos cada vitória. Você pode restaurar qualquer cálculo com um clique.',
      'Personalize as configurações como preferir: ângulos, som, tema... o AmorCalc é seu espaço!',
      'Muito orgulho do seu progresso hoje! Vamos continuar aprendendo juntos!',
    ],
    avatarSvg: `
      <svg viewBox="0 0 100 100" class="w-full h-full">
        <circle cx="50" cy="50" r="46" fill="#fff0f7" stroke="#ec4899" stroke-width="3"/>
        <!-- Cabelo Castanho com mechas doces -->
        <path d="M22 46 C18 16, 42 12, 50 12 C62 12, 82 16, 78 46 C76 26, 66 18, 50 18 C34 18, 24 26, 22 46 Z" fill="#78350f"/>
        <path d="M18 42 C12 60, 20 72, 24 64" fill="#92400e"/>
        <path d="M82 42 C88 60, 80 72, 76 64" fill="#92400e"/>
        <!-- Rosto meigo -->
        <circle cx="50" cy="54" r="26" fill="#fde2d2"/>
        <!-- Franja com presilha de flor/coração -->
        <path d="M26 36 C34 46, 42 40, 50 46 C58 40, 68 46, 74 36 C64 26, 36 26, 26 36 Z" fill="#78350f"/>
        <!-- Presilha de flor rosa -->
        <circle cx="68" cy="30" r="4.5" fill="#f43f5e"/>
        <circle cx="68" cy="30" r="2" fill="#fef08a"/>
        <!-- Olhos verdes expressivos -->
        <ellipse cx="40" cy="52" rx="4.5" ry="6" fill="#16a34a"/>
        <ellipse cx="60" cy="52" rx="4.5" ry="6" fill="#16a34a"/>
        <circle cx="41.5" cy="50" r="2.2" fill="#ffffff"/>
        <circle cx="61.5" cy="50" r="2.2" fill="#ffffff"/>
        <!-- Blush fofo nas bochechas -->
        <ellipse cx="32" cy="58" rx="4" ry="2" fill="#f472b6" opacity="0.6"/>
        <ellipse cx="68" cy="58" rx="4" ry="2" fill="#f472b6" opacity="0.6"/>
        <!-- Sorriso radiante -->
        <path d="M43 64 Q50 72 57 64" fill="none" stroke="#be123c" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
    `,
  },
};

export function getCharacterForTab(tab: TabId): Character {
  switch (tab) {
    case 'calculator':
      return CHARACTERS.armin;
    case 'graphs':
      return CHARACTERS.castiel;
    case 'functions':
      return CHARACTERS.nathaniel;
    case 'equations':
      return CHARACTERS.lysandre;
    case 'statistics':
      return CHARACTERS.kentin;
    case 'conversions':
      return CHARACTERS.alexy;
    case 'formulas':
      return CHARACTERS.rosalya;
    case 'history':
    case 'settings':
    default:
      return CHARACTERS.sucrette;
  }
}
