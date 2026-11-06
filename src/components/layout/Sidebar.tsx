import React from 'react';
import {
  Calculator,
  LineChart,
  FunctionSquare,
  Sigma,
  BarChart3,
  ArrowLeftRight,
  BookOpen,
  History,
  Settings,
  X,
  Heart,
} from 'lucide-react';
import { TabId, NavItem } from '../../types/navigation';

export const NAV_ITEMS: NavItem[] = [
  { id: 'calculator', label: 'Calculadora', iconName: 'Calculator', description: 'Cálculo científico e precisão' },
  { id: 'graphs', label: 'Gráficos', iconName: 'LineChart', description: 'Plotagem interativa 2D' },
  { id: 'functions', label: 'Funções', iconName: 'FunctionSquare', description: 'Afim, quadrática e modular' },
  { id: 'equations', label: 'Equações', iconName: 'Sigma', description: 'Álgebra e cálculo simbólico' },
  { id: 'statistics', label: 'Estatística', iconName: 'BarChart3', description: 'Médias, variância e histograma' },
  { id: 'conversions', label: 'Conversões', iconName: 'ArrowLeftRight', description: 'Unidades e grandezas' },
  { id: 'formulas', label: 'Fórmulas', iconName: 'BookOpen', description: 'Catálogo matemático KaTeX' },
  { id: 'history', label: 'Histórico', iconName: 'History', description: 'Registro e favoritos' },
  { id: 'settings', label: 'Configurações', iconName: 'Settings', description: 'Preferências e precisão' },
];

const ICONS_MAP: Record<string, React.FC<{ className?: string }>> = {
  Calculator,
  LineChart,
  FunctionSquare,
  Sigma,
  BarChart3,
  ArrowLeftRight,
  BookOpen,
  History,
  Settings,
};

interface SidebarProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  mobileOpen,
  onCloseMobile,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-pink-950/40 backdrop-blur-xs z-40 md:hidden animate-fade-in"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed md:sticky top-0 md:top-16 z-50 md:z-20 h-screen md:h-[calc(100vh-4rem)] w-64 md:w-60 lg:w-64 bg-white/95 dark:bg-amor-dark-surface/95 border-r border-pink-200 dark:border-pink-900/50 flex flex-col justify-between p-3.5 backdrop-blur-md transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col gap-1 overflow-y-auto">
          {/* Mobile Header in Drawer */}
          <div className="flex md:hidden items-center justify-between p-2 mb-2 border-b border-pink-200 dark:border-pink-900/50">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-600 fill-pink-500" />
              <span className="font-extrabold text-pink-800 dark:text-pink-300">Menu AmorCalc</span>
            </div>
            <button
              onClick={onCloseMobile}
              className="p-1.5 rounded-lg text-pink-700 hover:bg-pink-100 dark:hover:bg-pink-900/40"
              aria-label="Fechar menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-pink-500 dark:text-pink-400">
            Módulos de Estudo
          </p>

          {/* Navigation Links */}
          {NAV_ITEMS.map((item) => {
            const Icon = ICONS_MAP[item.iconName] || Calculator;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-bold text-sm transition-all duration-200 text-left select-none ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-amor scale-[1.02]'
                    : 'text-amor-ink dark:text-amor-dark-text hover:bg-pink-100/70 dark:hover:bg-pink-950/50 hover:text-pink-700 dark:hover:text-pink-300'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 truncate">
                  <div className="leading-tight">{item.label}</div>
                  <div
                    className={`text-[10px] font-medium truncate ${
                      isActive ? 'text-pink-100' : 'text-amor-muted dark:text-amor-dark-muted'
                    }`}
                  >
                    {item.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer in Sidebar */}
        <div className="pt-3 border-t border-pink-200/80 dark:border-pink-900/40 text-center">
          <div className="p-2.5 rounded-2xl bg-pink-100/60 dark:bg-pink-950/40 border border-pink-200/60 dark:border-pink-900/30">
            <p className="text-[11px] font-extrabold text-pink-800 dark:text-pink-300">
              Grandes sonhos também se calculam! ♡
            </p>
            <p className="text-[9px] text-pink-600/75 dark:text-pink-400/70 mt-0.5 font-medium">
              AmorCalc • Edição Especial 2026
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
