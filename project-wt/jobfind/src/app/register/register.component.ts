import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { SocialUser,GoogleLoginProvider } from 'angularx-social-login';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user!: SocialUser;
  public username!:string;
  public email!:string;
  @Output() value: EventEmitter<string> = new EventEmitter();
  constructor(public auth:SocialAuthService,private router:Router) { }

  ngOnInit(): void {
    this.auth.authState.subscribe((user)=>{
      this.user=user;
      this.username=this.user.name;
      this.email=this.user.email;
      this.value.emit(this.username);
    })
  }
  google():void
  {
   this.auth.signIn(GoogleLoginProvider.PROVIDER_ID).catch((e)=>{
     alert("You are not connected to internet");
     console.log(e);
   }); 
  }
  signout():void
  {
    this.auth.signOut();
  }

}
