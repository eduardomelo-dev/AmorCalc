export type UnitCategory =
  | 'length'
  | 'mass'
  | 'temperature'
  | 'area'
  | 'volume'
  | 'time'
  | 'speed'
  | 'energy'
  | 'pressure';

export interface CategoryInfo {
  id: UnitCategory;
  name: string;
  iconName: string;
}

export interface UnitDefinition {
  id: string;
  name: string;
  symbol: string;
  ratioToBase: number; // proporção em relação à unidade base da categoria
}

const CATEGORIES: CategoryInfo[] = [
  { id: 'length', name: 'Comprimento', iconName: 'Ruler' },
  { id: 'mass', name: 'Massa', iconName: 'Scale' },
  { id: 'temperature', name: 'Temperatura', iconName: 'Thermometer' },
  { id: 'area', name: 'Área', iconName: 'Square' },
  { id: 'volume', name: 'Volume', iconName: 'Box' },
  { id: 'time', name: 'Tempo', iconName: 'Clock' },
  { id: 'speed', name: 'Velocidade', iconName: 'Gauge' },
  { id: 'energy', name: 'Energia', iconName: 'Zap' },
  { id: 'pressure', name: 'Pressão', iconName: 'Compass' },
];

const UNITS_MAP: Record<UnitCategory, UnitDefinition[]> = {
  length: [
    { id: 'm', name: 'Metros', symbol: 'm', ratioToBase: 1 },
    { id: 'km', name: 'Quilômetros', symbol: 'km', ratioToBase: 1000 },
    { id: 'cm', name: 'Centímetros', symbol: 'cm', ratioToBase: 0.01 },
    { id: 'mm', name: 'Milímetros', symbol: 'mm', ratioToBase: 0.001 },
    { id: 'mi', name: 'Milhas', symbol: 'mi', ratioToBase: 1609.344 },
    { id: 'yd', name: 'Jardas', symbol: 'yd', ratioToBase: 0.9144 },
    { id: 'ft', name: 'Pés', symbol: 'ft', ratioToBase: 0.3048 },
    { id: 'in', name: 'Polegadas', symbol: 'in', ratioToBase: 0.0254 },
  ],
  mass: [
    { id: 'kg', name: 'Quilogramas', symbol: 'kg', ratioToBase: 1 },
    { id: 'g', name: 'Gramas', symbol: 'g', ratioToBase: 0.001 },
    { id: 'mg', name: 'Miligramas', symbol: 'mg', ratioToBase: 1e-6 },
    { id: 't', name: 'Toneladas', symbol: 't', ratioToBase: 1000 },
    { id: 'lb', name: 'Libras', symbol: 'lb', ratioToBase: 0.45359237 },
    { id: 'oz', name: 'Onças', symbol: 'oz', ratioToBase: 0.028349523125 },
  ],
  temperature: [
    { id: 'C', name: 'Celsius', symbol: '°C', ratioToBase: 1 },
    { id: 'F', name: 'Fahrenheit', symbol: '°F', ratioToBase: 1 },
    { id: 'K', name: 'Kelvin', symbol: 'K', ratioToBase: 1 },
  ],
  area: [
    { id: 'm2', name: 'Metros Quadrados', symbol: 'm²', ratioToBase: 1 },
    { id: 'km2', name: 'Quilômetros Quadrados', symbol: 'km²', ratioToBase: 1e6 },
    { id: 'ha', name: 'Hectares', symbol: 'ha', ratioToBase: 10000 },
    { id: 'ft2', name: 'Pés Quadrados', symbol: 'ft²', ratioToBase: 0.092903 },
    { id: 'ac', name: 'Acres', symbol: 'ac', ratioToBase: 4046.86 },
  ],
  volume: [
    { id: 'l', name: 'Litros', symbol: 'L', ratioToBase: 1 },
    { id: 'ml', name: 'Mililitros', symbol: 'mL', ratioToBase: 0.001 },
    { id: 'm3', name: 'Metros Cúbicos', symbol: 'm³', ratioToBase: 1000 },
    { id: 'gal', name: 'Galões (US)', symbol: 'gal', ratioToBase: 3.78541 },
    { id: 'cup', name: 'Xícaras', symbol: 'cup', ratioToBase: 0.24 },
  ],
  time: [
    { id: 's', name: 'Segundos', symbol: 's', ratioToBase: 1 },
    { id: 'min', name: 'Minutos', symbol: 'min', ratioToBase: 60 },
    { id: 'h', name: 'Horas', symbol: 'h', ratioToBase: 3600 },
    { id: 'd', name: 'Dias', symbol: 'd', ratioToBase: 86400 },
    { id: 'week', name: 'Semanas', symbol: 'sem', ratioToBase: 604800 },
    { id: 'year', name: 'Anos', symbol: 'ano', ratioToBase: 31536000 },
  ],
  speed: [
    { id: 'km/h', name: 'Quilômetros por Hora', symbol: 'km/h', ratioToBase: 1 },
    { id: 'm/s', name: 'Metros por Segundo', symbol: 'm/s', ratioToBase: 3.6 },
    { id: 'mph', name: 'Milhas por Hora', symbol: 'mph', ratioToBase: 1.60934 },
    { id: 'knot', name: 'Nós', symbol: 'kt', ratioToBase: 1.852 },
  ],
  energy: [
    { id: 'J', name: 'Joules', symbol: 'J', ratioToBase: 1 },
    { id: 'kJ', name: 'Quilojoules', symbol: 'kJ', ratioToBase: 1000 },
    { id: 'cal', name: 'Calorias', symbol: 'cal', ratioToBase: 4.184 },
    { id: 'kcal', name: 'Quilocalorias', symbol: 'kcal', ratioToBase: 4184 },
    { id: 'Wh', name: 'Watt-hora', symbol: 'Wh', ratioToBase: 3600 },
    { id: 'eV', name: 'Elétron-volts', symbol: 'eV', ratioToBase: 1.602176634e-19 },
  ],
  pressure: [
    { id: 'atm', name: 'Atmosferas', symbol: 'atm', ratioToBase: 101325 },
    { id: 'Pa', name: 'Pascals', symbol: 'Pa', ratioToBase: 1 },
    { id: 'bar', name: 'Bar', symbol: 'bar', ratioToBase: 100000 },
    { id: 'psi', name: 'Libras por Pol² (PSI)', symbol: 'psi', ratioToBase: 6894.76 },
    { id: 'mmHg', name: 'Milímetros de Mercúrio', symbol: 'mmHg', ratioToBase: 133.322 },
  ],
};

export function getAvailableCategories(): CategoryInfo[] {
  return CATEGORIES;
}

export function getUnitsForCategory(category: UnitCategory): UnitDefinition[] {
  return UNITS_MAP[category] || [];
}

export function convertUnit(
  val: number,
  fromUnit: string,
  toUnit: string,
  category: UnitCategory
): number {
  if (fromUnit === toUnit) return val;

  // Lógica especial de Temperatura (escalas com offset)
  if (category === 'temperature') {
    // Validar limites físicos de zero absoluto
    if (fromUnit === 'K' && val < 0) {
      throw new Error('Temperatura em Kelvin não pode ser abaixo do zero absoluto (0 K)');
    }
    if (fromUnit === 'C' && val < -273.15) {
      throw new Error('Temperatura em Celsius não pode ser abaixo do zero absoluto (-273.15 °C)');
    }
    if (fromUnit === 'F' && val < -459.67) {
      throw new Error('Temperatura em Fahrenheit não pode ser abaixo do zero absoluto (-459.67 °F)');
    }

    // 1. Converter de qualquer uma para Celsius
    let inCelsius = val;
    if (fromUnit === 'F') {
      inCelsius = (val - 32) * (5 / 9);
    } else if (fromUnit === 'K') {
      inCelsius = val - 273.15;
    }

    // 2. Converter de Celsius para unidade destino
    if (toUnit === 'C') return inCelsius;
    if (toUnit === 'F') return inCelsius * (9 / 5) + 32;
    if (toUnit === 'K') return inCelsius + 273.15;
  }

  const units = UNITS_MAP[category];
  const fromDef = units.find((u) => u.id === fromUnit);
  const toDef = units.find((u) => u.id === toUnit);

  if (!fromDef || !toDef) {
    throw new Error(`Unidade inválida para a categoria ${category}`);
  }

  // Converter para a base multiplicando pelo ratioToBase
  const inBase = val * fromDef.ratioToBase;
  // Converter da base para o destino dividindo pelo ratioToBase
  return inBase / toDef.ratioToBase;
}
