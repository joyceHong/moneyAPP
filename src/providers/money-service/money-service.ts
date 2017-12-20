
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

/*
  Generated class for the MoneyServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class MoneyServiceProvider {
  itemCollections: AngularFirestoreCollection<any>;
  items: Observable<any[]>;
  constructor(public afs: AngularFirestore) {
    this.itemCollections = this.afs.collection('moneyCost', ref => ref.orderBy('costDate'));
    this.items = this.itemCollections.valueChanges();
  }

  public list() {
    return this.itemCollections.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as any;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  public search(choiseyYear){
    return  this.afs.collection('moneyCost', ref => ref.where('costDate',">=",choiseyYear+"-01-01")
      .where('costDate',"<=",choiseyYear+"-12-31")).snapshotChanges()
      .map(actions=>{
         return actions.map(a=>{
          const data = a.payload.doc.data() as any;
          data.id = a.payload.doc.id;
          return data;
         })
      });
  }

  public add(item) {
    this.itemCollections.add(item);
    const listObservable = this.itemCollections.snapshotChanges();
  }

  public remove(itemID) {
    const itemDoc: AngularFirestoreDocument<any> = this.afs.doc<any>('moneyCost/' + itemID);
    itemDoc.delete();
  }

  public groupList(items) {
    let total = 0;
    return items.map(o => {
      // const data =o.payload.doc.data() as any;
      // data.id = o.payload.doc.id;
      const groupItem = [];
      o.forEach(eachObj => {
        if (groupItem[eachObj.costDate] == undefined) {
          groupItem[eachObj.costDate] = [];
        }
        total = +eachObj.cost;
        groupItem[eachObj.costDate].push({ key: eachObj.costDate, value: eachObj, sum: total });
      });
      return groupItem;
    });
  }

  public groupList2(items: any[]) {
    console.log(items);
    let total = 0;
    const groupItem = [];
    items.forEach(eachObj => {
      if (groupItem[eachObj.costDate] == undefined) {
        groupItem[eachObj.costDate] = [];
      }
      total = +eachObj.cost;
      groupItem[eachObj.costDate].push({ key: eachObj.costDate, value: eachObj, sum: total });
    });
    return groupItem;
  }

  public getCostSum(items): Observable<number> {
    // return 1000;
    return items.map((items: any[]) => {
      return items.reduce((prev, curr: any) => {
        return prev + Number(curr.cost);
      }, 0);
    })
  }

  public getGroupByMonth(items) {
    return items.map(actions => {
      const groupMonth = [];
       actions.forEach(d => {
        // const data = d.payload.doc.data() as any;
        const year = this._getYear(d.costDate, "Y");
        const month = this._getYear(d.costDate, "M");
        if (groupMonth[year] == undefined) {
          groupMonth[year] = [];
        }
        if (groupMonth[year][month] == undefined) {
          groupMonth[year][month] = [];
        }
         groupMonth[year][month].push(d);
      })
      return groupMonth;
    })
  }

  private _getYear(date, type) {
    let dateArray = date.split("-");
    switch (type) {
      case "Y":
        return Number(dateArray[0]);
      case "M":
        return Number(dateArray[1]);
    }
  }

}

