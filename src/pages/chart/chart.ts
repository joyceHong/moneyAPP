import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoneyServiceProvider } from '../../providers/money-service/money-service';
import { Observable } from 'rxjs/Observable';
import { ChartsModule } from 'ng2-charts/ng2-charts';
/**
 * Generated class for the ChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html',
})
export class ChartPage implements OnInit {
  obserItem: Observable<any[]>;
  years=[];
  choiseYear =2017;
  searchItems: Observable<any[]>;
  //config bar

  public barChart3Options: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChart3Labels: string[] = ['一月', '二月', '三月', '四月',
    '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
  public barChart3Type: string = 'bar';
  public barChart3Legend: boolean = true;

  public barChart3Data: any[] = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: '2017' }
  ];

  public barChart3Colors: Array<any> = [
    { // green
      backgroundColor: 'lightgreen',
      borderColor: 'green'
    },
    { // red
      backgroundColor: 'pink',
      borderColor: 'red'
    }
  ];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public myService: MoneyServiceProvider) {
    this.obserItem = this.myService.list();
    const currentYear = (new Date()).getFullYear();
    this.years=[currentYear-1,currentYear,currentYear+1];
  }

  ngOnInit() {
    this.doBarchartData(this.obserItem);
  }

  doBarchartData(items) {
    var groupData = [];
    var data = [];
    var sumByMonth = 0;

    var example = this.myService.getGroupByMonth(items).subscribe(d => {
      this.barChart3Labels.forEach((day, key) => {
        
        if(d.length==0){
          return [];
        }else if (d[this.choiseYear]==undefined) {
          return [];
        }

        if (d[this.choiseYear][key + 1] == undefined) {
       
          data.push(0);
        } else {
          sumByMonth = 0;
          d[this.choiseYear][key + 1].forEach((data, key) => {
            sumByMonth = sumByMonth + Number(data.cost);
          })
          data.push(sumByMonth);
        }
      })
    
      this.barChart3Data = [
        { data: data, label: this.choiseYear },
      ];
    });
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public reload(): void {
      this.doBarchartData(this.obserItem);
  }

  public onChange(){
     this.searchItems=this.myService.search(this.choiseYear);
     this.doBarchartData(this.searchItems);
  }
}
