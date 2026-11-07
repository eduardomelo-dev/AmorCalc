import React from 'react';
import { Sparkles, Moon, Sun, Heart, Menu } from 'lucide-react';
import { ThemeMode } from '../../types/theme';

interface HeaderProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenMobileMenu: () => void;
  angleMode: 'deg' | 'rad';
  onToggleAngleMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  onOpenMobileMenu,
  angleMode,
  onToggleAngleMode,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-white/80 dark:bg-amor-dark-surface/85 border-b border-pink-200 dark:border-pink-900/50 transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 rounded-xl text-pink-700 dark:text-pink-300 hover:bg-pink-100 dark:hover:bg-pink-950/60 transition"
            aria-label="Abrir menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 select-none group cursor-pointer">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-600 to-pink-400 flex items-center justify-center text-white shadow-amor group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-pink-800 dark:text-pink-300">
                  Amor<span className="text-pink-600 dark:text-pink-400">Calc</span>
                </span>
                <Sparkles className="w-4 h-4 text-pink-500 animate-pulse" />
              </div>
              <p className="text-[11px] font-semibold text-pink-600/80 dark:text-pink-400/80 -mt-0.5 hidden sm:block">
                Calculadora Científica Avançada ♡
              </p>
            </div>
          </div>
        </div>

        {/* Motivational Banner text */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-100/70 dark:bg-pink-950/40 border border-pink-200/80 dark:border-pink-900/40 text-xs font-bold text-pink-700 dark:text-pink-300 shadow-sm">
          <span>♡</span>
          <span>Sonhe, planeje, calcule, conquiste!</span>
          <span>✨</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Deg/Rad Toggle */}
          <button
            onClick={onToggleAngleMode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-pink-100 dark:bg-pink-950/60 text-pink-800 dark:text-pink-200 hover:bg-pink-200 dark:hover:bg-pink-900 transition border border-pink-300/60 dark:border-pink-800"
            title="Alternar entre Graus (DEG) e Radianos (RAD)"
          >
            <span className="text-[10px] text-pink-500 font-extrabold">ÂNGULO:</span>
            <span className="font-extrabold tracking-wide uppercase">{angleMode}</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="p-2.5 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 hover:bg-pink-200 dark:hover:bg-pink-900 border border-pink-300/60 dark:border-pink-800 transition shadow-sm hover:scale-105 active:scale-95"
            title={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
            aria-label="Alternar tema"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4 text-amber-300" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
