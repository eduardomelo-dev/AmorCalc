import { useState, useCallback, useEffect } from 'react';
import { evaluateExpression } from '@backend/math/evaluate';
import { AngleMode } from '@backend/types/calculator';
import { HistoryEntry } from '../types/history';

interface UseCalculatorOptions {
  angleMode: AngleMode;
  onAddHistory?: (entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => void;
}

/** Mantém a expressão, o resultado e a memória usados pela calculadora visual. */
export function useCalculator({ angleMode, onAddHistory }: UseCalculatorOptions) {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [memory, setMemory] = useState<number>(() => {
    const saved = localStorage.getItem('amorcalc_memory');
    return saved ? parseFloat(saved) : 0;
  });
  const [isCalculated, setIsCalculated] = useState(false);

  // Salvar memória no localStorage
  useEffect(() => {
    localStorage.setItem('amorcalc_memory', memory.toString());
  }, [memory]);

  const insert = useCallback((val: string) => {
    setError(null);
    setExpression((prev) => {
      // Se acabou de calcular e o usuário digita um número, recomeça nova expressão
      if (isCalculated && /^[0-9.]$/.test(val)) {
        setIsCalculated(false);
        setResult('');
        return val;
      }
      setIsCalculated(false);
      return prev + val;
    });
  }, [isCalculated]);

  const clear = useCallback(() => {
    setExpression('');
    setResult('');
    setError(null);
    setIsCalculated(false);
  }, []);

  const backspace = useCallback(() => {
    setError(null);
    setExpression((prev) => {
      if (prev.length <= 1) {
        setResult('');
        setIsCalculated(false);
        return '';
      }
      // Se apagar o final de funções como 'sin(' ou 'sqrt('
      const funcMatch = prev.match(/(sin|cos|tan|asin|acos|atan|log10|sqrt|log|abs)\($/);
      if (funcMatch) {
        return prev.slice(0, -funcMatch[0].length);
      }
      return prev.slice(0, -1);
    });
  }, []);

  const calculate = useCallback(() => {
    if (!expression.trim()) return;

    const res = evaluateExpression(expression, angleMode);
    if (res.success && res.result !== undefined) {
      setResult(res.result);
      setError(null);
      setIsCalculated(true);

      if (onAddHistory) {
        onAddHistory({
          expression,
          result: res.result,
          category: 'calculator',
        });
      }
    } else {
      setError(res.error || 'Erro na expressão');
      setIsCalculated(false);
    }
  }, [expression, angleMode, onAddHistory]);

  const setExpressionDirectly = useCallback((expr: string) => {
    setExpression(expr);
    setResult('');
    setError(null);
    setIsCalculated(false);
  }, []);

  // Funções de memória
  const memoryClear = useCallback(() => {
    setMemory(0);
  }, []);

  const memoryRecall = useCallback(() => {
    insert(memory.toString());
  }, [memory, insert]);

  const memoryAdd = useCallback(() => {
    const val = parseFloat(result || expression);
    if (!isNaN(val)) {
      setMemory((prev) => prev + val);
    }
  }, [result, expression]);

  const memorySubtract = useCallback(() => {
    const val = parseFloat(result || expression);
    if (!isNaN(val)) {
      setMemory((prev) => prev - val);
    }
  }, [result, expression]);

  return {
    expression,
    result,
    error,
    memory,
    isCalculated,
    insert,
    clear,
    backspace,
    calculate,
    setExpressionDirectly,
    memoryClear,
    memoryRecall,
    memoryAdd,
    memorySubtract,
  };
}
