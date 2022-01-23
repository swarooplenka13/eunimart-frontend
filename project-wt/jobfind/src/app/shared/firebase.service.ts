import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  dow:string;
  check!:boolean|false;
  mail!:string;
  k!:string;
  res!:string;
  k2!:boolean|false;
  hires!:boolean|false;
  hmail:string;
  constructor(private firebase: AngularFireDatabase,private storage: AngularFireStorage,public router:Router) { }
  employeeList: AngularFireList<any> | undefined;
  List: AngularFireList<any> | undefined;
  getEmployees() {
    this.employeeList = this.firebase.list('employees');
    return this.employeeList.snapshotChanges();
  }
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
  find(email:string){
    this.getEmployees().subscribe((list) => {
        list.map(async (item) => {
          console.log(email);
          console.log(item.payload.val().email);
            if(email===item.payload.val().email)
            {
             this.mail=email;
             this.k=item.key;
             this.check=true;
             this.res=await item.payload.val().resume;
             console.log(this.res);
             return;
            }
        });
      });
  }
  insertEmployee(employee,down:string,hire) {
    this.employeeList=this.firebase.list('/employees');
    this.dow=down;
    if(employee){
    this.employeeList!.push({
      first:employee.first,   
      last:employee.last,      
      email:employee.email,     
      address:employee.address,
      Postalcode:employee.Postalcode,
      City:employee.City,
      Country:employee.Country,
      phone:employee.phone,
      hire:employee.hire,
      resume:this.dow
    });
  }
  }
  hired(employee,hire) {
    this.List=this.firebase.list('/hired');
    this.hmail=employee;
    console.log(this.res);
    if(employee){
    this.List!.push({  
      email:employee,    
      hire:hire,
    });
  }
  }
  gethired()
  {
    this.List = this.firebase.list('/hired');
    return this.List.snapshotChanges();
  }
  sethire(email)
  {
    this.gethired().subscribe((list) => {
      list.map((item) => {
        console.log(email);
        console.log(item.payload.val());
        console.log(item.payload.val().email);
          if(email===item.payload.val().email)
          {
            this.hires=item.payload.val().hire;
            console.log(this.hires);
            return;
          }
      });
    });
  }
  updateEmployee(employee,k,down) {
    this.dow=down;
    this.employeeList.update(k,
      {
        first:employee.first,   
        last:employee.last,      
        email:employee.email,     
        address:employee.address,
        Postalcode:employee.Postalcode,
        City:employee.City,
        Country:employee.Country,
        phone:employee.phone,
        hire:employee.hire,
        resume:this.dow
      });
  }

  deleteEmployee($key: string) {
    this.employeeList!.remove($key);
  }
  populateForm(row) {
    this.login.controls['first'].setValue(row.first);
    this.login.controls['last'].setValue(row.last);
    this.login.controls['email'].setValue(row.email);
    this.login.controls['address'].setValue(row.address);
    this.login.controls['phone'].setValue(row.phone);
    this.login.controls['City'].setValue(row.City);
    this.login.controls['Country'].setValue(row.Country);
    this.login.controls['Postalcode'].setValue(row.Postalcode);
    this.router.navigate(['/filldata']);
  }
}