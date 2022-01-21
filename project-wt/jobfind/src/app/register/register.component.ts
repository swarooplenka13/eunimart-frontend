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
  @Output() value: EventEmitter<string> = new EventEmitter();
  constructor(public auth:SocialAuthService,private router:Router) { }

  ngOnInit(): void {
    this.auth.authState.subscribe((user)=>{
      this.user=user;
      this.username=this.user.name;
      // console.log(this.user.name);
      this.value.emit(this.username);
    })
  }
  google():void
  {
   this.auth.signIn(GoogleLoginProvider.PROVIDER_ID); 
  // console.log(this.username);
  //  setTimeout(() => {
  //    this.router.navigate(['/fill']);
  //  }, 7000);
  }
   admin()
   {
     var c=prompt("Enter the password for admin Login");
     if(c==="admin")
     {
       this.router.navigate(['/showdata']);
     }
     else
     {
       alert("Wrong password Entered");
     }
   }
  signout():void
  {
    this.auth.signOut();
  }

}
