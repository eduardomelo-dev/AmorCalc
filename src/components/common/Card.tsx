import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', glow = false, ...props }) => {
  return (
    <div
      className={`rounded-3xl bg-white/90 dark:bg-amor-dark-card/90 border border-pink-200/90 dark:border-pink-900/60 p-4 sm:p-5 shadow-amor backdrop-blur-xs transition-all ${
        glow ? 'ring-2 ring-pink-400/40 shadow-amor-glow' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
