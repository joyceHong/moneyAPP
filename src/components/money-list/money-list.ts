import { Component,OnDestroy  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from "rxjs/Subscription";
import { MoneyServiceProvider } from '../../providers/money-service/money-service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
/**
 * Generated class for the MoneyListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

interface money {
  productId: string;
  costDate: string;
  cost: number;
}

@Component({
  selector: 'money-list',
  templateUrl: 'money-list.html'
})
export class MoneyListComponent implements OnDestroy {
  private subscription: ISubscription;
  itemCollections: AngularFirestoreCollection<money>;
  items:any[];
  obserItem:Observable<any[]>;
  groupList: any[];
  sumCost: Number;
  dispot:Observable<any[]>;
  constructor(public afs: AngularFirestore, public moneyService: MoneyServiceProvider) {

    this.obserItem= moneyService.list();
    this.dispot=this.obserItem;
    this.obserItem.subscribe(x=>{
      this.items=x;
      this.groupList =moneyService.groupList2(this.items);
      this.doSum(this.items);
    });
  }
 

  doSum(items) {
    this.items.reduce((prev, curr: any) =>{
         return this.sumCost = prev + Number(curr.cost);
         } ,0);
  }

  getItems(ev: any) {
    this.dispot= this.moneyService.list();
    this.dispot.subscribe(
      x=>{
        this.items=x;
           let val = ev.target.value;
           if (val && val.trim() != '') {
            this.items = this.items.filter((item: any) => {
                   return (item.costDate.toLowerCase().indexOf(val.toLowerCase()) > -1);
             });
            this.groupList=this.moneyService.groupList2(this.items);
            this.doSum(this.items);
           }
      }
    );
  }

  doDelete(itemId: any) {
    this.moneyService.remove(itemId);
  }

  ngOnDestroy() {
    this.obserItem.subscribe().unsubscribe();
    this.dispot.subscribe().unsubscribe();
  }
}
