import { Component, OnInit  } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.scss'],
})
export class UsertableComponent implements OnInit {
  public users!: User[];
  public loginToken = {
    email: "usuario01@gmail.com",
    password: "12345"
  };

  constructor(private service: UserService, private globalService: GlobalService) {}

  ngOnInit(): void {
      this.service.listAll().subscribe((data) => {
        this.users = data;
      });
  }


    selectUser(user: User){
      let userObj = Object.create(user);
      this.service.selectUser(userObj);
    }

    public delete(user: User){
      this.service.delete(user).subscribe(() => {
        this.service.listAll().subscribe((data) => {
          this.users = data;
        });
      });
    }
  }

 
