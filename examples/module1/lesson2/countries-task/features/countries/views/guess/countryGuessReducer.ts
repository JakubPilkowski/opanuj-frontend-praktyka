import randomNumber from '../../../../utils/randomNumber';

export function countryGuessReducer(
  state: CountryGuessState,
  action: CountryGuessAction
): CountryGuessState {
  switch (action.type) {
    case 'start':
      const startIndex = randomNumber(0, action.countriesLength - 1);
      return {
        type: 'guessing',
        selectedIndex: startIndex,
      };
    case 'restart':
      const restartIndex = randomNumber(0, action.countriesLength - 1);
      return {
        type: 'guessing',
        selectedIndex: restartIndex,
      };
    case 'validate':
      const isSuccess =
        action.countryName.toLowerCase() === action.inputValue.toLowerCase();

      return {
        type: 'result',
        selectedIndex: state.selectedIndex,
        countryName: action.countryName,
        result: isSuccess ? 'success' : 'failure',
      };
  }
}

export type CountryGuessStart = {
  type: 'start';
  countriesLength: number;
};

export type CountryGuessRestart = {
  type: 'restart';
  countriesLength: number;
};

export type CountryGuessValidate = {
  type: 'validate';
  countryName: string;
  inputValue: string;
};

export type CountryGuessAction =
  | CountryGuessStart
  | CountryGuessRestart
  | CountryGuessValidate;

/**
 * STATE
 */

export type CountryGuessGuessing = {
  type: 'guessing';
  selectedIndex: number;
};

export type CountryGuessResult = {
  type: 'result';
  result: 'success' | 'failure';
  countryName: string;
  selectedIndex: number;
};

export type CountryGuessState = CountryGuessGuessing | CountryGuessResult;
