import { Component, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';
import { ShowdataComponent } from '../showdata/showdata.component';
import{FormGroup,FormControl,Validators} from '@angular/forms';
import { FirebaseService } from '../shared/firebase.service';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/compat/storage';
import { File } from '../file';
import { finalize,tap,Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
declare var M:any;

@Injectable({
  providedIn: 'root',
})


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  users!:SocialUser;
  downloadurl: string;
  constructor(public showuser:ShowdataComponent,public router:Router,private service:FirebaseService,private af:AngularFireStorage) { }
  
  login=new FormGroup({
    $key: new FormControl(null),
     first: new FormControl('',Validators.required),
     last: new FormControl('',Validators.required),
     email: new FormControl('',Validators.required),
     address: new FormControl('',Validators.required),
     Postalcode: new FormControl('',Validators.required),
     City: new FormControl('',Validators.required),
     Country:new FormControl('',Validators.required),
     resume:new FormControl(''),
     phone:new FormControl('',[Validators.required, Validators.minLength(10)]),
     hire:new FormControl(false)
  })
  ngOnInit(): void {
    this.resetForm();
    this.users=this.showuser.users;
    this.login.controls['first'].setValue(this.users.firstName);
    this.login.controls['last'].setValue(this.users.lastName);
    this.login.controls['email'].setValue(this.users.email);
    console.log(this.users);
  }
  Signout()
  {
    this.showuser.Signout();
    this.router.navigate(['/register']);
  }
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
  }
  initializeFormGroup() {
    this.login.setValue({
      $key: null,
      first:'',   
      last:'',      
      email:'',     
      address:'',
      Postalcode:'',
      City:'',
      Country:'',
      phone:'',
      hire:'',
      resume:''
    });
  }
  onClear() {
    this.login.reset();
    this.initializeFormGroup();
  }
  Submit() {
    if (this.login.valid) {
      this.service.insertEmployee(this.login.value,this.downloadurl);
      this.senddata();
      this.login.reset();
      this.initializeFormGroup();
      // this.notificationService.success(':: Submitted successfully');
      alert("Successfully submitted");
      this.showuser.Signout();
      this.router.navigate(['/home']);
    }
    else{
      alert("Invalid details Entered");
    }
  }
  get email()
  {
   return this.login.get('email');
  }
  get phone()
  {
   return this.login.get('phone');
  }
  get first()
  {
   return this.login.get('first');
  }
  get last()
  {
   return this.login.get('last');
  }
  get address()
  {
   return this.login.get('address');
  }
  get post()
  {
   return this.login.get('Postalcode');
  }
  get City()
  {
   return this.login.get('City');
  }
  get Country()
  {
   return this.login.get('Country');
  } 
  path:string;
  upload($event){
    this.path=$event.target.files[0];
    this.senddata();
  }
  senddata(){
     console.log(this.path);
     const paths="/files"+Math.random()+this.path;
     const ref=this.af.ref(paths);
    const uploadTask= this.af.upload(paths,this.path);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe(downloadURL => {
          this.downloadurl= downloadURL;
          console.log(this.downloadurl);
        });
      })
    ).subscribe();
     
  }
}
