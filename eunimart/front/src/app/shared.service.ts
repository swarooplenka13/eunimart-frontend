import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
 dat: any=[];
  constructor(private http: HttpClient) { }
  info()
  {
   return this.http.get("https://reqres.in/api/users");
  }
  uinfo(id:any)
  {
   return this.http.get(`https://reqres.in/api/users/${id}`);
  }
}
