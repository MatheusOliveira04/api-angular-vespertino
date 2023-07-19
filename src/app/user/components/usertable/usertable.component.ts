import { Component, OnInit  } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.scss'],
})
export class UsertableComponent implements OnInit {
  public users!: User[];

  constructor(private service: UserService) {}

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
      this.service.delete(user).subscribe(() =>{
        this.service.listAll().subscribe((data) =>{
          this.users = data;
        });
      });
    }


  }

 
