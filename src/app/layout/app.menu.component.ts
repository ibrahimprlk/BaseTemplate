import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            // {
            //     label: 'Home',
            //     items: [
            //         { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
            //     ]
            // },
 
            {
                label: '',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                    { label: 'Stok Yönetimi', icon: 'pi pi-fw pi-home', routerLink: ['/a'] },
                    { label: 'Satınalma / Satıcı', icon: 'pi pi-fw pi-home', routerLink: ['/a'] },
                    { label: 'Mal Kabul', icon: 'pi pi-fw pi-home', routerLink: ['/a'] },
                    { label: 'Talep İşlemleri', icon: 'pi pi-fw pi-home', routerLink: ['/a'] },
                    { label: 'Üretim', icon: 'pi pi-fw pi-home', routerLink: ['/a'] },
                    { label: 'Kalite Kontrol', icon: 'pi pi-fw pi-home', routerLink: ['/a'] },
                    { label: 'Satış / Müşteri', icon: 'pi pi-fw pi-home', routerLink: ['/a'] },
                    { label: 'Lojistik', icon: 'pi pi-fw pi-home', routerLink: ['/a'] },
                    { label: 'Makine Bakım', icon: 'pi pi-fw pi-home', routerLink: ['/a'] },
                    { label: 'İnsan Kaynakları', icon: 'pi pi-fw pi-home', routerLink: ['/a'] },
                    { label: 'Bütçe', icon: 'pi pi-fw pi-home', routerLink: ['/a'] },
                    { label: 'MIS Raporları', icon: 'pi pi-fw pi-home', routerLink: ['/a'] },
                    { label: 'Yardımci İşlemler', icon: 'pi pi-fw pi-home', routerLink: ['/a'] },
                    { label: 'Yönetici Menüsü', icon: 'pi pi-fw pi-home', routerLink: ['/a'] },
                ]
            },

            // {
            //     label: 'UI Components',
            //     items: [
            //         { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
            //         { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
            //         { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
            //         { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
            //         { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] },
            //         { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
            //         { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
            //         { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
            //         { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
            //         { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
            //         { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
            //         { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },
            //         { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
            //         { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
            //         { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
            //         { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
            //     ]
           
            // }
]
}
}
