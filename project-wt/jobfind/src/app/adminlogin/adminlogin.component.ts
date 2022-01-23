import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../shared/firebase.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  em!:string;
  logins=false;
  constructor(private router:Router,private ser:FirebaseService) { }


  login=new FormGroup({
     first: new FormControl(''),
     pass: new FormControl(''),
  })
  ngOnInit(): void {
  }

  Submit(){
   if(this.login.value.first==='admin'&& this.login.value.pass==='admin'){
     this.logins=true;
     this.router.navigate(['showdata']);
   }
   else{
     alert("Wrong details Entered.");
   }
  }
}
