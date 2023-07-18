import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Speedway } from '../models/speedway';

@Injectable({
  providedIn: 'root'
})
export class SpeedwayService {

  constructor(private http: HttpClient) { }

  public urlBase = 'http://localhost:8080/speedway';
  public speedways = new Subject<Speedway[]>();
}
