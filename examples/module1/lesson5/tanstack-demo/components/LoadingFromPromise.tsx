import { FC, ReactElement, useState } from 'react';

const LoadingFromPromise: FC<IProps> = ({ callback, renderContent }) => {
  const [isLoading, setLoading] = useState(false);

  const onCallback = async () => {
    setLoading(true);
    callback().finally(() => setLoading(false));
  };

  return renderContent(onCallback, isLoading);
};

interface IProps {
  callback: () => Promise<any>;
  renderContent: (
    callback: () => Promise<any>,
    isLoading: boolean
  ) => ReactElement;
}

export default LoadingFromPromise;
