import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, shareReplay } from 'rxjs';
import {
  ExchangeRateForCurrencyPair,
  ExchangeRateForCurrencyPairResponse,
} from '../../interfaces/exchange-rates.interface';
import { CurrencyCountryCode } from '../../types/country-codes.type';
import { currencyPairExchangeRateResponseMapper } from '../../mappers/currencyPairExchangeRateResponse.mapper';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRatesService {
  constructor(private http: HttpClient) {}

  baseCurrency = new BehaviorSubject<CurrencyCountryCode>('USD');

  targetCurrency = new BehaviorSubject<CurrencyCountryCode>('EUR');

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
        }),
        shareReplay()
      );
  }
}
