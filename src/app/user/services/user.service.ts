import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public users!: User[];
  private usersSubject = new Subject<User[]>();
  public selectUserEvent = new EventEmitter();

  public listAll(): Observable<User[]>{
    let url = `http://localhost:8080/users`
    this.http.get<User[]>(url).subscribe(users => this.usersSubject.next(users));
    return this.usersSubject.asObservable();
  }

  public getUsersByName(name: string): Observable<User[]>{
    let url = `http://localhost:8080/users/name/${name}`
    return this.http.get<User[]>(url);
  }


}
