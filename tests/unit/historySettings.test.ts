import { describe, it, expect } from 'vitest';
import { HistoryEntry } from '../../frontend/src/types/history';

describe('Gerenciamento de Histórico e Configurações', () => {
  it('filtra histórico por categoria e itens favoritos', () => {
    const list: HistoryEntry[] = [
      { id: '1', expression: '2 + 2', result: '4', timestamp: 1000, category: 'calculator', favorite: false },
      { id: '2', expression: 'x^2 - 4 = 0', result: 'x = 2, -2', timestamp: 2000, category: 'equations', favorite: true },
      { id: '3', expression: 'mean([1,2,3])', result: '2', timestamp: 3000, category: 'statistics', favorite: true },
    ];

    const favorites = list.filter((i) => i.favorite);
    expect(favorites.length).toBe(2);

    const calcItems = list.filter((i) => i.category === 'calculator');
    expect(calcItems.length).toBe(1);
  });
});
