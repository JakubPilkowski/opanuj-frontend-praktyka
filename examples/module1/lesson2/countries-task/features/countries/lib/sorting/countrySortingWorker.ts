import countrySorting from './countrySorting';

type Args = {
  items: any[];
  sortBy: string;
};

self.onmessage = (e: MessageEvent<Args>) => {
  const { items, sortBy } = e.data;

  const result = countrySorting(items, sortBy);

  self.postMessage(result);
};
