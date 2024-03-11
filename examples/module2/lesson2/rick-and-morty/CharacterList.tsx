import useCharactersService from './useCharactersService';

import { FC } from 'react';

// Omit any unnecessary implementation details
const CharacterList: FC = () => {
  const { data, isPending } = useCharactersService();

  if (isPending) return <div>Loading...</div>;

  return (
    <div>
      {data?.map(({ name, status }) => (
        <>
          <p>{name}</p>
          <p>{status}</p>
        </>
      ))}
    </div>
  );
};

export default CharacterList;
