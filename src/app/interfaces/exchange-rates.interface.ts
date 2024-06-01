import { CurrencyCountryCode } from '../types/country-codes.type';

export type ResponseStatus = 'success' | 'error';

export type ConversionRatesType = Record<CurrencyCountryCode, number>;

export interface AllExchangeRates {
  countryCode: CurrencyCountryCode;
  exchangeRate: number;
}

export interface ExchangeRateForCurrencyPairResponse {
  base_code: CurrencyCountryCode;
  conversion_rate: number;
  conversion_result: number;
  result: ResponseStatus;
  target_code: CurrencyCountryCode;
}

export interface ExchangeRateForCurrencyPair {
  baseCode: CurrencyCountryCode;
  conversionRate: number;
  conversionResult: number;
  status: ResponseStatus;
  targetCode: CurrencyCountryCode;
}

export interface ExchangeRatesResponse {
  conversion_rates: ConversionRatesType;
  baseCode: CurrencyCountryCode;
  result: ResponseStatus;
}

export interface ExchangeRates {
  conversionRates: ConversionRatesType;
  baseCode: CurrencyCountryCode;
  result: ResponseStatus;
}

export interface ConversionRates {
  conversion_rates: ConversionRatesType;
}

export interface CurrencyCountryCodeAndValue {
  currency: CurrencyCountryCode;
  amount: number;
}
