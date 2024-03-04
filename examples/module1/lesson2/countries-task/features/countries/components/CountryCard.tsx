import { FC, ReactElement } from 'react';
import Card from '../../../common/Card';

const CountryCard: FC<IProps> = ({ name, population, flagSrc, flagAlt }) => {
  return (
    <Card className="grid p-[10px] gap-[10px]">
      <img
        src={flagSrc}
        alt={flagAlt}
        loading="lazy"
        className="mx-auto h-[200px] border-slate-200 border-[1px]"
      />
      {name && <h4 className="text-center text-[24px]">{name}</h4>}
      {typeof population === 'number' && (
        <p className="text-center">
          Populacja:{' '}
          {Intl.NumberFormat('pl', { style: 'decimal' }).format(population)}
        </p>
      )}
    </Card>
  );
};

interface IProps {
  flagSrc: string;
  flagAlt: string;
  name?: string | ReactElement;
  population?: number;
}

export default CountryCard;
