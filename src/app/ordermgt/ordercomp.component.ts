import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ordercomp',
  templateUrl: './ordercomp.component.html',
  styleUrls: ['./ordercomp.component.css']
})
export class OrdercompComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  
 
  constructor(private http:HttpClient) {
    
  }
 
  
  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(image: string) {
      this.croppedImage = image;
  }
  imageLoaded() {
      // show cropper
  }
  loadImageFailed() {
      // show message
  }

  ngOnInit() {
  }

  OnClick(){
    this.createOrder().subscribe(resp=>{
      console.log(resp);
    });
  }
  OnClick2(){
    this.createDelivert().subscribe(resp=>{
      console.log(resp);
    });
  }
  OnClick3(){
    this.createDetail().subscribe(resp=>{
      console.log(resp);
    });
  }

  createOrder():Observable<any>{
    let headers = new HttpHeaders()
         .set('Content-Type',"application/json")  
    let order =this.getOredr();  
    let body: string = JSON.stringify(order);
    return this.http.post('https://api.tookanapp.com/v2/create_task/',
                           body,{ headers: headers })
  }

  createDelivert():Observable<any>{
    let headers = new HttpHeaders()
         .set('Content-Type',"application/json")  
    let order =this.getDelivery();  
    let body: string = JSON.stringify(order);
    return this.http.post('https://api.tookanapp.com/v2/create_task/',
                           body,{ headers: headers })
  }

  createDetail():Observable<any>{
    let headers = new HttpHeaders()
         .set('Content-Type',"application/json")  
    let order =this.getAllTaskDetail();  
    let body: string = JSON.stringify(order);
    console.log(body);
    return this.http.post('https://api.tookanapp.com/v2/get_all_tasks/',
                           body,{ headers: headers })
  }
 
  getOredr():any{
    let order =
    {
      api_key:"51656783f41403411551717e4610214414e2ccfc2ed9733c5f1c",
      order_id:"Order019",
      job_description:"This is a test order",
      job_pickup_phone:"0127745223",
      job_pickup_name:"From  TH MOK",
      job_pickup_email:"mokth@hotmail.com",
      job_pickup_address:"No.10, Jalan Setia Tropika 1/21, Taman Setia Tropika, 81200 Kempas,Johor Bahru",
      job_pickup_latitude:"1.548786",
      job_pickup_longitude:"103.717633",
      job_pickup_datetime:"2018-06-11 22:40:00",
      has_pickup:1,
      has_delivery:0,
      layout_type:0,
      tracking_link:0,
      timezone:"+480",
      pickup_custom_field_template:"",
      pickup_meta_data:{},
      team_id:35200,
      auto_assignment:1,
      fleet_id:"",
      p_ref_images:[],
      notify:1,
      geofence:0,
      tags:"food"

    }

    return order;
  }

  getDelivery():any{
    let order =
    {
      api_key:"51656783f41403411551717e4610214414e2ccfc2ed9733c5f1c",
      order_id:"Order003",
      job_description:"This is a test order",
      job_pickup_phone:"0127745223",
      customer_email:"mokth@hotmail.com",
      customer_username:"Mr Lim",
      customer_phone:"012-7732322",
      customer_address:"No.57- 17,, 1, Jalan Setia Tropika 1/2, Taman Gembira, 81200 Johor Bahru, Johor",
      latitude:"1.5465132",
      longitude:"103.71730439999999",
      job_delivery_datetime:"2018-06-08 13:30:00",
      has_pickup:0,
      has_delivery:1,
      layout_type:0,
      tracking_link:0,
      timezone:"+480",
      custom_field_template:"",
      meta_data:{},
      team_id:35200,
      auto_assignment:1,
      fleet_id:"",
      ref_images:[],
      notify:0,
      geofence:0,
      tags:""

    }

    return order;
  }

  getTaskDetail():any{
    let order =
    {
      api_key: "51656783f4134b0358416a7e5c10214414e7c3f328d47e3b541c",
      order_id: "Order007",
      user_id: 36764
     
    }

    return order;
  }

  getAllTaskDetail():any{
    let d1 = new Date(2018,6,6,0,0).getTime();
    let d2 = new Date(2018,6,30,0,0).getTime();
    let order =
    {
      api_key: "51656783f4134b0358416a7e5c10214414e7c3f328d47e3b541c",
     job_status:2,
     job_type:0,
     start_date:'2018-06-01',
     end_date:'2018-06-30',
     custom_fields:0,
     is_pagination:0,
     requested_page:1,
     customer_id:''
     
     
    }

    return order;
  }
}
