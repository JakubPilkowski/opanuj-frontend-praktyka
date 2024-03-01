import { useQuery } from '@tanstack/react-query';
import useSorting from '../../../hooks/useSorting/useSorting';
import useDebounce from '../../../hooks/useDebounce/useDebounce';

import RESTCountriesParser, {
  IRESTCountriesPayload,
} from '../lib/parsers/RESTCountriesParser';
import { RESTCountriesApiConstructor } from '../lib/api/RESTCountriesApiConstructor';
import CountriesParser from '../lib/parsers/CountriesParser';

import CountrySortingWorker from '../lib/sorting/countrySortingWorker?worker';
import ICountry from '../lib/ICountry';

const countrySortingWorker = new CountrySortingWorker();

type Args = {
  filters?: Record<string, unknown>;
  sort?: string;
  onCompleted?: (countries: ICountry[]) => void;
};

export default function useCountriesService(args?: Args) {
  const { filters, sort, onCompleted } = args || {};

  const debouncedFilters = useDebounce(filters, 500);

  const { data, isPending, error } = useQuery({
    queryKey: ['countries', debouncedFilters],
    queryFn: async () => {
      const api =
        typeof debouncedFilters !== 'undefined'
          ? RESTCountriesApiConstructor.withUriFilter(
              Object.keys(debouncedFilters)[0],
              Object.values(debouncedFilters)[0] as string
            )
          : RESTCountriesApiConstructor.all();

      const response = await fetch(api);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const payload = (await response.json()) as IRESTCountriesPayload;

      const result = new CountriesParser(new RESTCountriesParser()).parse(
        payload
      );

      if (typeof onCompleted === 'function') {
        onCompleted(result);
      }

      return result;
    },
  });

  const { items, loading } = useSorting(data || [], countrySortingWorker, sort);

  return {
    data: items,
    isPending: isPending || loading,
    error,
  };
}
