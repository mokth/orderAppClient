import { Time } from "@angular/common";

export class PassData{
    public messageType:string;
    public payload:any;
    constructor(msgType:string,data:any){
        this.messageType= msgType;
        this.payload= data;
    }
}

export class SalesOrder
{
    public id:number;
    public orderNo:string;
    public orderStatus:string;
    public orderDate:Date
    public customerCode:string;
    public customerName:string;
    public resellerCode:string;
    public AccountStatus:string;
    public orderType:string;
    public remark:string;
    public updateDate:Date
    public createDate:Date
  
}

export class SalesOrderItems
{
    public iD:number;
    public orderNo :string;
    public orderLine:number;
    public itemCode:string;
    public itemName:string;
    public itemNameCN:string;
    public itemCategory:string;
    public itemUom :string;
    public quantity:number;
}

export class SellItem {
    public id:Number;
    public itemCode: string;
    public itemName: string;
    public itemNameCN: string;
    public itemType: string;
    public itemCategory: string;
    public itemUom: string;
    public itemStatus: string;
    public processItemCode: string;
    public isProcessItem: boolean;
    public imageUrl: string;
    public imageUrlprc: string;
    public itemNameprc: string;
    public itemNameCNprc: string;
    public itemUomprc: string;
}

export class ChartItem {
    public itemCode: string;
    public itemName: string;
    public itemNameCN: string;
    public imageUrl: string;
    public uom: string;
    public qty: number;  
}

export class UserInfo
{
    public name:string;
    public fullname;
    public access:string;;
    public country:string;
    public state:string;
    public city:string;
    public area:string;
    public location:string;
    public companyCode:string;
    public branchCode:string;
    public role:string;
}

export class MakeOrder
{
    public orderDate :Date;
    public custcode:string;
    public Items:OrderItem[];
}

export class OrderItem
{
    public itemcode:string;
    public qty:number;
}

export class FavouriteItem
{
    public iD :number;
    public customerCode:string;
    public itemCode :string;
    public itemName :string;
    public itemNameCN :string;
    public itemUom :string;
    public imageUrl :string;
    public qty :number;
    public processItemCode :string;
    public itemNameprc :string;
    public itemNameCNprc :string;
    public uomprc :string;
    public imageUrlprc :string;
    public qtyprc :number;
    
}

export class ReferencCode
{
    public code :string;
    public description :string;
}