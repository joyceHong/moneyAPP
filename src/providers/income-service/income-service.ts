import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

/*
  Generated class for the IncomeServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IncomeServiceProvider {

  itemCollections: AngularFirestoreCollection<any>;
  items: Observable<any[]>;

  constructor(public afs: AngularFirestore) {
    this.itemCollections = this.afs.collection('income', ref => ref.orderBy('revenueDate'));
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

  public add(item) {
    this.itemCollections.add(item);
    const listObservable = this.itemCollections.snapshotChanges();
  }

  public remove(itemID) {
    const itemDoc: AngularFirestoreDocument<any> = this.afs.doc<any>('income/' + itemID);
    itemDoc.delete();
  }

}
