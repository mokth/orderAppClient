import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdercompComponent } from './ordercomp.component';
import { MakeOrderComponent } from './order/make-order/make-order.component';
import { OrderlistComponent } from './order/orderlist/orderlist.component';
import { OrderItemsComponent } from './order/order-items/order-items.component';
import { FavouriteItemsComponent } from './order/favourite-items/favourite-items.component';

const routes: Routes = [
  { path: '',  component: OrdercompComponent  },
  { path: 'makeorder',  component: MakeOrderComponent  },
  { path: 'orders',  component: OrderlistComponent  },
  { path: 'orderItem',  component: OrderItemsComponent  },
  { path: 'favourite',  component: FavouriteItemsComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdermgtRoutingModule { }
