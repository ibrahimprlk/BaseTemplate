import { Injectable } from '@angular/core';
import { DataModel } from './data.model';
import { Observable, delay, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

 GetData() : Observable<DataModel[]>
 {
  return of(this.datas).pipe(

    delay(1000)
  )
 }

 Add(parameter:DataModel)
 {
  let maxId= this.datas.length + 1
  parameter.ID = maxId
  parameter.ISACTIVE=true
  parameter.INSERTDATE = new Date()
  this.datas.unshift(parameter)
 }

 Update(parameter:DataModel)
 {

   let current = this.datas.findIndex(x=>x.ID==parameter.ID)

   this.datas[current] = JSON.parse(JSON.stringify(parameter))

 }

 Delete(parameter:DataModel)
 {
  // let current = this.datas.findIndex(x=>x.ID==parameter.ID)
  // parameter.ISACTIVE=false
  // this.datas[current] = JSON.parse(JSON.stringify(parameter))
  this.datas = this.datas.filter(x=> x.ID !=parameter.ID)
 }

  private datas:Array<DataModel>=
  [
    {
      ID:1,
      STOKKODU:"STOKKODU 1",
      STOKADI:"STOKADI 1",
      GRUPKODU:"GRUPKODU 1",
      RAPORKODU:"RAPORKODU 1",
      BIRIM:"BIRIM 1",
      DOVIZTIPIALIS:1,
      DOVIZALISFIYAT:1,
      DOVIZTIPISATIS:1,
      DOVIZSATISFIYAT:1,
      URUNTURU : "URUNTURU 1",
      RECETE_NO : "RECETE_NO 1",
      ROTA_NO:"ROTA_NO 1",
      URETIMSURESI:1,
      ASGARI_STOK:1,
      AZAMI_STOK:1,
      TEDARIK_SURESI:1,
      INSERTDATE:new Date(),
      NOZEL1:1,
      SOZEL1:"SOZEL 1",
      ISACTIVE:true
    },
    {
      ID:2,
      STOKKODU:"STOKKODU 2",
      STOKADI:"STOKADI 2",
      GRUPKODU:"GRUPKODU 2",
      RAPORKODU:"RAPORKODU 2",
      BIRIM:"BIRIM 2",
      DOVIZTIPIALIS:2,
      DOVIZALISFIYAT:2,
      DOVIZTIPISATIS:2,
      DOVIZSATISFIYAT:2,
      URUNTURU : "URUNTURU 2",
      RECETE_NO : "RECETE_NO 2",
      ROTA_NO:"ROTA_NO 2",
      URETIMSURESI:2,
      ASGARI_STOK:2,
      AZAMI_STOK:2,
      TEDARIK_SURESI:2,
      INSERTDATE:new Date(),
      NOZEL1:2,
      SOZEL1:"SOZEL 2",
      ISACTIVE:true
    },
    {
      ID:3,
      STOKKODU:"STOKKODU 3",
      STOKADI:"STOKADI 3",
      GRUPKODU:"GRUPKODU 3",
      RAPORKODU:"RAPORKODU 3",
      BIRIM:"BIRIM 3",
      DOVIZTIPIALIS:3,
      DOVIZALISFIYAT:3,
      DOVIZTIPISATIS:3,
      DOVIZSATISFIYAT:3,
      URUNTURU : "URUNTURU 3",
      RECETE_NO : "RECETE_NO 3",
      ROTA_NO:"ROTA_NO 3",
      URETIMSURESI:3,
      ASGARI_STOK:3,
      AZAMI_STOK:3,
      TEDARIK_SURESI:3,
      INSERTDATE:new Date(),
      NOZEL1:3,
      SOZEL1:"SOZEL 3",
      ISACTIVE:true
    },
    {
      ID:4,
      STOKKODU:"STOKKODU 4",
      STOKADI:"STOKADI 4",
      GRUPKODU:"GRUPKODU 4",
      RAPORKODU:"RAPORKODU 4",
      BIRIM:"BIRIM 4",
      DOVIZTIPIALIS:4,
      DOVIZALISFIYAT:4,
      DOVIZTIPISATIS:4,
      DOVIZSATISFIYAT:4,
      URUNTURU : "URUNTURU 4",
      RECETE_NO : "RECETE_NO 4",
      ROTA_NO:"ROTA_NO 4",
      URETIMSURESI:4,
      ASGARI_STOK:4,
      AZAMI_STOK:4,
      TEDARIK_SURESI:4,
      INSERTDATE:new Date(),
      NOZEL1:4,
      SOZEL1:"SOZEL 4",
      ISACTIVE:true
    },
    {
      ID:5,
      STOKKODU:"STOKKODU 5",
      STOKADI:"STOKADI 5",
      GRUPKODU:"GRUPKODU 5",
      RAPORKODU:"RAPORKODU 5",
      BIRIM:"BIRIM 5",
      DOVIZTIPIALIS:5,
      DOVIZALISFIYAT:5,
      DOVIZTIPISATIS:5,
      DOVIZSATISFIYAT:5,
      URUNTURU : "URUNTURU 5",
      RECETE_NO : "RECETE_NO 5",
      ROTA_NO:"ROTA_NO 5",
      URETIMSURESI:5,
      ASGARI_STOK:5,
      AZAMI_STOK:5,
      TEDARIK_SURESI:5,
      INSERTDATE:new Date(),
      NOZEL1:5,
      SOZEL1:"SOZEL 5",
      ISACTIVE:true
    },
    {
      ID:6,
      STOKKODU:"STOKKODU 6",
      STOKADI:"STOKADI 6",
      GRUPKODU:"GRUPKODU 6",
      RAPORKODU:"RAPORKODU 61",
      BIRIM:"BIRIM 6",
      DOVIZTIPIALIS:6,
      DOVIZALISFIYAT:6,
      DOVIZTIPISATIS:6,
      DOVIZSATISFIYAT:6,
      URUNTURU : "URUNTURU 6",
      RECETE_NO : "RECETE_NO 6",
      ROTA_NO:"ROTA_NO 6",
      URETIMSURESI:6,
      ASGARI_STOK:6,
      AZAMI_STOK:6,
      TEDARIK_SURESI:6,
      INSERTDATE:new Date(),
      NOZEL1:6,
      SOZEL1:"SOZEL 6",
      ISACTIVE:true
    },
    {
      ID:7,
      STOKKODU:"STOKKODU 7",
      STOKADI:"STOKADI 7",
      GRUPKODU:"GRUPKODU 7",
      RAPORKODU:"RAPORKODU 7",
      BIRIM:"BIRIM 7",
      DOVIZTIPIALIS:7,
      DOVIZALISFIYAT:7,
      DOVIZTIPISATIS:7,
      DOVIZSATISFIYAT:7,
      URUNTURU : "URUNTURU 7",
      RECETE_NO : "RECETE_NO 7",
      ROTA_NO:"ROTA_NO 7",
      URETIMSURESI:7,
      ASGARI_STOK:7,
      AZAMI_STOK:7,
      TEDARIK_SURESI:7,
      INSERTDATE:new Date(),
      NOZEL1:7,
      SOZEL1:"SOZEL 7",
      ISACTIVE:true
    },
    {
      ID:8,
      STOKKODU:"STOKKODU 8",
      STOKADI:"STOKADI 8",
      GRUPKODU:"GRUPKODU 8",
      RAPORKODU:"RAPORKODU 8",
      BIRIM:"BIRIM 8",
      DOVIZTIPIALIS:8,
      DOVIZALISFIYAT:8,
      DOVIZTIPISATIS:8,
      DOVIZSATISFIYAT:8,
      URUNTURU : "URUNTURU 8",
      RECETE_NO : "RECETE_NO 8",
      ROTA_NO:"ROTA_NO 8",
      URETIMSURESI:8,
      ASGARI_STOK:8,
      AZAMI_STOK:8,
      TEDARIK_SURESI:8,
      INSERTDATE:new Date(),
      NOZEL1:8,
      SOZEL1:"SOZEL 8",
      ISACTIVE:true
    },
    {
      ID:9,
      STOKKODU:"STOKKODU 9",
      STOKADI:"STOKADI 9",
      GRUPKODU:"GRUPKODU 9",
      RAPORKODU:"RAPORKODU 9",
      BIRIM:"BIRIM 9",
      DOVIZTIPIALIS:9,
      DOVIZALISFIYAT:9,
      DOVIZTIPISATIS:9,
      DOVIZSATISFIYAT:9,
      URUNTURU : "URUNTURU 9",
      RECETE_NO : "RECETE_NO 9",
      ROTA_NO:"ROTA_NO 9",
      URETIMSURESI:9,
      ASGARI_STOK:9,
      AZAMI_STOK:9,
      TEDARIK_SURESI:9,
      INSERTDATE:new Date(),
      NOZEL1:9,
      SOZEL1:"SOZEL 9",
      ISACTIVE:true
    },
    {
      ID:10,
      STOKKODU:"STOKKODU 10",
      STOKADI:"STOKADI 10",
      GRUPKODU:"GRUPKODU 10",
      RAPORKODU:"RAPORKODU 10",
      BIRIM:"BIRIM 10",
      DOVIZTIPIALIS:10,
      DOVIZALISFIYAT:10,
      DOVIZTIPISATIS:10,
      DOVIZSATISFIYAT:10,
      URUNTURU : "URUNTURU 10",
      RECETE_NO : "RECETE_NO 10",
      ROTA_NO:"ROTA_NO 10",
      URETIMSURESI:10,
      ASGARI_STOK:10,
      AZAMI_STOK:10,
      TEDARIK_SURESI:10,
      INSERTDATE:new Date(),
      NOZEL1:10,
      SOZEL1:"SOZEL 10",
      ISACTIVE:true
    },
    {
        ID:11,
        STOKKODU:"STOKKODU 11",
        STOKADI:"STOKADI 11",
        GRUPKODU:"GRUPKODU 11",
        RAPORKODU:"RAPORKODU 11",
        BIRIM:"BIRIM 11",
        DOVIZTIPIALIS:11,
        DOVIZALISFIYAT:11,
        DOVIZTIPISATIS:11,
        DOVIZSATISFIYAT:11,
        URUNTURU : "URUNTURU 11",
        RECETE_NO : "RECETE_NO 11",
        ROTA_NO:"ROTA_NO 11",
        URETIMSURESI:11,
        ASGARI_STOK:11,
        AZAMI_STOK:11,
        TEDARIK_SURESI:11,
        INSERTDATE:new Date(),
        NOZEL1:11,
        SOZEL1:"SOZEL 11",
        ISACTIVE:true
      }
  ]


  public gurupKodlari :Array<dropModel>=
  [
    {name:'grup 1',code:'group 1'},
    {name:'grup 2',code:'group 2'},
    {name:'grup 3',code:'group 2'},
    {name:'grup 4',code:'group 3'},
    {name:'grup 5',code:'group 4'},
  ]

  public raporKodlari :Array<dropModel>=
  [
    {name:'rapor 1',code:'rapor 1'},
    {name:'rapor 2',code:'rapor 2'},
    {name:'rapor 3',code:'rapor 2'},
    {name:'rapor 4',code:'rapor 3'},
    {name:'rapor 5',code:'rapor 4'},
  ]

  public birimler :Array<dropModel>=
  [
    {name:'birim 1',code:'birim 1'},
    {name:'birim 2',code:'birim 2'},
    {name:'birim 3',code:'birim 2'},
    {name:'birim 4',code:'birim 3'},
    {name:'birim 5',code:'birim 4'},
  ]

  public urunTurler :Array<dropModel>=
  [
    {name:'Hammadde',code:'Hammadde'},
    {name:'Yarı Mamul',code:'Yarı Mamul'},
    {name:'Mamul',code:'Mamul'},

  ]

  public receteler :Array<dropModel>=
  [
    {name:'recete 1',code:'recete 1'},
    {name:'recete 2',code:'recete 2'},
    {name:'recete 3',code:'recete 2'},
    {name:'recete 4',code:'recete 3'},
    {name:'recete 5',code:'recete 4'},
  ]

  public rotalar :Array<dropModel>=
  [
    {name:'rota 1',code:'rota 1'},
    {name:'rota 2',code:'rota 2'},
    {name:'rota 3',code:'rota 2'},
    {name:'rota 4',code:'rota 3'},
    {name:'rota 5',code:'rota 4'},
  ]

  public stateOptions: any[] = [
    { label: 'Aktif', value: true },
    { label: 'Pasif', value: false },
];
}

export class dropModel
{
  name:string
  code:any
}