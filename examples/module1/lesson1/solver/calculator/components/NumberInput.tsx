import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';

const NumberInput: FC<IProps> = ({ className, ...props }) => {
  return (
    <input
      type="number"
      className={`rounded-md shadow-md p-4 ${className}`}
      {...props}
    />
  );
};

type IProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export default NumberInput;
