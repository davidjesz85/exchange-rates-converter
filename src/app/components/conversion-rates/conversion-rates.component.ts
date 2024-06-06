import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ExchangeRatesService } from '../../services/exchange-rates/exchange-rates.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { CurrencyCountryCode } from '../../types/country-codes.type';
import { CURRENCY_COUNTRY_CODES } from '../../constants/CURRENCY_CODES';
import { ExchangeRateForCurrencyPair } from '../../interfaces/exchange-rates.interface';
import { HIDDEN_FEE_OTP_BANK } from '../../constants/HIDDEN-FEE_OTP-BANK';
import { CdkAccordionItem } from '@angular/cdk/accordion';

@Component({
  selector: 'app-conversion-rates',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CdkAccordionItem,
  ],
  providers: [CdkAccordionItem],
  templateUrl: './conversion-rates.component.html',
  styleUrl: './conversion-rates.component.scss',
})
export class ConversionRatesComponent {
  constructor(private exchangeRatesService: ExchangeRatesService) {}

  /** Constants */
  protected readonly CURRENCY_COUNTRY_CODES = CURRENCY_COUNTRY_CODES;

  protected readonly HIDDEN_FEE_OTP_BANK = HIDDEN_FEE_OTP_BANK;

  /** Observable(s) */
  exchangeData$?: Observable<ExchangeRateForCurrencyPair>;

  /** Properties */
  amount: number | null = null;

  baseCurrency: CurrencyCountryCode = 'EUR';

  currencyValueChanged = false;

  targetCurrency: CurrencyCountryCode = 'HUF';

  /** Methods */
  convertCurrencies() {
    if (!this.amount) {
      return;
    }

    this.fetchExchangeRates();
    this.currencyValueChanged = false;
  }

  fetchExchangeRates() {
    if (!this.amount) return;

    this.exchangeData$ = this.exchangeRatesService
      .fetchCurrencyPairExchangeRate(
        this.amount,
        this.baseCurrency,
        this.targetCurrency
      )
      .pipe(
        map((exchangeRate: ExchangeRateForCurrencyPair) => {
          const conversionResultWithHiddenFee =
            exchangeRate.conversionResult * HIDDEN_FEE_OTP_BANK;

          return {
            ...exchangeRate,
            conversionResult: conversionResultWithHiddenFee,
          };
        }),
        catchError((error) => {
          console.log('error', error);
          return throwError(() => error);
        })
      );
  }

  onBaseCurrencyChange() {
    this.currencyValueChanged = true;
    this.exchangeRatesService.baseCurrency.next(this.baseCurrency);
  }

  onCurrencySwapClick() {
    this.currencyValueChanged = true;
    const temporaryTargetCurrencyCodeHolder = this.targetCurrency;
    this.targetCurrency = this.baseCurrency;
    this.baseCurrency = temporaryTargetCurrencyCodeHolder;
    this.fetchExchangeRates();
    this.currencyValueChanged = false;
  }

  onTargetCurrencyChange() {
    this.currencyValueChanged = true;
    this.exchangeRatesService.targetCurrency.next(this.targetCurrency);
  }
}
