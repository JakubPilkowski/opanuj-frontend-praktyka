import { FC } from 'react';

const GuessResult: FC<IProps> = ({
  result,
  successMessage,
  failureMessage,
}) => {
  return (
    <>
      {result === 'success' && (
        <p className="mx-auto w-max bg-green-300 p-[10px] text-green-600">
          {successMessage}
        </p>
      )}
      {result === 'failure' && (
        <p className="mx-auto w-max bg-red-300 p-[10px] text-red-600">
          {failureMessage}
        </p>
      )}
    </>
  );
};

interface IProps {
  result: 'success' | 'failure';
  successMessage: string;
  failureMessage: string;
}

export default GuessResult;
