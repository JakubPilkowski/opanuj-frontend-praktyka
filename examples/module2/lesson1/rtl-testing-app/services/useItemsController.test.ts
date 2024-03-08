import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import useItemsController from './useItemsController';

describe('useItemsController', () => {
  it('should add item', () => {
    const { result } = renderHook(() => useItemsController());

    expect(result.current.items).toHaveLength(0);

    result.current.addItem({ id: 1, name: 'test' });

    expect(result.current.items).toHaveLength(1);
  });

  it('should delete item', () => {
    const { result } = renderHook(() =>
      useItemsController({ items: [{ id: 1, name: 'test' }] })
    );

    expect(result.current.items).toHaveLength(1);

    result.current.deleteItem(1);

    expect(result.current.items).toHaveLength(0);
  });
});
