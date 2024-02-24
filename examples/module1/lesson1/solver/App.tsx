import { ChangeEventHandler, useState } from 'react';
import { produce } from 'immer';

import {
  Calculator,
  NumberInput,
  OperationButton,
  RunOperationHandler,
  add,
  divide,
  multiply,
  subtract,
  useCalculator,
} from './calculator';

import './app.css';

interface InputsState {
  firstInput: number;
  secondInput: number;
}

const App = () => {
  const [inputs, setInputs] = useState<InputsState>({
    firstInput: 0,
    secondInput: 0,
  });

  const { firstInput, secondInput } = inputs;

  const { calculate, error, result } = useCalculator(firstInput, secondInput);

  const handleOperationClick = (operation: RunOperationHandler) => () => {
    calculate(operation);
  };

  const handleNumberInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, valueAsNumber } = e.target;

    if (!inputs.hasOwnProperty(name)) {
      throw new Error(`Invalid input name: ${name}`);
    }

    setInputs(
      produce((draft) => {
        draft[name as keyof InputsState] = valueAsNumber;
      })
    );
  };

  return (
    <Calculator>
      <Calculator.Inputs>
        <NumberInput
          name="firstInput"
          value={firstInput}
          onChange={handleNumberInputChange}
        />
        <NumberInput
          name="secondInput"
          value={secondInput}
          onChange={handleNumberInputChange}
        />
      </Calculator.Inputs>
      <Calculator.Operations>
        <OperationButton sign="+" onClick={handleOperationClick(add)} />
        <OperationButton sign="-" onClick={handleOperationClick(subtract)} />
        <OperationButton sign="*" onClick={handleOperationClick(multiply)} />
        <OperationButton sign="/" onClick={handleOperationClick(divide)} />
      </Calculator.Operations>
      <Calculator.Result>
        {typeof error === 'string' && <p className="text-red-500">{error}</p>}
        <div>Result: {result}</div>
      </Calculator.Result>
    </Calculator>
  );
};

export default App;
