import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ChartPage } from '../pages/chart/chart';
import { IncomePage } from '../pages/income/income';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MoneyServiceProvider } from '../providers/money-service/money-service';
import {MoneyListComponent} from '../components/money-list/money-list';
import { GroupByPipe } from '../pipes/group-by/group-by';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { IncomeServiceProvider } from '../providers/income-service/income-service';
// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyDU-xMOhKEaPZ8dx6M8C3Vah3_5fm9Md34",
  authDomain: "firstapp-bf854.firebaseapp.com",
  databaseURL: "https://firstapp-bf854.firebaseio.com",
   projectId: "firstapp-bf854",
  storageBucket: "firstapp-bf854.appspot.com",
  messagingSenderId: "540607803749"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ChartPage,
    MoneyListComponent,
    GroupByPipe,
    IncomePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ChartPage,
    IncomePage,
    MoneyListComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    MoneyServiceProvider,
    IncomeServiceProvider
  ]
})
export class AppModule {}
