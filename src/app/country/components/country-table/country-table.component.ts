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
      this.service.countriesSubject.next(data);
      this.countries = data;
    });
  }
}
