import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NewPageComponent } from '../new-page/new-page.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DashboardComponent }
    ]),
    
    NgApexchartsModule],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
