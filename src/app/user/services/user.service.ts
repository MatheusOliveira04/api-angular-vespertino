import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { User } from '../models/user';
import { GlobalService } from 'src/app/global.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private globalService: GlobalService) {}

  private urlBase: string = 'http://localhost:8080/users';
  public usersSubject = new Subject<User[]>();
  public selectUserEvent = new EventEmitter();

  public listAll(): Observable<User[]> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.globalService.token
      }),
    };
    this.http.get<User[]>(this.urlBase, httpOptions)
      .subscribe((users) => {
        this.usersSubject.next(users)
      });
    return this.usersSubject.asObservable();
  }

  public delete(user: User): Observable<void>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.globalService.token
      }),
    };
    return this.http.delete<void>(`${this.urlBase}/${user.id}`, httpOptions);
  }

  public insert(user: User): Observable<User> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.globalService.token
      }),
    };
    return this.http.post<User>(this.urlBase, user, httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    );
  }

  public update(user: User): Observable<User> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.globalService.token
      }),
    };
    return this.http.put<User>(`${this.urlBase}/${user.id}`, user, httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    );
  }

  public getUsersByName(name: string): Observable<User[]> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.globalService.token
      }),
    };
    let url = `${this.urlBase}/name/${name}`;
    this.http
      .get<User[]>(url, httpOptions)
      .subscribe((users) => this.usersSubject.next(users));
    return this.usersSubject.asObservable();
  }

  public selectUser(user: User) {
    this.selectUserEvent.emit(user);
  }
}
