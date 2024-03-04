import { useReducer } from 'react';
import { countryGuessReducer } from './countryGuessReducer';

export default function useCountryGuess() {
  const [state, reducer] = useReducer(countryGuessReducer, {
    type: 'guessing',
    selectedIndex: 0,
  });

  const start = (countriesLength: number) => {
    reducer({ type: 'start', countriesLength });
  };

  const validate = (countryName: string, inputValue: string) => {
    reducer({ type: 'validate', countryName, inputValue });
  };

  const restart = (countriesLength: number) => {
    reducer({ type: 'restart', countriesLength });
  };

  return {
    state,
    start,
    validate,
    restart,
  };
}
