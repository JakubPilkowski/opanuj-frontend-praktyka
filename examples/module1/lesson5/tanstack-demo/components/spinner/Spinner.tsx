import { FC } from 'react';

import { cn } from '../../../../../@/lib/utils';

import './spinner.css';

const Spinner: FC<IProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'spinner ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4',
        className
      )}
    ></div>
  );
};

type IProps = {
  className?: string;
};

export default Spinner;
