import { useState } from 'react';

import CountryGuess from './features/countries/views/guess/CountryGuess';
import CountryList from './features/countries/views/list/CountryList';

import { RadioGroup, RadioGroupItem } from './common/RadioGroup';

import './app.css';

type IMode = 'list' | 'guess';

const App = () => {
  const [mode, setMode] = useState<IMode>('list');

  let view;
  switch (mode) {
    case 'list':
      view = <CountryList />;
      break;
    case 'guess':
      view = <CountryGuess />;
      break;
    default:
      view = <>There is no view for mode:{mode}</>;
  }

  return (
    <>
      <RadioGroup
        defaultValue={mode}
        onValueChange={(val) => setMode(val as IMode)}
        className="flex space-x-4 justify-center mt-4 mb-8"
      >
        <div className="w-max">
          <RadioGroupItem value="list" id="list" />
          <label htmlFor="list">Lista</label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="guess" id="guess" />
          <label htmlFor="guess">Odgadnij</label>
        </div>
      </RadioGroup>
      {view}
    </>
  );
};

export default App;
