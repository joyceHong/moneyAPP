import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IncomeServiceProvider } from '../../providers/income-service/income-service'
import { Observable } from 'rxjs/Observable';
import { ISubscription } from "rxjs/Subscription";
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

/**
 * Generated class for the IncomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


interface incomeItem{
  revenueDate:string;
  revenue:number;
}

@Component({
  selector: 'page-income',
  templateUrl: 'income.html',
})
export class IncomePage {
  itemCollections: AngularFirestoreCollection<incomeItem>;
  items:any[];
  obserItem:Observable<any[]>;
  sumIncome: Number;
  constructor(public navCtrl: NavController,public inComeService: IncomeServiceProvider) {
    this.obserItem= inComeService.list();
    this.obserItem.subscribe(x=>{
      this.items=x;
      this.doSum(this.items);
    });

  }


  doClick(incomeDate,incomeMoney){
    if( incomeDate != null && incomeMoney != null){
      let myObj:incomeItem = { revenueDate: incomeDate,revenue:incomeMoney};
      this.inComeService.add(myObj);
      alert("儲存成功");
      //this.navCtrl.push(ListPage);
    }else{
      alert("請輸入日期或金額");
    }
  }

  doSum(items) {
    this.items.reduce((prev, curr: any) =>{
         return this.sumIncome = prev + Number(curr.revenue);
         } ,0);
  }

  

  doDelete(itemId: any) {
    this.inComeService.remove(itemId);
  }

  ngOnDestroy() {
    this.obserItem.subscribe().unsubscribe();
  }
}
