import React, { useState, useEffect } from 'react';
import { TabId } from '../types/navigation';
import { ThemeMode } from '../types/theme';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { BottomNav } from '../components/layout/BottomNav';
import { CharacterCard } from '../components/layout/CharacterCard';
import { getCharacterForTab } from '../characters/charactersData';
import { CalculatorView } from '../features/calculator/CalculatorView';
import { GraphView } from '../features/graphs/GraphView';
import { FunctionsView } from '../features/functions/FunctionsView';
import { HistoryEntry } from '../types/calculator';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('calculator');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('amorcalc_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [angleMode, setAngleMode] = useState<'deg' | 'rad'>('deg');

  const [historyList, setHistoryList] = useState<HistoryEntry[]>(() => {
    const saved = localStorage.getItem('amorcalc_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('amorcalc_history', JSON.stringify(historyList));
  }, [historyList]);

  const addHistoryItem = (entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => {
    const newEntry: HistoryEntry = {
      ...entry,
      id: Date.now().toString() + Math.random().toString(36).substring(2, 6),
      timestamp: Date.now(),
      favorite: false,
    };
    setHistoryList((prev) => [newEntry, ...prev]);
  };

  const clearHistory = () => {
    setHistoryList([]);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('amorcalc_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleAngleMode = () => {
    setAngleMode((prev) => (prev === 'deg' ? 'rad' : 'deg'));
  };

  const character = getCharacterForTab(activeTab);

  return (
    <div className="min-h-screen flex flex-col bg-pink-50 dark:bg-amor-dark-bg text-amor-ink dark:text-amor-dark-text transition-colors duration-200">
      {/* Top Header */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
        angleMode={angleMode}
        onToggleAngleMode={toggleAngleMode}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto pb-16 md:pb-6">
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-3 sm:p-5 lg:p-6 min-w-0 flex flex-col gap-5">
          {/* Character Banner Card */}
          <CharacterCard character={character} />

          {/* Tab Content Container */}
          <div className="flex-1" id="tab-content">
            {activeTab === 'calculator' && (
              <CalculatorView
                angleMode={angleMode}
                historyList={historyList}
                onAddHistory={addHistoryItem}
                onClearHistory={clearHistory}
                onSelectHistoryItem={(expr) => {
                  console.log('Selecionou histórico:', expr);
                }}
              />
            )}
            {activeTab === 'graphs' && <GraphView theme={theme} />}
            {activeTab === 'functions' && <FunctionsView />}
            {activeTab !== 'calculator' && activeTab !== 'graphs' && activeTab !== 'functions' && (
              <div className="p-6 bg-white/70 dark:bg-amor-dark-surface/70 rounded-3xl border border-pink-200 dark:border-pink-900/50 text-center">
                <p className="text-base font-bold text-pink-800 dark:text-pink-200">
                  Módulo {activeTab.toUpperCase()}
                </p>
                <p className="text-xs text-amor-muted dark:text-amor-dark-muted mt-1">
                  Preparando módulo com {character.name}...
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenMoreMenu={() => setMobileMenuOpen(true)}
      />
    </div>
  );
};
