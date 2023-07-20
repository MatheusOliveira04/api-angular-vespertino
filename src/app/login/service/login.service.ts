import { Injectable } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private globalService: GlobalService){}

  public login = {
    email: '',
    password: ''
  };

  public getTokenLogin(email: string, password: string){
    this.login.email = email;
    this.login.password = password;
    localStorage.setItem('Token', JSON.stringify(this.login));
    this.globalService.getToken(this.login.email, this.login.password).subscribe(() =>{
    });
  }
}
