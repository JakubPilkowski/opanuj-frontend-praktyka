import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import useCalculator from './useCalculator';

import { add, divide } from '../operations/operations';

describe('useCalculator', () => {
  test('should return result of given operation', () => {
    const { result: hook } = renderHook(() => useCalculator(1, 2));

    act(() => {
      hook.current.calculate(add);
    });

    expect(hook.current.result).toBe(3);
  });

  test('should return error', () => {
    const { result: hook } = renderHook(() => useCalculator(1, 0));

    act(() => {
      hook.current.calculate(divide);
    });

    expect(hook.current.error).toBe('Cannot divide by zero!');
  });
});
