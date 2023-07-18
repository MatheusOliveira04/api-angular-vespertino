import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(private http: HttpClient) { }

  public urlBase = 'http://localhost:8080/country';
  public countriesSubject = new Subject<Country[]>();

  public listAll(): Observable<Country[]>{
    this.http
    .get<Country[]>(this.urlBase)
    .subscribe((countries) => this.countriesSubject.next(countries));
    return this.countriesSubject.asObservable();
  }
}
