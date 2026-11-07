import React from 'react';
import { AppSettings } from '../../types/theme';
import { Settings, Moon, Sun, Volume2, VolumeX, Sparkles, UserCheck } from 'lucide-react';

interface SettingsViewProps {
  settings: AppSettings;
  onUpdateSettings: (updates: Partial<AppSettings>) => void;
  onClearAllData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onUpdateSettings,
  onClearAllData,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-5">
      {/* Header */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/50 shadow-amor flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-pink-600 dark:text-pink-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-pink-950 dark:text-pink-100">
              Configurações & Preferências
            </h2>
          </div>
          <p className="text-xs text-amor-muted dark:text-amor-dark-muted mt-0.5">
            Ajuste cada detalhe para seu ritmo de estudos ideal ♡
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-100/70 dark:bg-pink-950/40 border border-pink-200/60 dark:border-pink-900/40 text-xs font-bold text-pink-700 dark:text-pink-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Personalizado para Você</span>
        </div>
      </div>

      {/* Grid de Opções */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/50 shadow-amor flex flex-col gap-6">
        {/* Tema */}
        <div className="flex items-center justify-between pb-4 border-b border-pink-100 dark:border-pink-900/40">
          <div>
            <h3 className="text-sm font-extrabold text-pink-900 dark:text-pink-100">
              Tema Visual AmorCalc
            </h3>
            <p className="text-xs text-amor-muted">
              Escolha entre o visual Doce Pastel ou o elegante Modo Noturno
            </p>
          </div>
          <div className="flex items-center gap-2 bg-pink-100/70 dark:bg-pink-950/60 p-1 rounded-2xl border border-pink-200 dark:border-pink-900">
            <button
              onClick={() => onUpdateSettings({ theme: 'light' })}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                settings.theme === 'light'
                  ? 'bg-white text-pink-700 shadow-sm'
                  : 'text-amor-muted hover:text-pink-600'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Claro</span>
            </button>
            <button
              onClick={() => onUpdateSettings({ theme: 'dark' })}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                settings.theme === 'dark'
                  ? 'bg-amor-dark-surface text-pink-300 shadow-sm'
                  : 'text-amor-muted hover:text-pink-600'
              }`}
            >
              <Moon className="w-4 h-4 text-purple-400" />
              <span>Escuro</span>
            </button>
          </div>
        </div>

        {/* Modo Angular Padrão */}
        <div className="flex items-center justify-between pb-4 border-b border-pink-100 dark:border-pink-900/40">
          <div>
            <h3 className="text-sm font-extrabold text-pink-900 dark:text-pink-100">
              Unidade Angular Trigonométrica
            </h3>
            <p className="text-xs text-amor-muted">
              Padrão adotado para sen, cos, tan e funções trigonométricas inversas
            </p>
          </div>
          <div className="flex items-center gap-2 bg-pink-100/70 dark:bg-pink-950/60 p-1 rounded-2xl border border-pink-200 dark:border-pink-900">
            <button
              onClick={() => onUpdateSettings({ angleMode: 'deg' })}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                settings.angleMode === 'deg'
                  ? 'bg-pink-600 text-white shadow-sm'
                  : 'text-amor-muted hover:text-pink-600'
              }`}
            >
              Graus (DEG)
            </button>
            <button
              onClick={() => onUpdateSettings({ angleMode: 'rad' })}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                settings.angleMode === 'rad'
                  ? 'bg-pink-600 text-white shadow-sm'
                  : 'text-amor-muted hover:text-pink-600'
              }`}
            >
              Radianos (RAD)
            </button>
          </div>
        </div>

        {/* Efeitos Sonoros Sutis */}
        <div className="flex items-center justify-between pb-4 border-b border-pink-100 dark:border-pink-900/40">
          <div>
            <h3 className="text-sm font-extrabold text-pink-900 dark:text-pink-100 flex items-center gap-2">
              <span>Efeitos Sonoros de Teclas</span>
            </h3>
            <p className="text-xs text-amor-muted">
              Sons de clique agradáveis ao digitar na calculadora
            </p>
          </div>
          <button
            onClick={() => onUpdateSettings({ soundEffects: !settings.soundEffects })}
            className={`p-2.5 rounded-2xl border transition ${
              settings.soundEffects
                ? 'bg-pink-100 text-pink-700 border-pink-300 dark:bg-pink-950/70 dark:text-pink-300'
                : 'bg-gray-100 text-gray-400 border-gray-300 dark:bg-gray-800'
            }`}
          >
            {settings.soundEffects ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>

        {/* Exibição dos Personagens Amor Doce */}
        <div className="flex items-center justify-between pb-4 border-b border-pink-100 dark:border-pink-900/40">
          <div>
            <h3 className="text-sm font-extrabold text-pink-900 dark:text-pink-100 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-pink-500" />
              <span>Cartão de Companhia Amor Doce</span>
            </h3>
            <p className="text-xs text-amor-muted">
              Exibir personagens temáticos com balões e dicas em cada aba
            </p>
          </div>
          <input
            type="checkbox"
            checked={settings.showCharacterHelper}
            onChange={(e) => onUpdateSettings({ showCharacterHelper: e.target.checked })}
            className="w-5 h-5 accent-pink-600 cursor-pointer rounded-lg"
          />
        </div>

        {/* Zona de Perigo / Limpeza Completa */}
        <div className="pt-2 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-rose-600">
              Restaurar Dados de Fábrica
            </h3>
            <p className="text-xs text-amor-muted">
              Limpa todo o histórico, favoritos e retorna às configurações originais
            </p>
          </div>
          <button
            onClick={() => {
              if (window.confirm('Tem certeza de que deseja apagar todo o histórico e restaurar o AmorCalc?')) {
                onClearAllData();
              }
            }}
            className="px-4 py-2 rounded-2xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-300 text-xs font-bold border border-rose-200 dark:border-rose-900 transition"
          >
            Limpar Todos os Dados
          </button>
        </div>
      </div>
    </div>
  );
};
