import ICountriesParser from './ICountriesParser';

export type IRESTCountriesPayload = IRESTCountry[];

export default class RESTCountriesParser
  implements ICountriesParser<IRESTCountriesPayload>
{
  parse(payload: IRESTCountriesPayload) {
    return payload.map(({ name, flags, population }) => {
      return {
        id: name.common,
        name: name.common,
        flagSrc: flags.svg,
        flagAlt: flags.alt,
        population,
      };
    });
  }
}

interface IRESTCountry {
  name: {
    common: string;
  };
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  population: number;
}
