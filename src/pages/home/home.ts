import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MoneyServiceProvider } from '../../providers/money-service/money-service';
import {ListPage} from '../list/list';
import {MoneyListComponent} from '../../components/money-list/money-list';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

interface money{
  productId:string;
  costDate:string;
  cost:number;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  productID="";
  constructor(public navCtrl: NavController,public barcodeScanner: BarcodeScanner,public moneyService: MoneyServiceProvider) {

  }

  doQrCode(){
    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      this.productID=barcodeData.text;
     }, (err) => {
         // An error occurred
     });
  }
 
  doClick(costDate,productID,money){
    if(productID!=null && costDate != null && money != null){
      let myObj:money = {productId: productID, costDate: costDate,cost:money};
      this.moneyService.add(myObj);
      alert("儲存成功");
      this.navCtrl.push(ListPage);
    }else{
      alert("請輸入商品名稱");
    }
  }
}
