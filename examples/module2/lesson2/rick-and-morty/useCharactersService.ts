import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { Character, CharacterListResponse, DefaultApi } from './api';

export default function useCharactersService() {
  const { data, isPending } = useQuery<Character[]>({
    queryKey: ['characters'],
    queryFn: async () => {
      const characters = await new DefaultApi()
        .getCharacters()
        .then(
          (response: AxiosResponse<CharacterListResponse>) =>
            response?.data.results || []
        );
      return characters;
    },
  });

  return { data, isPending };
}
