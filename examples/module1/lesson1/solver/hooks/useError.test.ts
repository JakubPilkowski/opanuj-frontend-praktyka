import { describe, expect, test, vitest } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import useError from './useError';

describe('useError', () => {
  test('should return result of given function', () => {
    const onError = vitest.fn();
    const { result } = renderHook(() => {
      const fn = useError(() => {
        return true;
      }, onError);
      return fn;
    });
    expect(result.current()).toBeTruthy();
    expect(onError).not.toHaveBeenCalled();
  });

  test('should return call error function', () => {
    const onError = vitest.fn();
    const { result } = renderHook(() => {
      const fn = useError(() => {
        throw new Error('Error');
      }, onError);
      return fn;
    });

    act(() => {
      result.current();
    });

    expect(onError).toHaveBeenCalled();
  });
});
