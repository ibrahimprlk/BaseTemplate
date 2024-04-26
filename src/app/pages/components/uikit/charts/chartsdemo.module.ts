import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsDemoRoutingModule } from './chartsdemo-routing.module';
import { ChartModule } from 'primeng/chart'
import { ChartsDemoComponent } from './chartsdemo.component';
import { NgApexchartsModule } from 'ng-apexcharts';
@NgModule({
	imports: [
		CommonModule,
		ChartsDemoRoutingModule,
		ChartModule,
		NgApexchartsModule
	],
	declarations: [ChartsDemoComponent]
})
export class ChartsDemoModule { }
