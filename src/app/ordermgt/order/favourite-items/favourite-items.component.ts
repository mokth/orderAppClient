import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { ApiServService } from '../../api-serv.service';
import { AuthService } from '../../../shared/auth.service';
import { SellItem, ChartItem, MakeOrder, OrderItem, ReferencCode, FavouriteItem } from '../../../shared/model';
import { FormGroup, FormBuilder, FormArray, FormControl } from '../../../../../node_modules/@angular/forms';
import { faPlusSquare,faEdit,faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faHeart,faSearch,faShoppingCart,faShoppingBasket,faCaretLeft} from "@fortawesome/free-solid-svg-icons"
import notify from 'devextreme/ui/notify';
import { TranslateService } from '../../../../../node_modules/@ngx-translate/core';
import { DxDataGridComponent } from '../../../../../node_modules/devextreme-angular';


@Component({
  selector: 'app-favourite-items',
  templateUrl: './favourite-items.component.html',
  styleUrls: ['./favourite-items.component.css']
})
export class FavouriteItemsComponent implements OnInit {

  orderForm: FormGroup;
  searchForm: FormGroup;
  items: Promise<any>;
  sellitems:SellItem[]=[];
  chartitems:ChartItem[]=[];
  categories:ReferencCode[]=[]
  favourietItems:FavouriteItem[]=[];
  makeorder:MakeOrder;
  title:string;
  public popoverTitle: string = 'Delete';
  public popoverMessage: string = 'Item will be permanent deleted.';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  public popoverYes: string ;
  public popoverNo: string;
  
  mobHeight: any;
  mobWidth: any;
  isSmallScreen: boolean;
  isShowChart:boolean;

  faAdd = faPlusSquare;
  faEdit = faEdit;
  faDelete = faTrashAlt;
  faHeart = faHeart;
  faSearch =faSearch;
  faShoppingCart =faShoppingCart;
  faShoppingBasket=faShoppingBasket;
  faCaretLeft = faCaretLeft 

  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  constructor(private router:Router,  
    private route:ActivatedRoute,
    private apiserv:ApiServService,
    private auth:AuthService, 
    private translate:TranslateService,  
    private formBuilder: FormBuilder,      
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
    this.isShowChart =false;
    this.searchForm = this.formBuilder.group({
      searchText: new FormControl(null),
      category: new FormControl(null)
    });
    this.orderForm = this.formBuilder.group({
      items: this.formBuilder.array([])
    });
    this.apiserv.getSellItems().
       subscribe(resp=>{
         this.sellitems=resp;
         console.log(this.sellitems);
         this.populateFromArray(this.sellitems);
         this.getFavouriteItems()
       });
       this.apiserv.getCategorys().
       subscribe(resp=>{
         this.categories=resp;
       });

       this.translate.get('orderitem.favouritelist').subscribe((res: string) => {
          this.title = res;
     });
     this.translate.get('orderitem.message').subscribe((res: string) => {
      this.popoverTitle= res;
    });
    this.translate.get('orderitem.yes').subscribe((res: string) => {
      this.popoverYes = res;
    });
    this.translate.get('orderitem.no').subscribe((res: string) => {
      this.popoverNo = res;
    });
    this.translate.get('orderitem.cancelFavitem').subscribe((res: string) => {
      this.popoverMessage = res;
    });
  }
  
  getFavouriteItems(){
    let custcode = this.auth.getUserInfo().companyCode;
    this.apiserv.getFavouriteItems(custcode).subscribe(resp=>{
      this.favourietItems = resp;
      this.AddItem2Chart(this.favourietItems);
    });
  }
  
  
  getWidth(){
    if (this.isSmallScreen){
      return this.mobWidth;
    }
    return "";
  }

  getHeight(){
    if (this.isSmallScreen){
      return this.mobHeight * 0.7;
    }
    return 550;
  }

  populateFromArray(data:SellItem[]){
    let fitems = this.orderForm.get('items') as FormArray;
    while (fitems.length !== 0) {
      fitems.removeAt(0);
    }
    data.forEach(entry=>{
      fitems.push(this.createItem(entry));      
    });    
  }

  createItem(data:SellItem): FormGroup {
    return this.formBuilder.group({
      itemCode: data.itemCode,
      itemCodeprc: data.processItemCode,
      itemName: data.itemName,
      itemNameCN:data.itemNameCN,
      itemUom: data.itemUom,
      itemNameprc: data.itemNameprc,
      itemNameCNprc:data.itemNameCNprc,
      itemUomprc: data.itemUomprc,
      imageUrl: this.ordUrl+data.imageUrl,
      imageUrlprc: this.ordUrl+data.imageUrlprc,
      qty1: '',
      qty2: ''
    });
  }

  get formData() { return <FormArray>this.orderForm.get('items'); }

  AddItem2Chart(items:FavouriteItem[]){
    items.forEach(data=>{
      var item = new ChartItem();
      item.itemCode = data.itemCode;
      item.itemName = data.itemName;
      item.itemNameCN = data.itemNameCN;
      item.qty = data.qty;
      item.imageUrl =this.ordUrl+data.imageUrl;
      this.chartitems.push(item);

      if (data.processItemCode!==null && data.processItemCode!=="" ){
          var item2 = new ChartItem();
          item2.itemCode = data.processItemCode;
          item2.itemName = data.itemNameprc;
          item2.itemNameCN = data.itemNameCNprc;
          item2.qty = data.qtyprc;
          item2.imageUrl =this.ordUrl+data.imageUrlprc;
          this.chartitems.push(item2);
      }
    });   

  }
  Add2Chart(data){
    var item = new ChartItem();
    var item2 = new ChartItem();
    console.log(data);
    item.itemCode = data.value.itemCode;
    item.itemName = data.value.itemName;
    item.itemNameCN = data.value.itemNameCN;
    item.qty = data.value.qty1;
    item.imageUrl =data.value.imageUrl;

    item2.itemCode = data.value.itemCodeprc;
    item2.itemName = data.value.itemNameprc;
    item2.itemNameCN = data.value.itemNameCNprc;
    item2.qty = data.value.qty2;
    item2.imageUrl =data.value.imageUrlprc;
    var found =this.chartitems.find(x=>x.itemCode==item.itemCode);
    if (found==null){
      if (item.qty>0){
        this.chartitems.push(item);
      }      
    }else {
      found.qty = item.qty;
    }
    var found2 =this.chartitems.find(x=>x.itemCode==item2.itemCode);
    if (found2==null){
      if (item2.qty>0){
        this.chartitems.push(item2);
      }
    }else {
      found2.qty = item2.qty;
    }
   
  }

  onDeleteItem(d){
    console.log(d.data.itemCode);
    var found =this.chartitems.findIndex(x=>x.itemCode==d.data.itemCode);
    if (found>-1){
      this.chartitems.splice(found,1);
    }
  }

  SubmitOrder(){
    this.makeorder =  new MakeOrder();
    this.makeorder.custcode = this.auth.getUserInfo().companyCode;
    this.makeorder.orderDate = new Date();
    this.makeorder.Items = [];
    this.chartitems.forEach(x=>{
        let item = new OrderItem();
        item.itemcode= x.itemCode;
        item.qty = x.qty;
        this.makeorder.Items.push(item);
    });
    this.apiserv.postFavouriteItem(this.makeorder)
      .subscribe(resp=>{
        if (resp.ok=="yes"){
          this.translate.get('save.success').subscribe((res: string) => {
            notify(res,"success", 1600);
           });
        
        }else {
          this.translate.get('save.fail').subscribe((res: string) => {
            notify(res,"error", 1600);
           });
        }
         console.log(resp);
      });    
  }

  CancelAndback(){
    this.router.navigate(['../orders'], { relativeTo: this.route });
  }

  SearchItem(){
   let search:string = this.searchForm.get('searchText').value;
   let category:string = this.searchForm.get('category').value;
   if (search==null){
     search="";
   }else{
     search= search.toLowerCase();
   }
   if (category==null){
    category="";
  }
   console.log(search+" "+category);
   //populateFromArray
   let found:SellItem[]=[];
   if (search!==""){
        found = this.sellitems.filter(x=>
                    (x.itemCode.toLowerCase().indexOf(search)>-1) ||
                    (x.processItemCode.toLowerCase().indexOf(search)>-1) ||
                    (x.itemName.toLowerCase().indexOf(search)>-1) ||
                    (x.itemNameCN.indexOf(search)>-1) ||
                    (x.itemNameprc.toLowerCase().indexOf(search)>-1) ||
                    (x.itemNameCNprc.indexOf(search)>-1)
              );
    }
    if (category!=="" && search!==""){
       found = found.filter(x=>x.itemCategory.toLowerCase()==category.toLowerCase());
    }
    if (category!=="" && search===""){
      found = this.sellitems.filter(x=>x.itemCategory.toLowerCase()==category.toLowerCase());
   }

    if (search==="" && category===""){
      this.populateFromArray(this.sellitems);
    } else {
      this.populateFromArray(found);
    }
 }
 
getRowNumber(data){
 // console.log(data);
  var index = this.dataGrid.instance.pageIndex() * 
             this.dataGrid.instance.pageSize() + data.rowIndex + 1;
  return index;
}

IsValidItem(item){
 // console.log(item.value.itemCodeprc=="");
  return item.value.itemCodeprc=="";
}
 onToolbarPreparing(e){
  e.toolbarOptions.items.unshift(
    {
        location: 'before',
        widget: 'dxTextBox',
        options: {
          width: 150,
          readOnly: true,
          text: this.title,
          value: this.title,
        }
    });
 }
 
 ShowShoppiChart(){
  this.isShowChart=!this.isShowChart;
 }
 BacktoOrderList(){
  this.isShowChart=false;
 }
}
