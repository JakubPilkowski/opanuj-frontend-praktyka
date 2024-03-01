import React, { FC } from 'react';

import { cn } from '../../../../../../@/lib/utils';

const CountryGrid: FC<IProps> = ({ children, className }) => {
  return (
    <section
      className={cn(
        'grid gap-2 justify-center grid-cols-company-item',
        className
      )}
    >
      {children}
    </section>
  );
};

interface IProps {
  children?: React.ReactNode;
  className?: string;
}

export default CountryGrid;
