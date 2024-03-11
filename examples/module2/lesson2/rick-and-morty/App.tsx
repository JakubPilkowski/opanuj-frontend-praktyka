import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import CharacterList from './CharacterList';

import { FC } from 'react';

const client = new QueryClient();

const App: FC = () => {
  return (
    <QueryClientProvider client={client}>
      <CharacterList />
    </QueryClientProvider>
  );
};

export default App;
