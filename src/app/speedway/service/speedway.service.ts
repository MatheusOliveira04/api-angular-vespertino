import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Speedway } from '../models/speedway';
import { CountryService } from 'src/app/country/services/country.service';
import { Country } from 'src/app/country/models/country';

@Injectable({
  providedIn: 'root'
})
export class SpeedwayService {

  constructor(private http: HttpClient, private serviceCountry: CountryService) { }

  public urlBase = 'http://localhost:8080/speedway';
  public speedwaysSubject = new Subject<Speedway[]>();
  public countryList!: Country[];
  public selectSpeedwayEvent = new EventEmitter();

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  public listAll(): Observable<Speedway[]>{
    this.http.get<Speedway[]>(this.urlBase)
    .subscribe((data) => this.speedwaysSubject.next(data));
    return this.speedwaysSubject.asObservable();
  }

  public getByNameStartsWith(name: string): Observable<Speedway[]>{
    this.http.get<Speedway[]>(`${this.urlBase}/name/${name}`)
    .subscribe((data) => this.speedwaysSubject.next(data));
    return this.speedwaysSubject.asObservable();
  }

  public findBySizeBetween(sizeIni: number, sizeFin: number): Observable<Speedway[]>{
    this.http.get<Speedway[]>(`${this.urlBase}/size/${sizeIni}/${sizeFin}`)
    .subscribe((data) => this.speedwaysSubject.next(data));
    return this.speedwaysSubject.asObservable();
  } 

  public delete(speedway: Speedway): Observable<void>{
    return this.http.delete<void>(`${this.urlBase}/${speedway.id}`);
  }

  public update(speedway: Speedway):Observable<Speedway>{
   return this.http.put<Speedway>(`${this.urlBase}/${speedway.id}`, speedway, this.httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    );
  }

  public insert(speedway: Speedway): Observable<Speedway>{
    return this.http.post<Speedway>(this.urlBase, speedway, this.httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    );
  }

  public selectSpeedway(speedway: Speedway){
    this.selectSpeedwayEvent.emit(speedway);
  }
}
