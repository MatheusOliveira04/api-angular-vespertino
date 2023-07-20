import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(private http: HttpClient) {}

  public selectCountryEvent = new EventEmitter();
  public urlBase = 'http://localhost:8080/country';
  public countriesSubject = new Subject<Country[]>();

  public httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  }

  public listAll(): Observable<Country[]> {
    this.http
      .get<Country[]>(this.urlBase)
      .subscribe((countries) => this.countriesSubject.next(countries));
    return this.countriesSubject.asObservable();
  }

  public getUsersByNameContaining(name: string): Observable<Country[]>{
    this.http.get<Country[]>(`${this.urlBase}/nameContain/${name}`)
    .subscribe((data) => this.countriesSubject.next(data));
    return this.countriesSubject.asObservable();
  }

  public delete(country: Country): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${country.id}`);
  }

  public insert(country: Country): Observable<Country> {
    return this.http.post<Country>(this.urlBase, country, this.httpOptions).pipe(
    tap(() => {
      this.listAll();
    })
    );
  }

  public update(country: Country): Observable<Country> {
    return this.http.put<Country>(`${this.urlBase}/${country.id}`, country, this.httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    );
  }

  selectCountry(country: Country) {
    this.selectCountryEvent.emit(country);
  }
}
