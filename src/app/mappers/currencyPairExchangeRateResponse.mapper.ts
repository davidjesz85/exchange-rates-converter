import {
  ExchangeRateForCurrencyPair,
  ExchangeRateForCurrencyPairResponse,
} from '../interfaces/exchange-rates.interface';

export const currencyPairExchangeRateResponseMapper = (
  res: ExchangeRateForCurrencyPairResponse
): ExchangeRateForCurrencyPair => {
  return {
    baseCode: res.base_code,
    conversionRate: res.conversion_rate,
    conversionResult: res.conversion_result,
    targetCode: res.target_code,
  };
};
