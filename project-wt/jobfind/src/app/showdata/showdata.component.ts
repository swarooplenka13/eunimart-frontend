import { AfterViewInit, Component, Injectable, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { SocialUser,GoogleLoginProvider } from 'angularx-social-login';
import { RegisterComponent } from '../register/register.component';
import {MatDialog} from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';
import { FirebaseService } from '../shared/firebase.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as _ from 'lodash';
import { FillComponent } from '../fill/fill.component';
@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-showdata',
  templateUrl: './showdata.component.html',
  styleUrls: ['./showdata.component.css']
})
export class ShowdataComponent implements OnInit,AfterViewInit  {
   

   names!:string;
   users!:SocialUser;
   crte!:boolean|false;
   check!:boolean;
   em!:string;
   hired!:boolean|false;
   listData: MatTableDataSource<any>;
   array:any;
   displayedColumns: string[] = ['actions'];
   @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public register:RegisterComponent,public router:Router,public ser:FirebaseService) { }
 
  ngOnInit(): void {
    this.names=this.register.username;
    this.users=this.register.user;
    this.em=this.register.email;
  }
  ngAfterViewInit():void{
    this.ser.find(this.em);
    this.ser.sethire(this.em);
    this.fill();
  }
  fill(){
      this.ser.getEmployees().subscribe((list) => {
        list.map((item) => {
          console.log(item.payload.val().email);
            if(this.em===item.payload.val().email)
            {
                this.array=[{
                $key:item.key,
                first:item.payload.val().first,
                last:item.payload.val().last,
                email:item.payload.val().email,
                address:item.payload.val().address,
                City:item.payload.val().City,
                Country:item.payload.val().Country,
                phone:item.payload.val().phone,
                Resume:item.payload.val().resume,
                Postalcode:item.payload.val().Postalcode,
                hire:false
              }]
              // console.log(array);
              this.listData = new MatTableDataSource(this.array);
              this.listData.paginator = this.paginator;
            }
        });
      });  
  }
  onEdit(row){
    this.ser.populateForm(row);
 
  }
  onDelete($key){
    if(confirm('Are you sure to delete this record ?')){
    this.ser.deleteEmployee($key);
    alert("Candidate removed Successfully");
    }
  }

  Signout()
  {
    this.register.signout();
    this.ser.check=false;
    this.ser.hires=false;
    this.router.navigate(['/register']);
  }
  create()
  {
  this.crte=true;
  }
}
