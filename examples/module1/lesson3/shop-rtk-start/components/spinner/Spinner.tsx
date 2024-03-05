import { FC } from 'react';

import './spinner.css';

const Spinner: FC = () => {
  return (
    <div className="spinner ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
  );
};

export default Spinner;
