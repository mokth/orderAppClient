import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdermgtRoutingModule } from './ordermgt-routing.module';
import { OrdercompComponent } from './ordercomp.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MakeOrderComponent } from './order/make-order/make-order.component';
import { ApiServService } from './api-serv.service';
import { FormsModule, ReactiveFormsModule } from '../../../node_modules/@angular/forms';
import { DxScrollViewModule, DxDataGridModule, DxSelectBoxModule } from '../../../node_modules/devextreme-angular';
import { FontAwesomeModule } from '../../../node_modules/@fortawesome/angular-fontawesome';
import { ConfirmationPopoverModule } from '../../../node_modules/angular-confirmation-popover';
import { OrderlistComponent } from './order/orderlist/orderlist.component';
import { OrderItemsComponent } from './order/order-items/order-items.component';
import { TranslateModule } from '../../../node_modules/@ngx-translate/core';
import { FavouriteItemsComponent } from './order/favourite-items/favourite-items.component';

 
@NgModule({
  imports: [
    CommonModule,
    ImageCropperModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    OrdermgtRoutingModule,
    DxScrollViewModule,
    DxDataGridModule,
    DxSelectBoxModule,
    TranslateModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    }), 
  ],
  declarations: [OrdercompComponent, MakeOrderComponent, OrderlistComponent, OrderItemsComponent, FavouriteItemsComponent
  ],
  providers: 
  [
    ApiServService          
  ],
})
export class OrdermgtModule { }
