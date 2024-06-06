import { Component } from '@angular/core';
import { ConversionRatesComponent } from './components/conversion-rates/conversion-rates.component';

@Component({
  standalone: true,
  imports: [ConversionRatesComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'exchange-converter';
}
