import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './components/user/user.component';
import { UserformComponent } from './components/userform/userform.component';
import { UsertableComponent } from './components/usertable/usertable.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserComponent,
    UserformComponent,
    UsertableComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    UserComponent
  ]
})
export class UserModule { }
