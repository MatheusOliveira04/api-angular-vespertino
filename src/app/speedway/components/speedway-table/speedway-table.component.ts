import { Component, OnInit } from '@angular/core';
import { Speedway } from '../../models/speedway';
import { SpeedwayService } from '../../service/speedway.service';

@Component({
  selector: 'app-speedway-table',
  templateUrl: './speedway-table.component.html',
  styleUrls: ['./speedway-table.component.scss']
})
export class SpeedwayTableComponent implements OnInit{
  public speedways!: Speedway[];

  constructor(private service: SpeedwayService){}

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.speedways = data;
    });
  }

  public delete(speedway: Speedway){
    this.service.delete(speedway).subscribe(() =>{
      this.service.listAll().subscribe((data) => {
        this.speedways = data;
      });
    });
  }

  public selectSpeedway(speedway: Speedway){
    let speedwayObj = Object.create(speedway);
    this.service.selectSpeedway(speedwayObj);
  }
}
