import { AfterViewInit, Directive, ElementRef, Input, OnInit } from '@angular/core';



@Directive({
  selector: '[appMechaTable]',
  standalone: true
})
export class appMechaTable implements AfterViewInit {

  table:HTMLElement|undefined = undefined
  constructor(private elementRef: ElementRef) {
   
  }

  @Input() public set fontSize(data:number)
  {
    if(data && this.table)
      {
        this.table.style.fontSize = `${data}rem`
      }
  }

  ngAfterViewInit(): void {
     this.table = (this.elementRef.nativeElement as HTMLElement).querySelector('.p-datatable') as HTMLElement
     this.table.style.fontSize = `${this.fontSize}rem`
     //this.table.style.backgroundColor="red"
  }

}


// p-datatable-header ng-star-inserted

//p-datatable-gridlines p-datatable p-component p-datatable-hoverable-rows