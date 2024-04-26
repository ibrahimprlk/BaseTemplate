import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';


@Component({
  selector: 'mecha-base',
  standalone: true,
  imports: [],
  template: '',
  styles: ''
})
export class BaseComponent implements OnDestroy {
  
  unSubscription:Subject<boolean> = new Subject()
  
  ngOnDestroy(): void {
    this.unSubscription.next(true)
    this.unSubscription.complete()
  }

}
