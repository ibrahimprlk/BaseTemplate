import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appTableAction]'
})
export class TableActionDirective {

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
    
    let elem = this.elementRef.nativeElement as HTMLElement
    if(elem)
      {
        while (elem) {
          if (!elem.classList.contains('p-datatable')) {
            elem = elem.parentElement as HTMLElement; 
          } else {
            break;
          }
        }
        this.table =elem
        this.table.style.fontSize = `${this.fontSize}rem`

      }


    
   
  }

}
