import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
    inject,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { CurrentUserService } from '../core/services/current-user.service';
import { CurrentUser } from '../core/models/current-user';
import { Subject, takeUntil } from 'rxjs';
import { MenuService } from './app.menu.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnInit, OnDestroy {
    selectedTheme: string = 'dark';
    themeOptions = [
        { label: 'Light Theme', value: 'light' },
        { label: 'Dark Theme', value: 'dark' },
    ];
    items!: MenuItem[];
    notificationCount: number = 5;
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;
    unSubscription: Subject<boolean> = new Subject();

    currentUserService: CurrentUserService = inject(CurrentUserService);
    currentUser: CurrentUser | undefined = undefined;
    layoutService: LayoutService = inject(LayoutService);
    menuService: MenuService = inject(MenuService);

    isCurrentTheme(theme: string): boolean {
        return this.selectedTheme === theme;
    }

    ngOnInit(): void {
        this.getCurrentUser();
        this.items = [
          {
            label: '',
            icon: 'pi pi-bell',
            badge:
                this.notificationCount > 0
                    ? this.notificationCount.toString()
                    : null,
            command: (event) => this.menuItemClick(event),
        },
      
            {
                label: this.currentUser.userName,
                icon: 'pi pi-fw pi-user',

                items: [
          //           {
          //               label: 'Theme',
          //               items: this.themeOptions.map((option) => ({
          //                   label: option.label,
          //                   command: (event) => this.menuItemClick(event),
          //                   template: `<div class="field-radiobutton flex-1">
          //     <p-radioButton name="inputStyle" value="light" [(ngModel)]="theme" inputId="outlined_input"></p-radioButton>
          //     <label for="outlined_input">light</label>
          // </div>
          // <div class="field-radiobutton flex-1">
          //     <p-radioButton name="inputStyle" value="dark" [(ngModel)]="theme" inputId="filled_input"></p-radioButton>
          //     <label for="filled_input">Dark</label>
          // </div>`,
          //               })),
          //           },
                    {
                      label: 'Settings',
                      icon: 'pi pi-fw pi-cog',
                      info:"Settings",
                      command: (event) => this.menuItemClick(event),
                  },
                    {
                        label: 'Billing',
                        icon: 'pi pi-fw pi-file',
                        command: (event) => this.menuItemClick(event),
                    },
                    {
                      label: 'Quit',
                      icon: 'pi pi-fw pi-sign-out',
                      command: (event) => this.menuItemClick(event),
                  },
                ],
            }
        ];
    }

    ngOnDestroy(): void {
        this.unSubscription.next(true);
        this.unSubscription.complete();
    }

    getCurrentUser() {
        this.currentUserService
            .Get()
            .pipe(takeUntil(this.unSubscription))
            .subscribe((response) => {
                this.currentUser = response;
            });
    }

    menuItemClick(event) {

        switch (event.item.label) {
            case 'Light Theme':
                this.layoutService.setApexChartConfig(
                    '#ffffff',
                    '#4b5563',
                    'light'
                );
                this.changeTheme('lara-light-teal', 'light');
                break;
            case 'Dark Theme':
                this.layoutService.setApexChartConfig(
                    '#1f2937',
                    '#FFFFFF',
                    'dark'
                );
                this.changeTheme('lara-dark-teal', 'dark');
                break;
            case 'Quit':
                this.currentUserService.LogOut();
                break;
            case 'Settings':
              this.layoutService.showConfigSidebar();
                break;
            case '':
                // this.layoutService.showConfigSidebar();
                break;
            default:
        }
    }

    set theme(val: string) {
        this.layoutService.config.update((config) => ({
            ...config,
            theme: val,
        }));
    }
    get theme(): string {
        return this.layoutService.config().theme;
    }

    set colorScheme(val: string) {
        if (val === 'dark')
            this.layoutService.config.update((config) => ({
                ...config,
                colorScheme: val,
                backgroundColor: '#1f2937',
                foreColor: '#FFFFFF',
            }));
        else
            this.layoutService.config.update((config) => ({
                ...config,
                colorScheme: val,
                apexChartBackgroundColor: '#ffffff',
                apexChartForeColor: '#4b5563',
            }));
    }
    get colorScheme(): string {
        return this.layoutService.config().colorScheme;
    }
    changeTheme(theme: string, colorScheme: string) {
        this.theme = theme;
        this.colorScheme = colorScheme;
    }

}
