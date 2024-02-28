import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  ReactElement,
} from 'react';

const OperationButton: FC<IProps> = ({ sign, className, ...props }) => {
  return (
    <button
      className={`bg-blue-200 px-2 py-4 text-lg hover:bg-blue-500 hover:text-white rounded-md ${className}`}
      {...props}
    >
      {sign}
    </button>
  );
};

type IProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  sign: string | ReactElement;
};

export default OperationButton;
