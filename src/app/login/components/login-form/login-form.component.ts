import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent{

  public login = {
    email: '',
    password: ''
  };

  constructor(private service: LoginService){}

  public getToken(){
  this.service.getTokenLogin(this.login.email, this.login.password);
  }
}
