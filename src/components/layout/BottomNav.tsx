import React from 'react';
import { Calculator, LineChart, FunctionSquare, Sigma, BarChart3, MoreHorizontal } from 'lucide-react';
import { TabId } from '../../types/navigation';

interface BottomNavProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  onOpenMoreMenu: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenMoreMenu,
}) => {
  const quickItems: { id: TabId; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'calculator', label: 'Calc', icon: Calculator },
    { id: 'graphs', label: 'Gráficos', icon: LineChart },
    { id: 'functions', label: 'Funções', icon: FunctionSquare },
    { id: 'equations', label: 'Equações', icon: Sigma },
    { id: 'statistics', label: 'Stats', icon: BarChart3 },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-amor-dark-surface/95 backdrop-blur-md border-t border-pink-200 dark:border-pink-900/50 px-2 py-1.5 flex items-center justify-around shadow-lg">
      {quickItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
              isActive
                ? 'text-pink-600 dark:text-pink-400 font-extrabold'
                : 'text-amor-muted dark:text-amor-dark-muted font-semibold hover:text-pink-500'
            }`}
          >
            <div
              className={`p-1 rounded-lg transition-transform ${
                isActive ? 'bg-pink-100 dark:bg-pink-950/80 scale-110' : ''
              }`}
            >
              <Icon className="w-4 h-4" />
            </div>
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </button>
        );
      })}

      <button
        onClick={onOpenMoreMenu}
        className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-amor-muted dark:text-amor-dark-muted font-semibold hover:text-pink-500"
      >
        <div className="p-1 rounded-lg">
          <MoreHorizontal className="w-4 h-4" />
        </div>
        <span className="text-[10px] mt-0.5">Mais</span>
      </button>
    </nav>
  );
};
