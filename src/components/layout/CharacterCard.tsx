import React, { useState, useEffect } from 'react';
import { Character } from '../../characters/charactersData';
import { MessageCircleHeart, RefreshCw, Sparkles } from 'lucide-react';

interface CharacterCardProps {
  character: Character;
  collapsed?: boolean;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, collapsed = false }) => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Reset quote when character changes
  useEffect(() => {
    setQuoteIndex(0);
  }, [character.id]);

  const nextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % character.quotes.length);
  };

  const currentQuote = character.quotes[quoteIndex] || character.quotes[0];

  if (collapsed) {
    return (
      <div className="flex items-center gap-2 p-2 rounded-2xl bg-white/70 dark:bg-amor-dark-surface/70 border border-pink-200 dark:border-pink-900/40 shadow-xs">
        <div
          className="w-10 h-10 rounded-xl overflow-hidden shrink-0 shadow-xs"
          dangerouslySetInnerHTML={{ __html: character.avatarSvg }}
        />
        <div className="min-w-0">
          <p className="text-xs font-extrabold text-pink-900 dark:text-pink-200 truncate">
            {character.name}
          </p>
          <p className="text-[10px] text-pink-600 dark:text-pink-400 font-medium truncate">
            {character.role}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white/80 dark:bg-amor-dark-surface/80 border border-pink-200 dark:border-pink-900/50 p-4 shadow-amor backdrop-blur-xs transition-all duration-300">
      {/* Background soft glow */}
      <div
        className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full opacity-20 blur-xl pointer-events-none"
        style={{ backgroundColor: character.themeColor }}
      />

      <div className="flex items-start gap-4">
        {/* Character Portrait */}
        <div className="relative group shrink-0">
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-md border-2 transition-transform duration-200 group-hover:scale-105"
            style={{ borderColor: character.themeColor }}
            dangerouslySetInnerHTML={{ __html: character.avatarSvg }}
          />
          <div
            className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full text-[9px] font-extrabold text-white shadow-xs"
            style={{ backgroundColor: character.themeColor }}
          >
            ♡
          </div>
        </div>

        {/* Character speech bubble & info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm sm:text-base font-extrabold text-pink-950 dark:text-pink-100">
                  {character.name}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950/70 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800">
                  {character.title}
                </span>
              </div>
              <span className="text-[11px] font-medium text-amor-muted dark:text-amor-dark-muted block">
                {character.role}
              </span>
            </div>

            <button
              onClick={nextQuote}
              className="p-1.5 rounded-xl text-pink-600 dark:text-pink-400 hover:bg-pink-100 dark:hover:bg-pink-950/80 transition"
              title="Trocar mensagem de apoio"
              aria-label="Nova frase"
            >
              <RefreshCw className="w-3.5 h-3.5 hover:rotate-180 transition-transform duration-300" />
            </button>
          </div>

          {/* Speech balloon */}
          <div className="relative mt-1 p-2.5 sm:p-3 rounded-2xl bg-pink-50/90 dark:bg-pink-950/40 border border-pink-200/80 dark:border-pink-900/40">
            <div className="flex items-start gap-2">
              <MessageCircleHeart className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm font-semibold text-amor-ink dark:text-pink-200 leading-relaxed italic">
                "{currentQuote}"
              </p>
            </div>
            <div className="mt-1 flex items-center justify-end gap-1 text-[10px] font-bold text-pink-600 dark:text-pink-400">
              <Sparkles className="w-3 h-3" />
              <span>Dica de Estudo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
