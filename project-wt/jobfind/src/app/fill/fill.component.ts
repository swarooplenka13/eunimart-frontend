import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CreateComponent } from '../create/create.component';
import { FirebaseService } from '../shared/firebase.service';

@Component({
  selector: 'app-fill',
  templateUrl: './fill.component.html',
  styleUrls: ['./fill.component.css']
})
export class FillComponent implements OnInit {

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['firstname','lastame','email','Resume','mobile','city','Country','post','address','actions'];
  // @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
   down:string;
  constructor(public router:Router,public service:FirebaseService) { }

  ngOnInit(): void {
    this.service.getEmployees().subscribe(
      list => {
        let array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
        this.listData = new MatTableDataSource(array);
        this.listData.paginator = this.paginator;
      });
  }
  Signout()
  {
    this.router.navigate(['/register']);
  } 
}
