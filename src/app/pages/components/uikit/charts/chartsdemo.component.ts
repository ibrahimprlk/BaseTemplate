import { Component,  OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime, takeUntil } from 'rxjs';
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
     ///-----------------------apexcharts
     export type ChartOptions = {
        series: ApexAxisChartSeries;
        chart: ApexChart;
        xaxis: ApexXAxis;
        yaxis:ApexYAxis;
        dataLabels: ApexDataLabels;
        tooltip: ApexTooltip;
        theme:ApexTheme
      };
     ///-----------------------apexcharts
@Component({
    templateUrl: './chartsdemo.component.html',
})
export class ChartsDemoComponent implements OnInit, OnDestroy {

    public chartOptions: Partial<ChartOptions>;
    lineData: any;

 
    barData: any;

    pieData: any;

    polarData: any;

    radarData: any;

    lineOptions: any;

    barOptions: any;

    pieOptions: any;

    polarOptions: any;

    radarOptions: any;
    @ViewChild('chart') chart: ChartComponent;

    subscription: Subscription;
    constructor(private layoutService: LayoutService,) {
        this.chartOptions = {
            series: [{
                name: 'Seri 1',
                data: [
                  [new Date('2023-01-01').getTime(), 34],
                  [new Date('2023-02-01').getTime(), 43],
                  [new Date('2023-03-01').getTime(), 31],
                  [new Date('2023-04-01').getTime(), 43],
                  [new Date('2023-05-01').getTime(), 33],
                  [new Date('2023-06-01').getTime(), 52]
                ]
              }, {
                name: 'Seri 2',
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
              type: "line",
              background:layoutService._config.apexChartBackgroundColor,
              foreColor: layoutService._config.apexChartForeColor
            //   background: '#ffffff', 
            //   foreColor: '#4b5563' 
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
            }
          };
        this.subscription = this.layoutService.configUpdate$
            .pipe(debounceTime(25))
            .subscribe((config) => {
                this.initCharts();
            });
    }


    unSubscription:Subject<boolean> = new Subject()
    ngOnInit() {
        this.initCharts();
        this.layoutService.getApexChartConfig().pipe(takeUntil(this.unSubscription)).subscribe(res=>{
            ;
           this.chartOptions.chart.background = res.apexChartBackgroundColor;
           this.chartOptions.chart.foreColor = res.apexChartForeColor;
        if (this.chart && this.chart.updateOptions) {
           this.chart.updateOptions({
             chart: {
               background: res.apexChartBackgroundColor,
               foreColor:res.apexChartForeColor
             }
           });
     
        }
     
          })


        // let chart = new ApexCharts(document.querySelector("#chart"), Option);
       
    }


 
    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        this.barData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                    borderColor: documentStyle.getPropertyValue('--primary-200'),
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };

        this.barOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };

        this.pieData = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [540, 325, 702],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--indigo-500'),
                        documentStyle.getPropertyValue('--purple-500'),
                        documentStyle.getPropertyValue('--teal-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--indigo-400'),
                        documentStyle.getPropertyValue('--purple-400'),
                        documentStyle.getPropertyValue('--teal-400')
                    ]
                }]
        };

        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };

        this.lineData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                    borderColor: documentStyle.getPropertyValue('--primary-200'),
                    tension: .4
                }
            ]
        };

        this.lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };

        this.polarData = {
            datasets: [{
                data: [
                    11,
                    16,
                    7,
                    3
                ],
                backgroundColor: [
                    documentStyle.getPropertyValue('--indigo-500'),
                    documentStyle.getPropertyValue('--purple-500'),
                    documentStyle.getPropertyValue('--teal-500'),
                    documentStyle.getPropertyValue('--orange-500')
                ],
                label: 'My dataset'
            }],
            labels: [
                'Indigo',
                'Purple',
                'Teal',
                'Orange'
            ]
        };

        this.polarOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        this.radarData = {
            labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
            datasets: [
                {
                    label: 'My First dataset',
                    borderColor: documentStyle.getPropertyValue('--indigo-400'),
                    pointBackgroundColor: documentStyle.getPropertyValue('--indigo-400'),
                    pointBorderColor: documentStyle.getPropertyValue('--indigo-400'),
                    pointHoverBackgroundColor: textColor,
                    pointHoverBorderColor: documentStyle.getPropertyValue('--indigo-400'),
                    data: [65, 59, 90, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    borderColor: documentStyle.getPropertyValue('--purple-400'),
                    pointBackgroundColor: documentStyle.getPropertyValue('--purple-400'),
                    pointBorderColor: documentStyle.getPropertyValue('--purple-400'),
                    pointHoverBackgroundColor: textColor,
                    pointHoverBorderColor: documentStyle.getPropertyValue('--purple-400'),
                    data: [28, 48, 40, 19, 96, 27, 100]
                }
            ]
        };

        this.radarOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: textColorSecondary
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    
}
