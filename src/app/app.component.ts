import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConversionRatesComponent } from './components/conversion-rates/conversion-rates.component';

@Component({
  standalone: true,
  imports: [RouterModule, ConversionRatesComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'exchange-converter';
}
