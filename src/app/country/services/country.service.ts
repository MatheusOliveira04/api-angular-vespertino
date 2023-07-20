import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Country } from '../models/country';
import { GlobalService } from 'src/app/global.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(private http: HttpClient, private globalService: GlobalService) {}

  public selectCountryEvent = new EventEmitter();
  public urlBase = 'http://localhost:8080/country';
  public countriesSubject = new Subject<Country[]>();

  public listAll(): Observable<Country[]> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.globalService.token
      }),
    };
    this.http
      .get<Country[]>(this.urlBase, httpOptions)
      .subscribe((countries) => this.countriesSubject.next(countries));
    return this.countriesSubject.asObservable();
  }

  public getUsersByNameContaining(name: string): Observable<Country[]>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.globalService.token
      }),
    };
    this.http.get<Country[]>(`${this.urlBase}/nameContain/${name}`, httpOptions)
    .subscribe((data) => this.countriesSubject.next(data));
    return this.countriesSubject.asObservable();
  }

  public delete(country: Country): Observable<void> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.globalService.token
      }),
    };
    return this.http.delete<void>(`${this.urlBase}/${country.id}`, httpOptions);
  }

  public insert(country: Country): Observable<Country> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.globalService.token
      }),
    };
    return this.http.post<Country>(this.urlBase, country, httpOptions).pipe(
    tap(() => {
      this.listAll();
    })
    );
  }

  public update(country: Country): Observable<Country> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.globalService.token
      }),
    };
    return this.http.put<Country>(`${this.urlBase}/${country.id}`, country, httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    );
  }

  selectCountry(country: Country) {
    this.selectCountryEvent.emit(country);
  }
}
