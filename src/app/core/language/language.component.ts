import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '../services/storage.service';

import { OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
  selector: 'mecha-language',
  standalone: true,
  imports: [DropdownModule,ReactiveFormsModule,OverlayPanelModule],
  templateUrl: './language.component.html',
  styleUrl: './language.component.css',
  
})

export class LanguageComponent implements OnInit {
  constructor(public translateService: TranslateService , private storageService : StorageService) {
    
  }
  defaultLanguage:string=''
  
  ngOnInit(): void 
  {
    this.setStorage()
  }

  private setStorage()
  {
    const res = this.storageService.getLocalStorage("currentLanguage")
    if(res)
    {
      this.translateService.use(res);
      this.languageForm.get('selectedLanguage')?.setValue(res)
      return
    }
    this.defaultLanguage =this.translateService.getDefaultLang()
    this.translateService.use(this.defaultLanguage);
    this.languageForm.get('selectedLanguage')?.setValue(this.defaultLanguage)
    this.storageService.setLocalStorage("currentLanguage",this.defaultLanguage) 
  }
  onChangeLanguageDropdown(event :DropdownChangeEvent)
  {
    this.storageService.setLocalStorage("currentLanguage",event.value)  
    this.translateService.use(event.value);
 
  }


  languages: {name:string , code:string}[]=[
    {name: 'TR', code: 'tr'},
    {name: 'EN', code: 'en'},
  ];


  languageForm:FormGroup = new FormGroup({
    selectedLanguage :new FormControl('',Validators.required)
  })

  get selected()
  {
    var res:string =this.languageForm.get('selectedLanguage')?.value || ''
    return res.toLocaleUpperCase()
  }

  Get()
  {
   return this.languages.find(x=> x.code == this.languageForm.get('selectedLanguage')?.value)?.name
  }
}
