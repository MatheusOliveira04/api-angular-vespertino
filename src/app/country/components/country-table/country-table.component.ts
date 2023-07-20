import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../models/country';

@Component({
  selector: 'app-country-table',
  templateUrl: './country-table.component.html',
  styleUrls: ['./country-table.component.scss'],
})
export class CountryTableComponent implements OnInit {
  constructor(private service: CountryService) {}

  public countries! : Country[];

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.countries = data;
    });
  }

  selectCountry(country: Country){
    let countryObj = Object.create(country);
    this.service.selectCountry(countryObj);
  }

  public delete(country: Country){
    this.service.delete(country).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.countries = data;
      });
    });
  }
}
