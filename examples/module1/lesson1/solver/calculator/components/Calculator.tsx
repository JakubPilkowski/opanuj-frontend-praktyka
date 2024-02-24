import { FC, FunctionComponent, PropsWithChildren } from 'react';

type CalculatorSubComponents = {
  Inputs: typeof Inputs;
  Operations: typeof Operations;
  Result: typeof Result;
};

type IProps = PropsWithChildren;

const Calculator: FunctionComponent<IProps> & CalculatorSubComponents = ({
  children,
}) => {
  return <div>{children}</div>;
};

const Inputs: FC<PropsWithChildren> = ({ children }) => {
  return <div className="grid grid-cols-2 gap-x-4">{children}</div>;
};

const Operations: FC<PropsWithChildren> = ({ children }) => {
  return <div className="grid grid-cols-4 gap-x-4 my-4">{children}</div>;
};

const Result: FC<PropsWithChildren> = ({ children }) => {
  return <div>{children}</div>;
};

Calculator.Inputs = Inputs;
Calculator.Operations = Operations;
Calculator.Result = Result;

export default Calculator;
