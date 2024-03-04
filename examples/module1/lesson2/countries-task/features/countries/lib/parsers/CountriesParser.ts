import ICountry from '../ICountry';
import ICountriesParser from './ICountriesParser';

export default class CountriesParser<T> {
  constructor(private countryParser: ICountriesParser<T>) {}

  parse(payload: T): ICountry[] {
    try {
      return this.countryParser.parse(payload);
    } catch (err) {
      throw new Error(
        `Could not parse payload: ${JSON.stringify(payload)}. Reason: ${err}`
      );
    }
  }
}
