import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Customer, Representative } from 'src/app/pages/api/customer';
import { CustomerService } from 'src/app/pages/service/customer.service';
import { Product } from 'src/app/pages/api/product';
// import { ProductService } from 'src/app/pages/service/product.service';
import { Table } from 'primeng/table';
import { Dialog } from 'primeng/dialog';


// import { MessageService, ConfirmationService } from 'primeng/api';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    selector: 'mecha-child-grid',
    templateUrl: './child-grid.component.html',
     providers: [CustomerService],
})
export class ChilGridComponent implements OnInit {
    @ViewChild("tableDialog", { static: true }) tableDialogComponent!: Dialog;
    tableDialogVisible:boolean = false
    customers1: Customer[] = [];

    customers2: Customer[] = [];

    customers3: Customer[] = [];

    selectedCustomers1: Customer[] = [];

    selectedCustomer: Customer = {};

    representatives: Representative[] = [];

    statuses: any[] = [];

    products: Product[] = [];

    rowGroupMetadata: any;

    expandedRows: expandedRows = {};

    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private customerService: CustomerService) { }

    ngOnInit() {
       
        this.customerService.getCustomersLarge().then(customers => {
            this.customers1 = customers;
            this.loading = false;

            // @ts-ignore
            this.customers1.forEach(customer => customer.date = new Date(customer.date));
        });
        this.representatives = [
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Anna Fali', image: 'annafali.png' },
            { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
            { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
            { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
            { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
            { name: 'Onyama Limba', image: 'onyamalimba.png' },
            { name: 'Stephen Shaw', image: 'stephenshaw.png' },
            { name: 'XuXue Feng', image: 'xuxuefeng.png' }
        ];

        this.statuses = [
            { label: 'Unqualified', value: 'unqualified' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'New', value: 'new' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Renewal', value: 'renewal' },
            { label: 'Proposal', value: 'proposal' }
        ];
    }

 
   
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
    
    fontSize:number = 1;
    changeSize:number=0.2;
    Arttir()
    {
      this.fontSize +=this.changeSize;
    }
    Azalt()
    {
      this.fontSize -=this.changeSize;
    }

    onActionClick(event:{clickedBtn:string})
    {
        if(event.clickedBtn === "Maximize")
        {
            this.tableDialogVisible = !this.tableDialogVisible
            this.tableDialogComponent.maximized = true
        }
    }


}