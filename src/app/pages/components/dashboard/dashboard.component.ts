import { Component, OnInit, OnDestroy, ViewChildren, QueryList, ViewChild, TemplateRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexTheme,
  ChartComponent
} from 'ng-apexcharts';

import { ApexChartComponent } from './chart/apex-chart.component';
import { NoopAnimationDriver } from '@angular/animations/browser';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  tooltip: ApexTooltip;
  theme: ApexTheme
};
@Component({

  templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit, OnDestroy {

  items!: MenuItem[];

  selectedActualChartSeries: any = null
  selectedForecastChartSeries: any = null
  selectedMixedChartSeries: ApexAxisChartSeries = null
  displayForForecast: boolean = false;
  displayForActual: boolean = false;
  displayForMixed: boolean = false;
  displayForecastGrid: boolean = false;

  selectedChart1Type: { label: string, value: string };
  controlchartActual: any;
  controlchartForecast: any;
  // control: FormControl;
  isSingleChart: boolean = true;

  products!: Product[];
  productsTest: { product_Code: string, warehouse: string, product_Category: string, date: string, order_Demand: number }[] = [
    { product_Code: "Product_0992", warehouse: "Whse_J", product_Category: "Category_019", date: '2016/01/11', order_Demand: 452 },
    { product_Code: "Product_0992", warehouse: "Whse_J", product_Category: "Category_019", date: '2016/01/11', order_Demand: 452 },
    { product_Code: "Product_0992", warehouse: "Whse_J", product_Category: "Category_019", date: '2016/01/11', order_Demand: 452 },
    { product_Code: "Product_0992", warehouse: "Whse_J", product_Category: "Category_019", date: '2016/01/11', order_Demand: 452 },
    { product_Code: "Product_0992", warehouse: "Whse_J", product_Category: "Category_019", date: '2016/01/11', order_Demand: 452 },
    { product_Code: "Product_0992", warehouse: "Whse_J", product_Category: "Category_019", date: '2016/01/11', order_Demand: 452 },
    { product_Code: "Product_0992", warehouse: "Whse_J", product_Category: "Category_019", date: '2016/01/11', order_Demand: 452 },
    { product_Code: "Product_0992", warehouse: "Whse_J", product_Category: "Category_019", date: '2016/01/11', order_Demand: 452 },
    { product_Code: "Product_0992", warehouse: "Whse_J", product_Category: "Category_019", date: '2016/01/11', order_Demand: 452 },
    { product_Code: "Product_0992", warehouse: "Whse_J", product_Category: "Category_019", date: '2016/01/11', order_Demand: 452 }, 
    { product_Code: "Product_0992", warehouse: "Whse_J", product_Category: "Category_019", date: '2016/01/11', order_Demand: 452 },
    { product_Code: "Product_0992", warehouse: "Whse_J", product_Category: "Category_019", date: '2016/01/11', order_Demand: 452 },
  ];


  chartData: any;
  types: { label: string, value: string }[] = []
  chartOptions1: any;
  chartOptions2: any;
  chartOptions3: any;
  displayActualGrid: boolean = false;
  isMaximized: boolean = false;
  chartList: { name: string, id: number, chartOption: ChartOptions, series: any }[] = []
  isFullScreen: boolean = false;

  subscription!: Subscription;
  unSubscription: Subject<boolean> = new Subject()

  apexChartOptions: Partial<ChartOptions>;

  @ViewChildren('chart1, chart2,chart3') charts: QueryList<ChartComponent>;
  // @ViewChild('childActulaChart') childActulaChart: TemplateRef<ApexChartComponent>;
  //  @ViewChild('childActulaChart') childActulaChart: TemplateRef<ApexChartComponent>;
  @ViewChild('childRef') child: ApexChartComponent;
  constructor(private productService: ProductService, public layoutService: LayoutService) {

    this.types = [{ label: 'Line', value: 'line' }, { label: 'Area', value: 'area' }, { label: 'Bar', value: 'bar' }];

    this.chartOptions1 = {
      series: [{
        name: 'Actual',
        type: 'line',
        data: [
          [new Date('2023-01-01').getTime(), 34],
          [new Date('2023-02-01').getTime(), 43],
          [new Date('2023-03-01').getTime(), 31],
          [new Date('2023-04-01').getTime(), 43],
          [new Date('2023-05-01').getTime(), 33],
          [new Date('2023-06-01').getTime(), 52]
        ]
      }],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: '100%'
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
      chart: {
        height: 'auto',
        // width:'100%',

        background: layoutService._config.apexChartBackgroundColor,
        foreColor: layoutService._config.apexChartForeColor
      },
      xaxis: {
        type: 'datetime',
        labels: {
          datetimeUTC: true,
          datetimeFormatter: {
            year: 'yyyy',
            month: "MMM 'yy",
            day: 'dd MMM',
            hour: 'HH:mm'
          }
        }

      },
      dataLabels: {
        enabled: false
      },
      tooltip: {
        enabled: true,
        x: {
          format: 'dd MMM yyyy'
        }
      },
      theme: {
        mode: 'dark'
      }
    };

    this.chartOptions2 = {
      series: [
        {
          name: 'Forecast',
          type: 'line',
          data: [
            [new Date('2023-01-01').getTime(), 53],
            [new Date('2023-02-01').getTime(), 26],
            [new Date('2023-03-01').getTime(), 43],
            [new Date('2023-04-01').getTime(), 35],
            [new Date('2023-05-01').getTime(), 31],
            [new Date('2023-06-01').getTime(), 47]
          ]
        }],

      chart: {
        height: 350,
        width: '100%',
        background: layoutService._config.apexChartBackgroundColor,
        foreColor: layoutService._config.apexChartForeColor
      },
      xaxis: {
        type: 'datetime',
        labels: {
          datetimeUTC: true,
          datetimeFormatter: {
            year: 'yyyy',
            month: "MMM 'yy",
            day: 'dd MMM',
            hour: 'HH:mm'
          }
        }

      },
      dataLabels: {
        enabled: false
      },
      tooltip: {
        enabled: true,
        x: {
          format: 'dd MMM yyyy'
        }
      },
      theme: {
        mode: 'dark'
      }
    };

    this.chartOptions3 = {
      series: [{
        name: 'ActualMix',
        type: 'line',
        data: [
          [new Date('2023-01-01').getTime(), 34],
          [new Date('2023-02-01').getTime(), 43],
          [new Date('2023-03-01').getTime(), 31],
          [new Date('2023-04-01').getTime(), 43],
          [new Date('2023-05-01').getTime(), 33],
          [new Date('2023-06-01').getTime(), 52]
        ]
      }, {
        name: 'ForecastMix',
        type: 'line',
        data: [
          [new Date('2023-01-01').getTime(), 53],
          [new Date('2023-02-01').getTime(), 26],
          [new Date('2023-03-01').getTime(), 43],
          [new Date('2023-04-01').getTime(), 35],
          [new Date('2023-05-01').getTime(), 31],
          [new Date('2023-06-01').getTime(), 47]
        ]
      }],

      chart: {
        height: 350,
        width: '100%',
        background: layoutService._config.apexChartBackgroundColor,
        foreColor: layoutService._config.apexChartForeColor
      },
      xaxis: {
        type: 'datetime',
        labels: {
          datetimeUTC: true,
          datetimeFormatter: {
            year: 'yyyy',
            month: "MMM 'yy",
            day: 'dd MMM',
            hour: 'HH:mm'
          }
        }

      },
      dataLabels: {
        enabled: false
      },
      tooltip: {
        enabled: true,
        x: {
          format: 'dd MMM yyyy'
        }
      },
      theme: {
        mode: 'dark'
      }
    };
    this.controlchartActual = 'line';
    this.controlchartForecast = 'line';
    this.chartList = [
      { name: 'chart1', id: 1, chartOption: this.chartOptions1, series: this.chartOptions1.series },
      { name: 'chart2', id: 2, chartOption: this.chartOptions2, series: this.chartOptions2.series },
      // ... diğer grafikler
    ]
    this.selectedActualChartSeries = this.chartOptions1.series;
    this.selectedForecastChartSeries = this.chartOptions2.series;



    // this.selectedForecastChartSeries= [
    //   {
    //       name: 'Forecast',
    //       type: 'line',
    //       width:'100%',
    //       data: [
    //         [new Date('2023-01-01').getTime(), 53],
    //         [new Date('2023-02-01').getTime(), 26],
    //         [new Date('2023-03-01').getTime(), 43],
    //         [new Date('2023-04-01').getTime(), 35],
    //         [new Date('2023-05-01').getTime(), 31],
    //         [new Date('2023-06-01').getTime(), 47]
    //       ]
    //     }];

  }

  ngOnInit() {

    this.productService.getProductsSmall().then(data => this.products = data);
    this.layoutService.getmenuExpand().pipe(takeUntil(this.unSubscription)).subscribe(res => {
      ;
      this.child.chartResizeByMenu();
      // this.chartOptions3.chart.width = '100%';
      //  this.chartOptions1.chart.width ='100%';

      //    this.chartOptions2.chart.width='100%';
      //   this.charts.forEach((chartComponent) => {

      //     chartComponent.updateOptions({
      //         chart: {
      //           width:'100%'

      //           }
      //     });
      //   });


    })

    this.layoutService.getApexChartConfig().pipe(takeUntil(this.unSubscription)).subscribe(res => {
      ;
      this.chartOptions3.chart.background = res.apexChartBackgroundColor;
      this.chartOptions3.chart.foreColor = res.apexChartForeColor;
      this.chartOptions3.theme.mode = res.colorScheme;
      this.chartOptions1.chart.background = res.apexChartBackgroundColor;
      this.chartOptions1.chart.foreColor = res.apexChartForeColor;
      this.chartOptions1.theme.mode = res.colorScheme;
      this.chartOptions2.chart.background = res.apexChartBackgroundColor;
      this.chartOptions2.chart.foreColor = res.apexChartForeColor;
      this.chartOptions2.theme.mode = res.colorScheme;
      this.charts.forEach((chartComponent) => {

        chartComponent.updateOptions({
          chart: {
            background: res.apexChartBackgroundColor,
            foreColor: res.apexChartForeColor,

          },
          theme: {
            mode: res.colorScheme
          }
        });
      });


    })
    this.items = [
      { label: 'Add New', icon: 'pi pi-fw pi-plus' },
      { label: 'Remove', icon: 'pi pi-fw pi-minus' }
    ];
  }


  toggleFullScreen(fullScreen: boolean) {
    this.isFullScreen = fullScreen;
    this.child.chartResize();
    // this.charts[1].chart.chartResize();
  }
  showDialog(chartName: string) {
    if (chartName === 'Forecast')
      this.displayForForecast = true;
    else if (chartName === 'Actual')
      this.displayForActual = true;
    else if ('Mix') {
      this.displayForMixed = true;
    }
    else if ('ActualGrid') {
      this.displayForecastGrid = true;
    }
    else
      this.displayActualGrid = true;
  }

  onHide() {
    this.displayForForecast = false;
    this.displayForActual = false;
  }


  toggleMaximize() {
    this.isMaximized = !this.isMaximized;
    if (this.isMaximized === true)
      this.updateMixedChart();
  }

  deneme:boolean=false
  updateMixedChart() {
    ;
    this.selectedMixedChartSeries = [Object.assign(this.selectedActualChartSeries[0]), Object.assign(this.selectedForecastChartSeries[0])]
    
    //    ;
    // //  let series= this.chartOptions3.series.map(s => {
    // //     if (s.name === 'ActualMix') {
    // //       return { ...s, type:this.chartOptions1.series[0].type ,data:this.chartOptions1.series[0].data };
    // //     } else if(s.name === 'ForecastMix'){
    // //         return { ...s, type:this.chartOptions2.series[0].type ,data:this.chartOptions2.series[0].data };
    // //       } 

    // //      else {
    // //       return s;
    // //     }
    // //   });

    //   this.chartOptions3.series = series;
    //   this.charts._results[2].updateOptions({
    //     series: this.chartOptions3.series
    //   })
  }

  changeType(event, seriesName, chart) {

    if (chart === 'chart1') {
      let series = this.chartOptions1.series.map(s => {
        if (s.name === seriesName) {
          return { ...s, type: event.value };
        } else {
          return s;
        }
      });
      console.log(this.selectedActualChartSeries);

    
      // this.selectedActualChartSeries.series = series.series;
      this.selectedActualChartSeries = [Object.assign(series[0])];
      console.log(this.selectedActualChartSeries);
   
      // this.charts._results[0].updateOptions({
      //   series: this.chartOptions1.series
      // });
    }
    if (chart === 'chart2') {
      let series = this.chartOptions2.series.map(s => {
        if (s.name === seriesName) {
          return { ...s, type: event.value };
        } else {
          return s;
        }
      });
      
      this.selectedForecastChartSeries = [Object.assign(series[0])];
      // this.charts._results[1].updateOptions({
      //   series: this.chartOptions2.series
      // });
    }

    
  }







  ngOnDestroy() {

    this.unSubscription.unsubscribe();

  }


}
