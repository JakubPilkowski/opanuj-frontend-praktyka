import ICountry from '../ICountry';

export default interface ICountriesParser<T> {
  parse(payload: T): ICountry[];
}
