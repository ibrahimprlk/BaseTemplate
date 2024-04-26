import { Component, OnInit, OnDestroy, ViewChildren, QueryList, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit, DoCheck } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
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

import * as html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx';

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
  selector: 'mecha-apex-chart',
  templateUrl: './apex-chart.component.html',
})
export class ApexChartComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges, DoCheck {
  @Input() chartId: number = 0
  types: { label: string, value: string }[] = []
  chartOptions: any;
  baseChartOptions: any;
  isViewInit: boolean = false;
  selectedType: any;
  unSubscription: Subject<boolean> = new Subject()
  @ViewChild('chart', { static: true }) chart: ChartComponent;
  isresizecontrol: boolean = true;


  // public dataActual;
  // public dataForecast;
  // public getDataSeries:any[]=[];

  chart1:any[]=[]
  chart2:any[]=[]
  chart3:any[]=[]
  public control: boolean;
  @Input() public set series(seriesData:any) {
    if (seriesData) {
      debugger
      this.chartOptions = Object.assign(this.baseChartOptions);
      this.chartOptions.series = seriesData

      if(seriesData?.length ==1 && seriesData[0].name =="Actual")
        {
          this.chart1 =seriesData[0].data
        }

        if(seriesData?.length ==1 && seriesData[0].name =="Forecast")
          {
            this.chart2 =seriesData[0].data
          }


          if(seriesData?.length ==2)
            {
              
              this.chart3 = this.mergeDataSets(seriesData[0].data,seriesData[1].data)
            }
    }
  }



  chartResize() {
    setTimeout(() => {
      this.chart.render();
    }, 1);

  }

  chartResizeByMenu() {
    setTimeout(() => {
      this.chart.render();
    }, 150);

  }

  ngOnDestroy(): void {
    this.unSubscription.next(true);
    this.unSubscription.complete()
  }
  ngOnInit(): void {
    
    



    this.layoutService.getApexChartConfig().pipe(takeUntil(this.unSubscription)).subscribe(res => {
      
      this.baseChartOptions.chart.background = res.apexChartBackgroundColor;
      this.baseChartOptions.chart.foreColor = res.apexChartForeColor;
      this.baseChartOptions.theme.mode = res.colorScheme;
      this.chartOptions.chart.background = res.apexChartBackgroundColor;
      this.chartOptions.chart.foreColor = res.apexChartForeColor;
      this.chartOptions.theme.mode = res.colorScheme;
      // this.charts.forEach((chartComponent) => {
      
      this.chart.updateOptions({
        chart: {
          background: res.apexChartBackgroundColor,
          foreColor: res.apexChartForeColor,

        },
        theme: {
          mode: res.colorScheme
        }
      });
      // });


    })
  }

  constructor(public layoutService: LayoutService) {
    this.types = [{ label: 'Line', value: 'line' }, { label: 'Area', value: 'area' }, { label: 'Bar', value: 'bar' }];

    this.baseChartOptions = {
      series: [{
        name: 'Actual',
        type: 'line',
        width: '100vw',
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
        events:{
          updated: () => {
            this.AddChartCustomExportItem();
          },
        },
        toolbar: {

          show: true,
          tools: {
            download: true,
          },
        },

        height: window.innerHeight * 0.5,


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

    this.selectedType = 'line';
    this.chartOptions = Object.assign(this.baseChartOptions);

  }
  ngDoCheck(): void {

    if (this.isViewInit) {
      this.AddChartCustomExportItem()
      this.chart.updateSeries(this.chartOptions.series, true)
      // this.chart.updateOptions({
      //   series: this.chartOptions.series
      // });
    }
  }
  ngAfterViewInit(): void {
    this.isViewInit = true;
  }



  ngOnChanges(changes: SimpleChanges): void {
   
    if (this.isViewInit) {
       
      this.chartOptions = Object.assign(this.baseChartOptions);
      
      let series: any[] = [];
      changes['series'].currentValue.forEach(element => {
        series.push(element)
      });
      // this.chartOptions.series =   [changes['series'].currentValue];
      this.chartOptions.series = series;
      this.chart.updateSeries(this.chartOptions.series, true)
      // this.chart.updateOptions({
      //   series: this.chartOptions.series
      // });



    }

     ;
  }
  changeType(event, seriesName, chart) {
     ;
    if (chart === 'chart') {
      let series = this.chartOptions.series.map(s => {
        if (s.name === seriesName) {
          return { ...s, type: event.value };
        } else {
          return s;
        }
      });
       ;
      this.chartOptions.series = series;
      this.chart.updateSeries(this.chartOptions.series, true)
      // this.chart.updateOptions({
      //   series: this.chartOptions.series
      // });
    }
  }


  private AddChartCustomExportItem() {
    var elems = document.querySelectorAll('.apexcharts-menu');
    if (elems) {
      elems.forEach((elem) => {
        var zElement = elem.querySelector('.myObje');
        if (!zElement) 
          {
            const newDiv = this.createElem('Download PDF');
            elem.appendChild(newDiv);

            newDiv.addEventListener('click', () => {
              const currentElem = this.GetElem(elem);
              this.CustomChartExportItemClickHandle({
                id: Number(currentElem.id),
                selectedItemName: newDiv.textContent,
              });
            });

            const new2Div = this.createElem('Download Excel');
            elem.appendChild(new2Div);

            new2Div.addEventListener('click', () => {
              const currentElem = this.GetElem(elem);
              this.CustomChartExportItemClickHandle({
                id: Number(currentElem.id),
                selectedItemName: new2Div.textContent,
              });
            });

        }
      });
    }
  }

  private createElem(itemName: string) {
    var newDiv = document.createElement('div');
    newDiv.classList.add('apexcharts-menu-item','myObje');
    newDiv.textContent = itemName;
    return newDiv;
  }
  private GetElem(elem: Element) {
    var currentElem = elem as HTMLElement;
    while (currentElem) {
      if (!currentElem.parentElement.classList.contains('chart')) {
        currentElem = currentElem.parentElement;
      } else {
        break;
      }
    }

    return currentElem;
  }
  private CustomChartExportItemClickHandle(data: { id: number; selectedItemName: string }) {

    if(data.selectedItemName ==="Download PDF")
      {
        this.ExportPDF(data)
      }
    if(data.selectedItemName ==="Download Excel")
      {
        this.ExportExcel(data)
      }
  }


  isShow:boolean = false
  private ExportPDF(data: { id: number; selectedItemName: string }) {
     this.isShow = true
     const itemId = data.id;
    const element = document.getElementById(itemId.toString());
    const options = {
      margin: 10, // Kenar boşlukları
      filename: 'pdfDosyasi.pdf',
      image: { type: 'jpeg', quality: 0.98 }, // Görüntü kalitesi
      html2canvas: { scale: 2 }, // Ölçekleme
      jsPDF: { format: 'a4', orientation: 'landscape' } // Belge boyutu ve yönlendirme
  };

  // HTML içeriğini PDF'e dönüştürme
  html2pdf()
      .set(options)
      .from(element)
      .toPdf()
      .get('pdf')
      .then((pdf) => {
          // PDF dosyasını indir
          this.isShow = false
          pdf.save(options.filename);
      });
  }

  
  private ExportExcel(data: { id: number; selectedItemName: string }){
 debugger
          var res:any []=[]
          // Excel dosyası oluşturma işlemi
          if(data.id ==1)
              res = this.chart1
          if(data.id==2)
              res=this.chart2
          if(data.id ==3)
              res=this.chart3
          const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(res);
          const wb: XLSX.WorkBook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      
          // Dosyayı indirme işlemi
          XLSX.writeFile(wb, 'exported_data.xlsx');
  }


  mergeDataSets(data1: any[], data2: any[]): any[][] {
    const mergedData: any[][] = [];

    // Her iki veri setini sırayla birleştir
    for (let i = 0; i < data1.length; i++) {
      mergedData.push(data1[i].concat(data2[i]));
    }

    return mergedData;
  }

}