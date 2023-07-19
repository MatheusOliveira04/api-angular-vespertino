import { Component, OnInit } from '@angular/core';
import { SpeedwayService } from '../../service/speedway.service';
import { Country } from 'src/app/country/models/country';
import { CountryService } from 'src/app/country/services/country.service';
import { Speedway } from '../../models/speedway';

@Component({
  selector: 'app-speedway-form',
  templateUrl: './speedway-form.component.html',
  styleUrls: ['./speedway-form.component.scss']
})
export class SpeedwayFormComponent implements OnInit{
  public countryList!: Country[];
  public speedway = {} as Speedway;
  public filterButton: boolean = true;

  constructor(private service: SpeedwayService, private serviceCountry: CountryService){}

  public listAllCountry(){
    this.service.countryList = this.countryList;
  }
  ngOnInit(): void {
    this.serviceCountry.listAll().subscribe((data) => {
      this.countryList = data;
    });

    this.service.selectSpeedwayEvent.subscribe((data) =>{
      this.speedway = {...data};
    });
  }

  public speedwayInsert(){
    if(this.speedway.id){
      this.service.update(this.speedway).subscribe((data) =>{
        this.speedway = {} as Speedway;
        
      });
    } else {
      this.service.insert(this.speedway).subscribe((data) => {
        this.speedway = {} as Speedway;
      })
    }
  }

  public filterButtonMethod(){
    this.filterButton = !this.filterButton;
  }
}
