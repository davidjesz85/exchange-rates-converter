import {
  ExchangeRates,
  ExchangeRatesResponse,
} from '../interfaces/exchange-rates.interface';

export const transformExchangeRatesResponse = (
  res: ExchangeRatesResponse
): ExchangeRates => {
  return {
    baseCode: res.baseCode,
    conversionRates: res['conversion_rates'],
    result: res['result'],
  };
};
