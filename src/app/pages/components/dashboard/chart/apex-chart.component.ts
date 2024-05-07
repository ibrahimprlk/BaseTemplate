import { Component, OnInit, OnDestroy, ViewChildren, QueryList, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit, DoCheck, Renderer2, ElementRef, HostListener } from '@angular/core';
import { Subject, delay, takeUntil, timeout } from 'rxjs';
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
import { DashboardService } from '../dashboard.service';

import html2canvas from 'html2canvas';

import jsPDF from 'jspdf';
import { Title } from '@angular/platform-browser';

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
export class ApexChartComponent implements OnInit, OnDestroy, AfterViewInit, DoCheck {
  @Input() chartId: number = 0
  types: { label: string, value: string }[] = []
  chartOptions: any;
  baseChartOptions: any;
  isViewInit: boolean = false;
  selectedType: any;
  unSubscription: Subject<boolean> = new Subject()
  @ViewChild('chart', { static: true }) chart: ChartComponent;
  isresizecontrol: boolean = true;


  chart1: any[] = []
  chart2: any[] = []
  chart3: any[] = []
  public control: boolean;
  @Input() public set series(seriesData: any) {
    this.downloadTitleName = seriesData[0].name;
    if (seriesData) {
      this.chartOptions = Object.assign(this.baseChartOptions);
      this.chartOptions.series = seriesData

      if (seriesData?.length == 1 && seriesData[0].name == "Actual") {
        // this.chart1 =seriesData[0].data
        this.chart1 = this.dashboardService.getChartActualData()
        this.chart1 = this.formatTimestamps(this.chart1)
      }

      if (seriesData?.length == 1 && seriesData[0].name == "Forecast") {
        // this.chart2 =seriesData[0].data
        this.chart2 = this.dashboardService.getChartForecastData()
        this.chart2 = this.formatTimestamps(this.chart2)
      }


      if (seriesData?.length == 2) {

        // this.chart3 = this.mergeDataSets(seriesData[0].data,seriesData[1].data)
        this.chart1 = this.dashboardService.getChartActualData()
        this.chart1 = this.formatTimestamps(this.chart1)
        this.chart2 = this.dashboardService.getChartForecastData()
        this.chart2 = this.formatTimestamps(this.chart2)
        this.chart3 = this.mergeDataSets(this.chart1, this.chart2)
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

      this.chart.updateOptions({
        chart: {
          background: res.apexChartBackgroundColor,
          foreColor: res.apexChartForeColor,

        },
        theme: {
          mode: res.colorScheme
        }
      });
    })
  }


  public downloadTitleName;

  constructor(public layoutService: LayoutService, public dashboardService: DashboardService, private renderer: Renderer2, private el: ElementRef) {

    this.chart1 = this.dashboardService.getChartActualData()
    this.chart1 = this.formatTimestamps(this.chart1)
    this.chart2 = this.dashboardService.getChartForecastData()
    this.chart2 = this.formatTimestamps(this.chart2)
    this.chart3 = this.mergeDataSets(this.chart1, this.chart2)


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
        id: this.downloadName,
        events: {
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

      title: {
        text: this.downloadTitleName
      },
      theme: {
        mode: 'dark'
      },
      svg: {
        filename: "deneme.svg",
      },
      png: {
        filename: "deneme.png",
      }
    };

    this.selectedType = 'line';
    this.chartOptions = Object.assign(this.baseChartOptions);

  }
  ngDoCheck(): void {

    if (this.isViewInit) {
      this.AddChartCustomExportItem()
      this.chart.updateSeries(this.chartOptions.series, true)
    }
  }
  ngAfterViewInit(): void {
    this.isViewInit = true;
  }



  // ngOnChanges(changes: SimpleChanges): void {

  //   if (this.isViewInit) {
  //     this.chartOptions = Object.assign(this.baseChartOptions);

  //     let series: any[] = [];
  //     changes['series'].currentValue.forEach(element => {
  //       series.push(element)
  //     });
  //     this.chartOptions.series = series;
  //     this.chart.updateSeries(this.chartOptions.series, true)
  //   }
  // }
  changeType(event, seriesName, chart) {
    if (chart === 'chart') {
      let series = this.chartOptions.series.map(s => {
        if (s.name === seriesName) {
          return { ...s, type: event.value };
        } else {
          return s;
        }
      });

      this.chartOptions.series = series;
      this.chart.updateSeries(this.chartOptions.series, true)
    }
  }


  private AddChartCustomExportItem() {
    var elems = document.querySelectorAll('.apexcharts-menu');
    if (elems) {
      elems.forEach((elem) => {
        var zElement = elem.querySelector('.myObje');

        var existingDownloadPNG = elem.querySelector('.exportPNG');
        if (existingDownloadPNG) {
          // Eğer varsa önceki 'Download PNG' öğesini sil
          existingDownloadPNG.remove();
        }


        if (!zElement) {
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

          const new3Div = this.createElem('Download PNG');
          elem.appendChild(new3Div);

          new2Div.addEventListener('click', () => {
            const currentElem = this.GetElem(elem);
            this.downloadPNG({
              id: Number(currentElem.id),
              selectedItemName: new3Div.textContent,
            });
          });

        }

      });
    }
  }

  downloadPNG(data: { id: number; selectedItemName: string }) {
    console.log('Download PNG clicked!');
    // İşlemlerinizi burada gerçekleştirin
  }


  private createElem(itemName: string) {
    var newDiv = document.createElement('div');
    newDiv.classList.add('apexcharts-menu-item', 'myObje');
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

    if (data.selectedItemName === "Download PDF") {
      this.ExportPDF(data)
    }
    if (data.selectedItemName === "Download Excel") {
      this.ExportExcel(data)
    }
  }


  public anlikZaman = new Date(); // Şu anki tarih ve saat bilgisini alır
  // Tarih ve saat bilgisini istenen formata göre düzenleme
  public gun = this.anlikZaman.getDate();
  public ay = this.anlikZaman.getMonth() + 1; // Ay 0 ile başlar, bu yüzden 1 eklemeliyiz
  public yil = this.anlikZaman.getFullYear();
  public saat = this.anlikZaman.getHours();
  public dakika = this.anlikZaman.getMinutes();
  public saniye = this.anlikZaman.getSeconds();
  // Tarih ve saat bilgisini istenen formata göre düzenleme
  public formatliTarih = this.gun + '/' + this.ay + '/' + this.yil + ' ' + this.saat + ':' + this.dakika + ':' + this.saniye;
  public downloadName = this.gun + '_' + this.ay + '_' + this.yil
  public currentUser: any = JSON.parse(localStorage.getItem('currentUser'));


  isShow: boolean = false
  private ExportPDF(data: { id: number; selectedItemName: string }) {
    let anlikZaman = new Date(); // Şu anki tarih ve saat bilgisini alır
    // Tarih ve saat bilgisini istenen formata göre düzenleme
    let gun = anlikZaman.getDate();
    let ay = anlikZaman.getMonth() + 1; // Ay 0 ile başlar, bu yüzden 1 eklemeliyiz
    let yil = anlikZaman.getFullYear();
    let saat = anlikZaman.getHours();
    let dakika = anlikZaman.getMinutes();
    let saniye = anlikZaman.getSeconds();
    // Tarih ve saat bilgisini istenen formata göre düzenleme
    let formatliTarih = gun + '/' + ay + '/' + yil + ' ' + saat + ':' + dakika + ':' + saniye;
    let currentUser: any = JSON.parse(localStorage.getItem('currentUser'));


    // this.isShow = true
    const itemId = data.id;

    let textName = "";
    let textBaslik = "";

    if (data.id == 1) {
      textName = "Actual";
      textBaslik = "Actual";
    }
    if (data.id == 2) {
      textName = "Forecast";
      textBaslik = "Forecast";
    }
    if (data.id == 3) {
      textName = "Actual_&_Forecast";
      textBaslik = "Actual & Forecast";
    }

    setTimeout(() => {
      const DATA = document.getElementById(itemId.toString());
      const doc = new jsPDF('portrait', 'mm', 'a4');
      const options = {
        background: 'white',
        scale: 3,
      };

      var title = textBaslik + " Raporu";
      var pageWidth = doc.internal.pageSize.getWidth();

      // Arial Unicode MS fontunu ekleyin (projeye göre dosya yolu ayarlayın)
      doc.addFont('assets/fonts/arialuni.ttf', 'ArialUnicodeMS', 'normal');
      // Arial Unicode MS fontunu kullanın
      doc.setFont('ArialUnicodeMS');
      // Başlık font boyutunu ayarla
      doc.setFontSize(20); // Başlık font boyutu  
      // Metnin boyutunu al
      var textDimensions = doc.getTextDimensions(title);
      // Metni belgenin tam ortasına yerleştir
      var startX = (pageWidth - textDimensions.w) / 2;
      var startY = 10; // Y koordinatı 10 olarak belirlendi
      // Metni belgenin tam ortasına yerleştir
      var startY = 10; // Y koordinatı 10 olarak belirlendi
      // Başlık metnini ekleyin
      doc.text(title, startX, startY);
      // Başlığın altına çizgi ekleyin
      doc.setLineWidth(0.5); // Çizgi kalınlığı
      doc.line(startX, startY + 2, startX + textDimensions.w, startY + 2); // Altı çizgiyi çiz

      //Çalıştırma tarihi için font ayarlandı 
      doc.setFontSize(8);
      var text = "Çalıştırılma Tarihi" + " : " + formatliTarih + " - " + currentUser.userName;
      startY = startY + 7;
      doc.text(text, startX, startY);

      //Başlangıç tarihi tarihi için font ayarlandı 
      doc.setFontSize(12);
      var text1 = "Başlangıç Tarihi" + " : ";
      startY = startY + 10;
      doc.text(text1, 10, startY);
      doc.setFontSize(11);
      var text2 = formatliTarih;
      doc.text(text2, 45, startY);

      //Ödeme tipi için font ayarlandı 
      doc.setFontSize(12);
      var text1 = "Ödeme Tipi" + " : ";
      doc.text(text1, 90, startY);
      doc.setFontSize(11);
      var text2 = formatliTarih;
      doc.text(text2, 115, startY);


      //Bitiş tarihi tarihi için font ayarlandı 
      doc.setFontSize(12);
      var text1 = "Bitiş Tarihi" + " : ";
      startY = startY + 10;
      doc.text(text1, 10, startY);
      doc.setFontSize(11);
      var text2 = formatliTarih;
      doc.text(text2, 45, startY);

      //Kurumlar için font ayarlandı 
      doc.setFontSize(12);
      var text1 = "Kurumlar" + " : ";
      doc.text(text1, 90, startY);
      doc.setFontSize(11);
      var text2 = formatliTarih;
      doc.text(text2, 115, startY);



      html2canvas(DATA, options)
        .then((canvas) => {
          const img = canvas.toDataURL('image/PNG');

          // Add image Canvas to PDF
          const bufferX = 10;
          const bufferY = 45;
          const imgProps = doc.getImageProperties(img);
          const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          doc.addImage(
            img,
            'PNG',
            bufferX,
            bufferY,
            pdfWidth,
            pdfHeight,
            undefined,
            'FAST'
          );

          //     var doc    = new jsPDF();
          var header = ['1', '2',];
          var data = [{ 1: '1', 2: '2' }];
          var config = {
            autoSize: false,
            printHeaders: true,
            colWidths: [50, 50]
          }

          doc.table(10, bufferY + pdfHeight + 10, data, header, config);
      //    doc.output('dataurlnewwindow');

          return doc;
        })
        .then((docResult) => {

          // docResult.save(`${new Date().toISOString()}_report.pdf`);
          docResult.save(textName + "_Report_" + gun + "_" + ay + "_" + yil + ".pdf");
        });
    }, 1000);
    this.isShow = false

  }






  private ExportExcel(data: { id: number; selectedItemName: string }) {

    let anlikZaman = new Date(); // Şu anki tarih ve saat bilgisini alır
    // Tarih ve saat bilgisini istenen formata göre düzenleme
    let gun = anlikZaman.getDate();
    let ay = anlikZaman.getMonth() + 1; // Ay 0 ile başlar, bu yüzden 1 eklemeliyiz
    let yil = anlikZaman.getFullYear();
    let saat = anlikZaman.getHours();
    let dakika = anlikZaman.getMinutes();
    let saniye = anlikZaman.getSeconds();
    // Tarih ve saat bilgisini istenen formata göre düzenleme
    let formatliTarih = gun + '/' + ay + '/' + yil + ' ' + saat + ':' + dakika + ':' + saniye;
    let currentUser: any = JSON.parse(localStorage.getItem('currentUser'));

    var res: any[] = []
    var headers: string[];
    var headerAdded1;
    var headerAdded2;
    var headerAdded3;
    var textName = "";
    // Excel dosyası oluşturma işlemi
    if (data.id == 1) {
      textName = "Actual";
      res = this.chart1
      if (!headerAdded1) {
        var headers = ["Date - Actual", "Value - Actual"];
        res.unshift(headers);
        headerAdded1 = true;
      }
    }
    if (data.id == 2) {
      textName = "Forecast";
      res = this.chart2
      if (headerAdded2) {
        var headers = ["Date - Forecast", "Value - Forecast"];
        res.unshift(headers);
        headerAdded2 = false;
      }
    }
    if (data.id == 3) {
      textName = "Actual_&_Forecast";
      res = this.chart3
      if (headerAdded3) {
        var headers = ["Date - Actual", "Value - Actual", "Date - Forecast", "Value - Forecast"];
        res.unshift(headers);
        headerAdded3 = false;
      }
    }
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(res);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Dosyayı indirme işlemi
    XLSX.writeFile(wb, textName + "_Report_" + gun + "_" + ay + "_" + yil + '.xlsx');
  }

  /* Bu fonksiyon Excel de tarih düzgün formatlamayı yapmak için kullanıldı */
  formatTimestamps(data: [number, number][]): [string, number][] {
    return data.map(([timestamp, value]) => {
      const date = new Date(timestamp);
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; // DD/MM/YYYY formatı
      return [formattedDate, value];
    });
  }

  /* Burda chart1 ve chart2 verileri birleştirmek için */

  mergeDataSets(data1: any[], data2: any[]): any[][] {
    const mergedData: any[][] = [];

    // Her iki veri setini sırayla birleştir
    for (let i = 0; i < data1.length; i++) {
      mergedData.push(data1[i].concat(data2[i]));
    }
    return mergedData;
  }

}  
