import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-userd',
  templateUrl: './userd.component.html',
  styleUrls: ['./userd.component.css']
})
export class UserdComponent implements OnInit {
 dat:any=[];
 public id!: any;
  constructor(public shared:SharedService,private route: ActivatedRoute) { }
 
  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id');
    this.shared.uinfo(this.id).subscribe((data:any)=>{
      this.dat = data.data;
      console.log(data.data)
    });
  }
  }

