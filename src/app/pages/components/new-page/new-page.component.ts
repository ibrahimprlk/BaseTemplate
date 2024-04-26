import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { DataModel } from './data.model';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class NewPageComponent implements OnInit {
  constructor(public _service: DataService, private _messageService: MessageService, private _confirmationService: ConfirmationService) { }
  position: string = 'bottom-right';
  ngOnInit(): void {
    this.GetDatas();
  }

  values: Array<DataModel> = [];
  selectedRows: Array<DataModel> = [];
  dataModel: DataModel | undefined = undefined

  GetDatas() {
    this._service.GetData().subscribe((response) => {
      this.values = response;
      console.log(this.values);
    });
  }

  AddItem() {
    this.dataModel = new DataModel()
    this.editForm.reset()

  }
  UpdateItem(item: DataModel) {
    this.dataModel = item
    this.editForm.reset(item)

  }

  DeleteItem(item: DataModel) {
    this._confirmationService.confirm({
      message: 'Kaydı Silmek İstedğinize Emin misiniz?',
      header: 'Uyarı',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._service.Delete(item)
        this.GetDatas()
        this._messageService.add({ severity: 'success', summary: 'Successful', detail: 'Kayıt Basarili Bir Şekilde Silindi', life: 3000 });
      }
    });

  }
  MultipleDelete() {
    if (this.selectedRows.length) {
      this._confirmationService.confirm({
        message: 'Seçilen Kayıtları Silmek İstedğinize Emin misiniz?',
        header: 'Uyarı',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.selectedRows.forEach(item => {
            this._service.Delete(item)
          })
          this.GetDatas()
          this._messageService.add({ severity: 'success', summary: 'Successful', detail: 'Kayıtlar Basarili Bir Şekilde Silindi', life: 3000 });
        }
      });
    }
  }
  DialogResult(result: string) {
    if (result == "Cancel") {
      this.DialogClose()
      return;
    }
    if (result == "Save") {
      
      if (!this.dataModel.ID) {
        this._service.Add(this.editForm.value)
        this._messageService.add({ severity: 'success', summary: 'Successful', detail: 'Kayıt Basarili Bir Şekilde Oluşturuldu', life: 3000 });
      }
      else {
        this._service.Update(this.editForm.value)
        this._messageService.add({ severity: 'success', summary: 'Successful', detail: 'Kayıt Basarili Bir Şekilde Güncellendi', life: 3000 });
      }
      this.dataModel = undefined
      this.GetDatas()
      return;
    }
  }
  cols = [
    // { field: 'ID', header: 'ID', filterType: 'numeric' },
    {
      field: 'STOKKODU',
      header: 'STOK KODU',
      filterType: 'text'
    },
    {
      field: 'STOKADI',
      header: 'STOK ADI',
      filterType: 'text'
    },
    {
      field: 'GRUPKODU',
      header: 'GRUP KODU',
      filterType: 'text'
    },
    {
      field: 'RAPORKODU',
      header: 'RAPOR KODU',
      filterType: 'text'
    },
    {
      field: 'BIRIM',
      header: 'BİRİM',
      filterType: 'text'
    },
    {
      field: 'DOVIZTIPIALIS',
      header: 'DOVİZ TİPİ ALIŞ',
      filterType: 'numeric',
    },
    {
      field: 'DOVIZALISFIYAT',
      header: 'DOVİZ ALIŞ FİYAT',
      filterType: 'numeric',
    },
    {
      field: 'DOVIZTIPISATIS',
      header: 'DOVİZ TİPİ SATIS',
      filterType: 'numeric',
    },
    {
      field: 'DOVIZSATISFIYAT',
      header: 'DOVİZ SATİS FİYAT',
      filterType: 'numeric',
    },
    {
      field: 'URUNTURU',
      header: 'ÜRÜN TÜRÜ',
      filterType: 'text'
    },
    {
      field: 'RECETE_NO',
      header: 'REÇETE NO',
      filterType: 'text'
    },
    {
      field: 'ROTA_NO',
      header: 'ROTA NO',
      filterType: 'text'
    },
    {
      field: 'URETIMSURESI',
      header: 'URETİM SÜRESİ',
      filterType: 'numeric',
    },
    {
      field: 'ASGARI_STOK',
      header: 'ASGARİ STOK',
      filterType: 'numeric'
    },
    {
      field: 'AZAMI_STOK',
      header: 'AZAMİ STOK',
      filterType: 'numeric'
    },
    {
      field: 'TEDARIK_SURESI',
      header: 'TEDARİK SÜRESI',
      filterType: 'numeric',
    },
    {
      field: 'NOZEL1',
      header: 'N.OZEL',
      filterType: 'numeric'
    },
    {
      field: 'SOZEL1',
      header: 'S.OZEL',
      filterType: 'text'
    },
    {
      field: 'INSERTDATE',
      header: 'OLUŞTURULMA TARİHİ',
      filterType: 'date',
      type: 'date'
    },
    {
      field: 'ISACTIVE',
      header: 'AKTİF/PASİF',
      filterType: 'boolean',
      type: 'boolean'
    },
  ];


  editForm: FormGroup = new FormGroup({
    ID: new FormControl(),
    STOKKODU: new FormControl(),
    STOKADI: new FormControl(),
    GRUPKODU: new FormControl(),
    RAPORKODU: new FormControl(),
    BIRIM: new FormControl(),
    DOVIZTIPIALIS: new FormControl(),
    DOVIZALISFIYAT: new FormControl(),
    DOVIZTIPISATIS: new FormControl(),
    DOVIZSATISFIYAT: new FormControl(),
    URUNTURU: new FormControl(),
    RECETE_NO: new FormControl(),
    ROTA_NO: new FormControl(),
    URETIMSURESI: new FormControl(),
    ASGARI_STOK: new FormControl(),
    AZAMI_STOK: new FormControl(),
    TEDARIK_SURESI: new FormControl(),
    NOZEL1: new FormControl(),
    SOZEL1: new FormControl(),
    ISACTIVE: new FormControl(),
    INSERTDATE: new FormControl(new Date()),
  })

  activeIndex: number = 0;
  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }
  items = [
    {
        label: 'Genel Bilgiler',
        // command: (event: any) => this._messageService.add({severity:'info', summary:'First Step', detail: event.item.label})
    },
    {
        label: 'Fiyatlandırma',
        // command: (event: any) => this._messageService.add({severity:'info', summary:'Second Step', detail: event.item.label})
    },
    {
        label: 'Stock / Uretim Detayları',
        // command: (event: any) => this._messageService.add({severity:'info', summary:'Third Step', detail: event.item.label})
    }
  ];

  Next()
  {
    this.activeIndex +=1
  }
  Prev()
  {
    this.activeIndex -=1
  }
  DialogClose()
  {
    this.activeIndex=0;
    this.dataModel=undefined
  }

}
