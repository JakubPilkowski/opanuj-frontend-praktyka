import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ItemList from './containers/ItemList';
import AuthorList from './containers/AuthorList';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex items-start gap-[10px]">
        <ItemList />
        <AuthorList />
      </main>
    </QueryClientProvider>
  );
};

export default App;
