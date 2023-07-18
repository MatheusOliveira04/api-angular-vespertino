import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.scss'],
})
export class UserformComponent implements OnInit {
  public user = {} as User;

  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.service.selectUserEvent.subscribe((data) => {
      this.user = {...data};
      this.user = data;
    });
  }

  public insertUser(){
    if(this.user.id){
      this.service.update(this.user).subscribe((data) => {
        this.user = {} as User;
        
      });
    } else {
      this.service.insert(this.user).subscribe((data) => {
        this.user= {} as User;
      });
    }
  }
}
