import { FC } from 'react';

import useAuthorsWithItemsList from '../services/useAuthorsWithItemsList';

import SkeletonList from '../components/SkeletonList';
import { Skeleton } from '../components/Skeleton';

const AuthorList: FC = () => {
  const { data, isPending } = useAuthorsWithItemsList();

  return (
    <main className="w-full flex flex-col gap-[10px]">
      {isPending ? (
        <SkeletonList
          itemsCount={9}
          renderItem={(index) => (
            <Skeleton
              className="h-[92px] bg-slate-400 rounded-[10px] p-[10px] w-full"
              key={index}
            />
          )}
        />
      ) : (
        data.map(({ id, name, items }) => (
          <div key={id} className="bg-slate-400 rounded-[10px] p-[10px] w-full">
            <p>{name}</p>
            <div>
              <p>Dostępne produkty:</p>
              <ul className="flex flex-wrap gap-[5px]">
                {items.map((item) => (
                  <li key={item.name}>{item.name}</li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </main>
  );
};

export default AuthorList;
