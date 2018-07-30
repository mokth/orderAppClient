import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { ApiServService } from '../../api-serv.service';
import { AuthService } from '../../../shared/auth.service';
import { SalesOrderItems, PassData } from '../../../shared/model';
import { PassDataService } from '../../../shared/passdata-service';
import { faTimesCircle } from '../../../../../node_modules/@fortawesome/free-solid-svg-icons';
import { TranslateService } from '../../../../../node_modules/@ngx-translate/core';
import { DxDataGridComponent } from '../../../../../node_modules/devextreme-angular';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {

  items:SalesOrderItems[]=[];
  title:string;
  orderno:string;
  faCancel =faTimesCircle;

  mobHeight: any;
  mobWidth: any;
  isSmallScreen: boolean;
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  constructor(private router:Router,  
         private route:ActivatedRoute,
        private apiserv:ApiServService,
        private translate:TranslateService,          
        @Inject('ORD_URL') private ordUrl:string,
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
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.orderno = params.item;
       this.apiserv.getOrderItems(this.orderno).
        subscribe(resp=>{
          this.items =resp;
          console.log(this.items); 
        
        });
      });      

      this.translate.get('orderitem.orderno').subscribe((res: string) => {
        this.title = res;
   });
   
  }
  
  getImage(data){
    return this.ordUrl+data;
  }

  back(){
    this.router.navigate(['../orders'], { relativeTo: this.route });
  }
  
  
getRowNumber(data){
  // console.log(data);
   var index = this.dataGrid.instance.pageIndex() * 
              this.dataGrid.instance.pageSize() + data.rowIndex + 1;
   return index;
 }

  onToolbarPreparing(e){
    e.toolbarOptions.items.unshift(
      {
          location: 'before',
          widget: 'dxTextBox',
          options: {
            width: 200,
            readOnly: true,
            text: this.title+" : "+this.orderno,
           
          }
      });
   }
}
