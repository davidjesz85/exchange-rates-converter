import { CurrencyCountryCode } from '../types/country-codes.type';

/** ExchangeRate-API endpoint partial response */
export interface ExchangeRateForCurrencyPairResponse {
  base_code: CurrencyCountryCode;
  conversion_rate: number;
  conversion_result: number;
  target_code: CurrencyCountryCode;
}

/** Mapped interface to be aligned with widely used typescript interface conventions
 * i.e.: camelCase for property names  */
export interface ExchangeRateForCurrencyPair {
  baseCode: CurrencyCountryCode;
  conversionRate: number;
  conversionResult: number;
  targetCode: CurrencyCountryCode;
}
