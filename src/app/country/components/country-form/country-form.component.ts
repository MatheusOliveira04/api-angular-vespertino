import { Component } from '@angular/core';
import { Country } from '../../models/country';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.scss']
})
export class CountryFormComponent {

  public country = {} as Country;
}
