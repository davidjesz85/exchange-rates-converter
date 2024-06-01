import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, shareReplay, tap } from 'rxjs';
import {
  ConversionRatesType,
  ExchangeRateForCurrencyPair,
  ExchangeRateForCurrencyPairResponse,
  ExchangeRates,
  ExchangeRatesResponse,
} from '../interfaces/exchange-rates.interface';
import { CurrencyCountryCode } from '../types/country-codes.type';
import { transformExchangeRatesResponse } from '../mappers/exchangeRatesResponse.mapper';
import { currencyPairExchangeRateResponseMapper } from '../mappers/currencyPairExchangeRateResponse.mapper';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRatesService {
  constructor(private http: HttpClient) {}

  amountToExchange = new BehaviorSubject<number>(0);

  baseCurrency = new BehaviorSubject<CurrencyCountryCode>('USD');

  targetCurrency = new BehaviorSubject<CurrencyCountryCode>('EUR');

  fetchExchangeRates(): Observable<ExchangeRates> {
    return this.http.get<ExchangeRates>(
      'https://v6.exchangerate-api.com/v6/c711da9cfcf551ddf7d57fde/latest/USD'
    );
  }

  fetchCurrencyPairExchangeRate(
    amount: number,
    baseCurrency: CurrencyCountryCode,
    targetCurrency: CurrencyCountryCode
  ): Observable<ExchangeRateForCurrencyPair> {
    return this.http
      .get<ExchangeRateForCurrencyPairResponse>(
        `https://v6.exchangerate-api.com/v6/c711da9cfcf551ddf7d57fde/pair/${baseCurrency}/${targetCurrency}/${amount}`
      )
      .pipe(
        map((res) => {
          return currencyPairExchangeRateResponseMapper(res);
        })
      );
  }

  loadConversionRates(): Observable<CurrencyCountryCode[]> {
    return this.http
      .get<ExchangeRatesResponse>(
        'https://v6.exchangerate-api.com/v6/c711da9cfcf551ddf7d57fde/latest/' +
          this.baseCurrency.getValue()
      )
      .pipe(
        map((res: ExchangeRatesResponse) => {
          const transformedExchangeRatesResponse =
            transformExchangeRatesResponse(res);

          return Object.keys(
            transformedExchangeRatesResponse.conversionRates
          ) as CurrencyCountryCode[];
        }),
        shareReplay()
      );
  }

  loadAllExchangeRates(): Observable<ConversionRatesType> {
    return this.http
      .get<ExchangeRatesResponse>(
        'https://v6.exchangerate-api.com/v6/c711da9cfcf551ddf7d57fde/latest/' +
          this.baseCurrency.getValue()
      )
      .pipe(
        map((res) => {
          return res['conversion_rates'];
        }),
        shareReplay()
      );
  }
}
