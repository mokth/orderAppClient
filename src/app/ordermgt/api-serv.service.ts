import { MakeOrder, ReferencCode, SalesOrder, OrderItem, SalesOrderItems, FavouriteItem } from './../shared/model';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../shared/auth.service';
import { SellItem } from '../shared/model';

@Injectable()
export class ApiServService {

  constructor(private http:HttpClient,
              private auth:AuthService,
              @Inject('API_URL') private apiUrl:string) 
    { }

    getSellItems():Observable<SellItem[]>{
      let headers = new HttpHeaders()
        .set('Authorization', this.auth.getAuthToken());
      return this.http.get<SellItem[]>(this.apiUrl+'api/item',{ headers: headers });
    }

    getCategorys():Observable<ReferencCode[]>{
      let headers = new HttpHeaders()
        .set('Authorization', this.auth.getAuthToken());
      return this.http.get<ReferencCode[]>(this.apiUrl+'api/item/refs',{ headers: headers });
    }

    getOrders():Observable<SalesOrder[]>{
      let headers = new HttpHeaders()
        .set('Authorization', this.auth.getAuthToken());
      return this.http.get<SalesOrder[]>(this.apiUrl+'api/order',{ headers: headers });
    }

    getOrderItems(orderno:string):Observable<SalesOrderItems[]>{
      let code = orderno.replace('/','-');
      let headers = new HttpHeaders()
        .set('Authorization', this.auth.getAuthToken());
      return this.http.get<SalesOrderItems[]>(this.apiUrl+'api/order/items/'+code,{ headers: headers });
    }

    getFavouriteItems(custcode:string):Observable<FavouriteItem[]>{
      let code = custcode.replace('/','-');
      let headers = new HttpHeaders()
        .set('Authorization', this.auth.getAuthToken());
      return this.http.get<FavouriteItem[]>(this.apiUrl+'api/item/favouriteitems/'+code,{ headers: headers });
    }

    postOrder(order:MakeOrder):Observable<any>{
      let headers = new HttpHeaders()
      .set('Content-Type',"application/json")
      .set('Authorization', this.auth.getAuthToken());
    let body: string = JSON.stringify(order);
    return this.http.post(this.apiUrl+'api/order/makeorder',
                   body, { headers: headers });
    }

    postFavouriteItem(order:MakeOrder):Observable<any>{
      let headers = new HttpHeaders()
      .set('Content-Type',"application/json")
      .set('Authorization', this.auth.getAuthToken());
    let body: string = JSON.stringify(order);
    return this.http.post(this.apiUrl+'api/item/favourites',
                   body, { headers: headers });
    }

}
