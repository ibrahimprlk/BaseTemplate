import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DropdownModule } from "primeng/dropdown";
import { RippleModule } from 'primeng/ripple';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ApexChartComponent } from './chart/apex-chart.component';
import { DialogModule } from 'primeng/dialog';
import { ChilGridComponent } from './child-grid/child-grid.component';
import { appMechaTable } from 'src/app/core/directives/mecha-table.directive';
import { TableActionComponent } from './table-action/table-action.component';
import { TableActionDirective } from './table-action/table-action.directive';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenubarModule } from 'primeng/menubar';
import { NewPageComponent } from '../new-page/new-page.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

import { SelectButtonModule } from 'primeng/selectbutton';
import { StepsModule } from 'primeng/steps';
import { DragDropModule } from 'primeng/dragdrop';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        DashboardsRoutingModule,
        NgApexchartsModule,
        DropdownModule,
        ReactiveFormsModule,
        RippleModule,
        ToggleButtonModule,
        SplitButtonModule,
        DialogModule,
        appMechaTable,
        OverlayPanelModule,
        MenubarModule,
        ReactiveFormsModule,
        ConfirmDialogModule,
        ToastModule,
        SelectButtonModule,
        StepsModule,
        DragDropModule

    ],
    declarations: [DashboardComponent,   ApexChartComponent,ChilGridComponent, TableActionComponent, TableActionDirective,NewPageComponent]
})
export class DashboardModule { }
