import { FC } from 'react';

import { Flight, flightDefaultValue, flightSchema } from './flight';
import useForm from './useForm';

const App: FC = () => {
  const {
    isValid,
    onChange,
    onBlur,
    isSubmitting,
    errors,
    validators,
    submit,
    reset,
    setRef,
  } = useForm<Flight>(flightSchema, flightDefaultValue);

  const onSubmit = async (data: Flight) => {
    if (!isValid || isSubmitting) {
      return;
    }

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        reset();
        resolve();
      }, 2000);
    });
  };

  return (
    <div className="bg-white rounded-md p-4 shadow-md">
      <h1 className="text-xl text-center font-bold">🛩️ Flight Scanner</h1>
      <form
        id="flight-form"
        className="space-y-4 mt-4"
        onSubmit={submit(onSubmit)}
      >
        <label htmlFor="origin" className="flex flex-col">
          Origin
          <input
            id="origin"
            type="text"
            name="origin"
            onChange={onChange}
            onBlur={onBlur}
            ref={setRef}
            {...validators['origin']}
            autoFocus
            placeholder="Cracow, Poland"
            className="border border-gray-200 rounded-md p-2"
          />
        </label>
        <p role="alert" className="text-red-600">
          {errors.origin}
        </p>
        <label htmlFor="destination" className="flex flex-col">
          Destination
          <input
            id="destination"
            name="destination"
            onChange={onChange}
            onBlur={onBlur}
            ref={setRef}
            {...validators['destination']}
            type="text"
            placeholder="Boston, USA"
            className="border border-gray-200 rounded-md p-2"
          />
        </label>
        <p className="text-red-600">{errors.destination}</p>
        <div className="flex flex-col">
          <label htmlFor="one-way">
            <input
              type="radio"
              name="trip"
              onChange={onChange}
              onBlur={onBlur}
              ref={setRef}
              {...validators['trip']}
              id="one-way"
              value="one-way"
            />
            One way
          </label>
          <label htmlFor="round-trip">
            <input
              type="radio"
              id="round-trip"
              name="trip"
              onChange={onChange}
              onBlur={onBlur}
              ref={setRef}
              {...validators['trip']}
              value="round-trip"
            />
            Round trip
          </label>
        </div>
        <p role="alert" className="text-red-600">
          {errors.trip}
        </p>
        <div className="grid grid-cols-2 space-x-2">
          <label htmlFor="startDate" className="flex flex-col">
            Start at
            <input
              id="startDate"
              type="text"
              name="startDate"
              onChange={onChange}
              onBlur={onBlur}
              ref={setRef}
              {...validators['startDate']}
              placeholder="01-05-2024"
              className="border border-gray-200 rounded-md p-2"
            />
            <p role="alert" className="text-red-600">
              {errors.startDate}
            </p>
          </label>
          <label htmlFor="endDate" className="flex flex-col">
            Return at
            <input
              id="endDate"
              type="text"
              name="endDate"
              onChange={onChange}
              onBlur={onBlur}
              ref={setRef}
              {...validators['endDate']}
              placeholder="10-05-2024"
              className="border border-gray-200 rounded-md p-2"
            />
            <p role="alert" className="text-red-600">
              {errors.endDate}
            </p>
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md p-2 w-full"
        >
          {isSubmitting ? 'Looking for flights...' : 'Search'}
        </button>
      </form>
      <ul className="mt-4 text-red-500" id="errors"></ul>
    </div>
  );
};

export default App;
