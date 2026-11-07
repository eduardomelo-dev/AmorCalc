import React from 'react';

interface MemoryControlsProps {
  memory: number;
  onClear: () => void;
  onRecall: () => void;
  onAdd: () => void;
  onSubtract: () => void;
}

export const MemoryControls: React.FC<MemoryControlsProps> = ({
  memory,
  onClear,
  onRecall,
  onAdd,
  onSubtract,
}) => {
  const hasMemory = memory !== 0;

  return (
    <div className="grid grid-cols-4 gap-2 w-full">
      <button
        onClick={onClear}
        disabled={!hasMemory}
        className="py-1.5 px-2 text-xs font-bold rounded-xl bg-pink-100/80 dark:bg-pink-950/50 text-pink-700 dark:text-pink-300 hover:bg-pink-200 dark:hover:bg-pink-900/60 disabled:opacity-40 disabled:pointer-events-none transition"
      >
        MC
      </button>
      <button
        onClick={onRecall}
        disabled={!hasMemory}
        className="py-1.5 px-2 text-xs font-bold rounded-xl bg-pink-100/80 dark:bg-pink-950/50 text-pink-700 dark:text-pink-300 hover:bg-pink-200 dark:hover:bg-pink-900/60 disabled:opacity-40 disabled:pointer-events-none transition"
      >
        MR
      </button>
      <button
        onClick={onAdd}
        className="py-1.5 px-2 text-xs font-bold rounded-xl bg-pink-100/80 dark:bg-pink-950/50 text-pink-700 dark:text-pink-300 hover:bg-pink-200 dark:hover:bg-pink-900/60 transition"
      >
        M+
      </button>
      <button
        onClick={onSubtract}
        className="py-1.5 px-2 text-xs font-bold rounded-xl bg-pink-100/80 dark:bg-pink-950/50 text-pink-700 dark:text-pink-300 hover:bg-pink-200 dark:hover:bg-pink-900/60 transition"
      >
        M-
      </button>
    </div>
  );
};
