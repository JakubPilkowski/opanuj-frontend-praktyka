import { FC } from 'react';

import { Skeleton } from '../../../common/Skeleton';
import Card from '../../../common/Card';

const CountrySkeleton: FC = () => {
  return (
    <Card className="grid p-[10px] gap-[10px]">
      <Skeleton className="h-[200px] w-full" />
      <Skeleton className="h-[24px] w-full" />
      <Skeleton className="h-[16px] w-full" />
    </Card>
  );
};

export default CountrySkeleton;
