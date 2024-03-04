import { FC, useState } from 'react';

import useCountriesService from '../../services/useCountriesService';

import SkeletonList from '../../../../common/SkeletonList';
import List from '../../../../common/List';
import CountryCard from '../../components/CountryCard';
import CountrySkeleton from '../../components/CountrySkeleton';
import CountrySort from '../../components/CountrySort';
import CountryGrid from '../../components/CountryGrid';

const sortOptions = [
  ['default', 'Brak'],
  ['name', 'Alfabetycznie rosnąco'],
  ['-name', 'Alfabetycznie malejąco'],
  ['population', 'Populacja rosnąco'],
  ['-population', 'Populacja malejąco'],
];

const CountryList: FC = () => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<string | undefined>(undefined);

  const { data, isPending, error } = useCountriesService({
    filters: { name: search },
    sort,
  });

  const handleChange = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>) => {
    if (name === 'search') {
      setSearch(value);
    } else {
      setSort(value === 'default' ? undefined : value);
    }
  };

  if (error) {
    return <p className="text-red-800">{error.message}</p>;
  }

  return (
    <main className="w-[1100px] mx-auto mt-[50px] grid gap-[50px]">
      <section className="mx-auto">
        <input
          type="text"
          placeholder="Szukaj po nazwie..."
          value={search}
          name="search"
          onChange={handleChange}
        />
        <CountrySort
          onChange={handleChange}
          label="Sortuj po:"
          options={sortOptions}
        />
      </section>
      <CountryGrid>
        {isPending ? (
          <SkeletonList
            itemsCount={9}
            renderItem={(index) => <CountrySkeleton key={index} />}
          />
        ) : (
          <List
            items={data || []}
            renderItem={({ name, flagAlt, flagSrc, population }) => (
              <CountryCard
                key={name}
                name={name}
                flagSrc={flagSrc}
                flagAlt={flagAlt}
                population={population}
              />
            )}
          />
        )}
      </CountryGrid>
    </main>
  );
};

export default CountryList;
