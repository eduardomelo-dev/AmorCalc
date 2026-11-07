import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-2.5 py-1.5 text-xs rounded-xl',
    md: 'px-4 py-2 text-sm rounded-2xl',
    lg: 'px-5 py-2.5 text-base rounded-2xl',
  }[size];

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold shadow-amor hover:scale-[1.02] active:scale-[0.98]',
    secondary:
      'bg-pink-100 hover:bg-pink-200 text-pink-900 dark:bg-pink-950/60 dark:hover:bg-pink-900 dark:text-pink-100 font-bold border border-pink-200 dark:border-pink-800',
    accent:
      'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold shadow-amor hover:scale-[1.02] active:scale-[0.98]',
    ghost:
      'text-pink-700 dark:text-pink-300 hover:bg-pink-100 dark:hover:bg-pink-950/60 font-semibold',
    outline:
      'border-2 border-pink-300 dark:border-pink-800 text-pink-700 dark:text-pink-300 hover:bg-pink-50 dark:hover:bg-pink-950/40 font-bold',
    danger:
      'bg-rose-500 hover:bg-rose-600 text-white font-bold shadow-xs active:scale-[0.98]',
  }[variant];

  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 transition-all duration-150 select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
