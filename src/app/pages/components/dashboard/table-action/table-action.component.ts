import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-table-action',
  templateUrl: './table-action.component.html',
  styleUrl: './table-action.component.scss'
})
export class TableActionComponent {

  fontSize:number = 1;
  changeSize:number=0.2;

  @Output() click:EventEmitter<{clickedBtn:string}> = new EventEmitter()
  incremetTableFontSize()
  {
    this.fontSize +=this.changeSize;
  }
  decrementTableFontSize()
  {
    this.fontSize -=this.changeSize;
  }

  itemClick(event:any,selectedBtnName:string)
  {
    this.click.emit({clickedBtn:selectedBtnName})
  }

}
