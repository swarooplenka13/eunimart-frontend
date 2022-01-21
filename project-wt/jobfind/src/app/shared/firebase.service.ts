import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import{File} from "../file";
import * as firebase from '@angular/fire/compat';
import { CreateComponent } from '../create/create.component';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  dow:string;
  constructor(private firebase: AngularFireDatabase,private storage: AngularFireStorage) { }

  employeeList: AngularFireList<any> | undefined;

  getEmployees() {
    this.employeeList = this.firebase.list('employees');
    return this.employeeList.snapshotChanges();
  }
  insertEmployee(employee,down:string) {
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

  updateEmployee(employee) {
    this.employeeList!.update(employee.$key,
      {
        first:employee.first,   
        last:employee.last,      
        email:employee.email,     
        address:employee.address,
        Postalcode:employee.post,
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
  
}
