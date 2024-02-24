import { useState } from 'react';
// There should be path alias
import useError from '../../hooks/useError';

import { RunOperationHandler } from '../types/IOperation';

export default function useCalculator(...inputs: number[]) {
  const [error, setError] = useState<unknown>('');
  const [result, setResult] = useState<number>(0);

  const calculate = useError(
    (operation: RunOperationHandler) => {
      setError('');
      const newResult = operation(...inputs);
      setResult(newResult);
    },
    (error) => setError(error)
  );

  return { result, error, calculate };
}
