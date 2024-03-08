import { FC, ReactElement, useMemo } from 'react';

const SkeletonList: FC<IProps> = ({ itemsCount, renderItem }) => {
  const items = useMemo(
    () => Array.from({ length: itemsCount }, (_, index) => index),
    [itemsCount]
  );

  return <>{items.map((item) => renderItem(item))}</>;
};

interface IProps {
  itemsCount: number;
  // TODO: add support for ComponentType
  renderItem: (index: number) => ReactElement;
}

export default SkeletonList;
