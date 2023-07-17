import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
        this.service.users = data;
        this.users = this.service.users;
      });
    }
  }

 
