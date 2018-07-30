import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Observable } from 'rxjs/Observable';
import {  UserInfo } from './../../shared/model';

@Injectable()
export class AdUserService {

 constructor(private http:HttpClient,
        private auth:AuthService,
        @Inject('API_URL') private apiUrl:string) 
  { }

  

  changePassword(user:UserInfo) {
    let body = JSON.stringify(user);
    let headers = new HttpHeaders()
    .set('Content-Type',"application/json")
    .set('Authorization', this.auth.getAuthToken());
   
    this.http.post(this.apiUrl+'api/auth/change',
                  body,{ headers: headers });
     
 }
}