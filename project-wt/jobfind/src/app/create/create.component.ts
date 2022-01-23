import { AfterViewInit, Component, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';
import { ShowdataComponent } from '../showdata/showdata.component';
import{FormGroup,FormControl,Validators} from '@angular/forms';
import { FirebaseService } from '../shared/firebase.service';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/compat/storage';
import { finalize,tap,Observable } from 'rxjs';
declare var M:any;

@Injectable({
  providedIn: 'root',
})


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit,AfterViewInit {

  users!:SocialUser;
  downloadurl: string;
  chdow!:string;
  valid!:boolean|false;
  sett!:boolean|false;
  constructor(public showuser:ShowdataComponent,public router:Router,public service:FirebaseService,private af:AngularFireStorage) { }
  ngAfterViewInit(): void {
  }
 
  ngOnInit(): void {
    this.resetForm();
    this.users=this.showuser.users;
    this.service.login.controls['first'].setValue(this.users.firstName);
    this.service.login.controls['last'].setValue(this.users.lastName);
    this.service.login.controls['email'].setValue(this.users.email);
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
    this.service.login.setValue({
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
    this.service.login.reset();
    this.initializeFormGroup();
  }
  Submit() {
    if (this.service.login.valid) {
      this.service.insertEmployee(this.service.login.value,this.downloadurl,false);
      if(this.service.k){
      this.service.deleteEmployee(this.service.k);
      }
      this.senddata();
      this.service.login.reset();
      this.initializeFormGroup();
      if(this.service.check===false){
        alert("Successfully submitted");
      }
      else{
        alert("Updated Successfully");
      }
      this.showuser.Signout();
      this.router.navigate(['/home']);
    }
    else{
      alert("Invalid details Entered");
    }
  }
  get email()
  {
   return this.service.login.get('email');
  }
  get phone()
  {
   return this.service.login.get('phone');
  }
  get first()
  {
   return this.service.login.get('first');
  }
  get last()
  {
   return this.service.login.get('last');
  }
  get address()
  {
   return this.service.login.get('address');
  }
  get post()
  {
   return this.service.login.get('Postalcode');
  }
  get City()
  {
   return this.service.login.get('City');
  }
  get Country()
  {
   return this.service.login.get('Country');
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
