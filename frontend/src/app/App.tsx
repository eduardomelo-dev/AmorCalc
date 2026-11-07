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
import { EquationsView } from '../features/equations/EquationsView';
import { StatisticsView } from '../features/statistics/StatisticsView';
import { ConversionsView } from '../features/conversions/ConversionsView';
import { FormulasView } from '../features/formulas/FormulasView';
import { HistoryView } from '../features/history/HistoryView';
import { SettingsView } from '../features/settings/SettingsView';
import { HistoryEntry } from '../types/history';
import { AppSettings } from '../types/theme';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('calculator');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('amorcalc_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [angleMode, setAngleMode] = useState<'deg' | 'rad'>('deg');
  const [activeExpression, setActiveExpression] = useState<string>('');

  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('amorcalc_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      theme: 'light',
      angleMode: 'deg',
      soundEffects: false,
      precision: 10,
      showCharacterHelper: true,
    };
  });

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
    localStorage.setItem('amorcalc_settings', JSON.stringify(settings));
  }, [settings]);

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
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    setSettings((prev) => ({ ...prev, theme: next }));
  };

  const toggleAngleMode = () => {
    const next = angleMode === 'deg' ? 'rad' : 'deg';
    setAngleMode(next);
    setSettings((prev) => ({ ...prev, angleMode: next }));
  };

  const updateSettings = (updates: Partial<AppSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...updates };
      if (updates.theme) setTheme(updates.theme);
      if (updates.angleMode) setAngleMode(updates.angleMode);
      return updated;
    });
  };

  const toggleFavorite = (id: string) => {
    setHistoryList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, favorite: !item.favorite } : item))
    );
  };

  const removeItem = (id: string) => {
    setHistoryList((prev) => prev.filter((item) => item.id !== id));
  };

  const clearAllData = () => {
    setHistoryList([]);
    localStorage.removeItem('amorcalc_history');
    localStorage.removeItem('amorcalc_memory');
  };

  const restoreCalculation = (expr: string) => {
    setActiveExpression(expr);
    setActiveTab('calculator');
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
          {settings.showCharacterHelper && <CharacterCard character={character} />}

          {/* Tab Content Container */}
          <div className="flex-1" id="tab-content">
            {activeTab === 'calculator' && (
              <CalculatorView
                angleMode={angleMode}
                historyList={historyList}
                initialExpression={activeExpression}
                onAddHistory={addHistoryItem}
                onClearHistory={clearHistory}
                onSelectHistoryItem={(expr) => {
                  setActiveExpression(expr);
                }}
              />
            )}
            {activeTab === 'graphs' && <GraphView theme={theme} />}
            {activeTab === 'functions' && <FunctionsView />}
            {activeTab === 'equations' && <EquationsView />}
            {activeTab === 'statistics' && <StatisticsView />}
            {activeTab === 'conversions' && <ConversionsView />}
            {activeTab === 'formulas' && <FormulasView />}
            {activeTab === 'history' && (
              <HistoryView
                historyList={historyList}
                onToggleFavorite={toggleFavorite}
                onClearHistory={clearHistory}
                onRemoveItem={removeItem}
                onRestoreCalculation={restoreCalculation}
              />
            )}
            {activeTab === 'settings' && (
              <SettingsView
                settings={settings}
                onUpdateSettings={updateSettings}
                onClearAllData={clearAllData}
              />
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
