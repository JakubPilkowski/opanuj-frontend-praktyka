import { REST_COUNTRIES_API } from '../constants';

export class RESTCountriesApiConstructor {
  static withUriFilter(key: string, value: string) {
    if (!value) {
      return RESTCountriesApiConstructor.all();
    }
    return `${REST_COUNTRIES_API}${encodeURIComponent(
      key
    )}/${encodeURIComponent(value)}`;
  }

  static all() {
    return `${REST_COUNTRIES_API}all`;
  }
}
