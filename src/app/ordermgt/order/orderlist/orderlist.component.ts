import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { ApiServService } from '../../api-serv.service';
import { AuthService } from '../../../shared/auth.service';
import { SalesOrder, PassData } from '../../../shared/model';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faEye} from "@fortawesome/free-solid-svg-icons"
import { PassDataService } from '../../../shared/passdata-service';
import { TranslateService } from '../../../../../node_modules/@ngx-translate/core';
@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {
  orders:SalesOrder[]=[];
  title:string;
  title2:string;
  faEyeSlash=faEye;
  
  mobHeight: any;
  mobWidth: any;
  isSmallScreen: boolean;

  constructor(private router:Router,  
    private route:ActivatedRoute,
    private apiserv:ApiServService,
    private translate:TranslateService,     
    @Inject('API_URL') private apiUrl:string,
   ) {
    this.mobHeight = window.innerHeight;
    this.mobWidth = window.innerWidth;
    
    if (this.mobWidth < 500) {
      this.isSmallScreen = true;
    } else {
      this.isSmallScreen = false;
    }  
  }

  ngOnInit() {
    this.apiserv.getOrders().subscribe(
      resp=>{
          this.orders= resp;
      }
    )
    this.translate.get('orderitem.new').subscribe((res: string) => {
      this.title = res;
    });
    this.translate.get('orderitem.favouritems').subscribe((res: string) => {
      this.title2 = res;
    });
    //
  }
  
  OnViewItem(d){
     console.log(d.data);
   
     this.router.navigate(['../orderItem'],
       { 
         relativeTo: this.route, 
         queryParams: { item: d.data.orderNo}
       });
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift(
      {
          location: 'before',
          widget: 'dxButton',
          options: {
            width:  this.isSmallScreen?120:120,
            text: this.title,
            elementAttr:{ id: 'elementId', class: 'btn-primary' },
            onClick: this.newOrderClick.bind(this)
          }
      });
      // e.toolbarOptions.items.unshift(
      //   {
      //       location: 'before',
      //       widget: 'dxButton',
      //       options: {
      //         width:  this.isSmallScreen?90:120,
      //         text: this.title,
      //         elementAttr:{ id: 'elementId2', class: 'btn-primary' },
      //         onClick: this.newOrderOneTimeClick.bind(this)
      //       }
      //   });
  }
   
  newOrderClick(e) {
     this.router.navigate(['../makeorder'],
     { 
       relativeTo: this.route,
       queryParams: { onetime: 'no' }  
     });
  }

  newOrderOneTimeClick(e) {
    this.router.navigate(['../makeorder'],
    { 
      relativeTo: this.route,
      queryParams: { onetime: 'yes' }  
    });
 }
}
