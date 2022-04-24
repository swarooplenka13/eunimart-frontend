import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
 dat:any=[];
  constructor(private shared:SharedService) { }

  ngOnInit(): void {
    this.shared.info().subscribe((data: any) => {
      this.dat=data.data;
  });
  }

}
