import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
export class FillComponent implements OnInit,AfterViewInit {

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['firstname','lastame','email','Resume','mobile','city','Country','post','address','actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
   down:string;
   hirem:string;
   hrma:string;
   hired:boolean;
   constructor(public router:Router,public service:FirebaseService) { }
   ngAfterViewInit(): void {
     console.log(this.hired);
     //  this.service.hires
          // this.service.sethire(this.service.hmail);
    }
    
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
        this.service.sethire(this.service.hmail);
      }
    hire(email)
    {
    
      const hire = document.getElementById('hire');
      const elem1 = hire.innerText='Hired';
      hire.classList.toggle('btn-success');
      alert("Candiadate Shortlisted");
      this.hrma=email;
      this.hired=true;
      this.service.hired(email,true);

      // this.service.sethire(email);
  }
  Signout()
  {
    this.router.navigate(['admin/signin']);
  } 
  onDelete($key){
    if(confirm('Are you sure to delete this record ?')){
    this.service.deleteEmployee($key);
    alert("Candidate removed Successfully");
    }
  }

}
