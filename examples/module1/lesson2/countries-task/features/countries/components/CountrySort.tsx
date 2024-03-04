import React, { FC, ReactElement } from 'react';

const CountrySort: FC<IProps> = ({ onChange, label, options }) => {
  return (
    <>
      <label htmlFor="sort">{label}</label>
      <select id="sort" name="sort" onChange={onChange}>
        {options.map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </>
  );
};

interface IProps {
  label?: string | ReactElement;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[][];
}

export default CountrySort;
