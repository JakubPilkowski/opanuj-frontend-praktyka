import React, { ReactElement } from 'react';

export default function List<T>({
  items,
  renderItem,
}: IProps<T>): ReactElement {
  return <>{items.map((item) => renderItem(item))}</>;
}

interface IProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}
