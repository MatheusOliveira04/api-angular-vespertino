import { Component, OnInit } from '@angular/core';
import { SpeedwayService } from '../../service/speedway.service';
import { Country } from 'src/app/country/models/country';
import { CountryService } from 'src/app/country/services/country.service';
import { Speedway } from '../../models/speedway';

@Component({
  selector: 'app-speedway-form',
  templateUrl: './speedway-form.component.html',
  styleUrls: ['./speedway-form.component.scss'],
})
export class SpeedwayFormComponent implements OnInit {
  public countryList!: Country[];
  public speedway = {} as Speedway;
  public filterButton: boolean = true;

  constructor(
    private service: SpeedwayService,
    private serviceCountry: CountryService
  ) {}

  ngOnInit(): void {
    this.serviceCountry.listAll().subscribe((data) => {
      this.countryList = data;
    });

    this.service.selectSpeedwayEvent.subscribe((data) => {
      this.speedway = { ...data };
    });
  }

  public listAllCountry() {
    this.service.countryList = this.countryList;
  }
  public speedwayInsert() {
    if (this.speedway.id) {
      this.service.update(this.speedway).subscribe((data) => {
        this.speedway = {} as Speedway;
      });
    } else {
      this.service.insert(this.speedway).subscribe((data) => {
        this.speedway = {} as Speedway;
      });
    }
  }

  public getByNameStartsWith(name: string) {
    this.service.getByNameStartsWith(name);
  }

  public findBySizeBetween(sizeIniStr: string, sizeFinStr: string) {
    const sizeIni = parseInt(sizeIniStr, 10);
    const sizeFin = parseInt(sizeFinStr, 10);
    this.service.findBySizeBetween(sizeIni, sizeFin);
  }

  public filterButtonMethod() {
    this.filterButton = !this.filterButton;
  }
}
