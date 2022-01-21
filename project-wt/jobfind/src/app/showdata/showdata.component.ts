import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { SocialUser,GoogleLoginProvider } from 'angularx-social-login';
import { RegisterComponent } from '../register/register.component';
import {MatDialog} from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';
@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-showdata',
  templateUrl: './showdata.component.html',
  styleUrls: ['./showdata.component.css']
})
export class ShowdataComponent implements OnInit {
   

   names!:string;
   users!:SocialUser;
   crte!:boolean|false;
  constructor(public register:RegisterComponent,public router:Router,public dialog:MatDialog) { }
 
  ngOnInit(): void {
    this.names=this.register.username;
    this.users=this.register.user;
  }
  Signout()
  {
    this.register.signout();
    this.router.navigate(['/register']);
  }
  create()
  {
  //  this.dialog.open(CreateComponent)
  this.crte=true;
  // this.router.navigate(['/filldata']);
  }
}
