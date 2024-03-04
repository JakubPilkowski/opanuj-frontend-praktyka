import { FC, FormEventHandler, useState } from 'react';

import useCountriesService from '../../services/useCountriesService';
import useCountryGuess from './useCountryGuess';

import CountryGrid from '../../components/CountryGrid';
import CountrySkeleton from '../../components/CountrySkeleton';
import CountryCard from '../../components/CountryCard';
import GuessResult from './GuessResult';

const CountryGuess: FC = () => {
  const { state, restart, start, validate } = useCountryGuess();

  const { data, isPending, error } = useCountriesService({
    onCompleted: (countries) => {
      start(countries.length);
    },
  });

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleValidate: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    validate(chosenCountry?.name || '', inputValue);
  };

  const handleRestart = () => {
    restart(data?.length || 0);
    setInputValue('');
  };

  if (error) {
    return <p className="text-red-800">{error.message}</p>;
  }

  const chosenCountry = data?.[state.selectedIndex];

  return (
    <form onSubmit={handleValidate} onReset={handleRestart}>
      <main className="w-[1100px] mx-auto mt-[50px] grid gap-[50px]">
        <CountryGrid className="grid-cols-1">
          {isPending || !chosenCountry ? (
            <CountrySkeleton />
          ) : (
            <CountryCard
              name={state.type === 'result' ? chosenCountry.name : '?'}
              flagSrc={chosenCountry.flagSrc}
              flagAlt={chosenCountry.flagAlt}
            />
          )}
        </CountryGrid>
        <div className="mx-auto">
          <label htmlFor="value">Wpisz nazwę państwa (po angielsku)</label>
          <input
            className=" block border-slate-500 border w-full"
            id="value"
            name="value"
            onChange={handleInputChange}
            value={inputValue}
          />
        </div>
        {state.type === 'result' && (
          <GuessResult
            result={state.result}
            successMessage="Brawo, wpisałeś poprawną wartość!!!"
            failureMessage="Niestety, nazwa państwa jest inna!!!"
          />
        )}
        <section className="flex items-center justify-center gap-[10px]">
          <button type="submit" disabled={state.type === 'result'}>
            Zgadnij
          </button>
          <button type="reset">Wylosuj ponownie</button>
        </section>
      </main>
    </form>
  );
};

export default CountryGuess;
