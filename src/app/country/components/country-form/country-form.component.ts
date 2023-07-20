import { Component } from '@angular/core';
import { Country } from '../../models/country';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.scss']
})
export class CountryFormComponent {

  constructor(private service: CountryService){}

  public country = {} as Country;

  ngOnInit(): void {
      this.service.selectCountryEvent.subscribe((data) => {
        this.country = {...data};
        this.country = data;
      });
  }

  public insertCountry(){
    if(this.country.id){
      this.service.update(this.country).subscribe((data) => {
        this.country = {} as Country;
      });
    } else {
      this.service.insert(this.country).subscribe((data) => {
        this.country = {} as Country;
      });
    }
  }

  public getUsersByNameContaining(){
    this.service.getUsersByNameContaining(this.country.name);
  }
}
