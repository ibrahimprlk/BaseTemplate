import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CurrentUserService } from '../services/current-user.service';
import { CurrentUser } from '../models/current-user';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'mecha-user-info',
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent  implements OnInit{
 
  unSubscription:Subject<boolean> = new Subject();
  currentUserService :CurrentUserService = inject(CurrentUserService)
  currentUser:CurrentUser | undefined = undefined

  


  ngOnInit(): void {
    this.getCurrentUser()
  }
  // ngOnDestroy(): void {
  //   this.unSubscription.next(true)
  //   this.unSubscription.complete()
  // }



  getCurrentUser()
  {
    this.currentUserService.Get().pipe(takeUntil(this.unSubscription)).subscribe(response=>{
      this.currentUser = response
    })
  }
}
