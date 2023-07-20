import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Speedway } from '../models/speedway';
import { CountryService } from 'src/app/country/services/country.service';
import { Country } from 'src/app/country/models/country';
import { GlobalService } from 'src/app/global.service';

@Injectable({
  providedIn: 'root'
})
export class SpeedwayService {

  constructor(private http: HttpClient, private serviceCountry: CountryService, private globalService: GlobalService) { }

  public urlBase = 'http://localhost:8080/speedway';
  public speedwaysSubject = new Subject<Speedway[]>();
  public countryList!: Country[];
  public selectSpeedwayEvent = new EventEmitter();

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.globalService.token})
  };

  public listAll(): Observable<Speedway[]>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.globalService.token
      }),
    };
    this.http.get<Speedway[]>(this.urlBase, httpOptions)
    .subscribe((data) => this.speedwaysSubject.next(data));
    return this.speedwaysSubject.asObservable();
  }

  public getByNameStartsWith(name: string): Observable<Speedway[]>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.globalService.token
      }),
    };
    this.http.get<Speedway[]>(`${this.urlBase}/name/${name}`, httpOptions)
    .subscribe((data) => this.speedwaysSubject.next(data));
    return this.speedwaysSubject.asObservable();
  }

  public findBySizeBetween(sizeIni: number, sizeFin: number): Observable<Speedway[]>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.globalService.token
      }),
    };
    this.http.get<Speedway[]>(`${this.urlBase}/size/${sizeIni}/${sizeFin}`, httpOptions)
    .subscribe((data) => this.speedwaysSubject.next(data));
    return this.speedwaysSubject.asObservable();
  } 

  public delete(speedway: Speedway): Observable<void>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.globalService.token
      }),
    };
    return this.http.delete<void>(`${this.urlBase}/${speedway.id}`, httpOptions);
  }

  public update(speedway: Speedway):Observable<Speedway>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.globalService.token
      }),
    };
   return this.http.put<Speedway>(`${this.urlBase}/${speedway.id}`, speedway, httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    );
  }

  public insert(speedway: Speedway): Observable<Speedway>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.globalService.token
      }),
    };
    return this.http.post<Speedway>(this.urlBase, speedway, httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    );
  }

  public selectSpeedway(speedway: Speedway){
    this.selectSpeedwayEvent.emit(speedway);
  }
}
