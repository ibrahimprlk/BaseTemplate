import { Injectable, inject } from '@angular/core';
import { CurrentUser } from '../models/current-user';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
 
  private router:Router = inject(Router)
 
  private currentUser$:BehaviorSubject<CurrentUser|undefined> = new BehaviorSubject<CurrentUser|undefined>(undefined)

 
  Set(parameter:CurrentUser|undefined)
  {
     ;
    this.currentUser$.next(parameter); 
    if(!parameter){
      localStorage.removeItem("currentUser")
    }
    else{
       ;
      localStorage.setItem("currentUser",JSON.stringify(parameter))
    }
  }

  Get()
  {
    return this.currentUser$.asObservable()
  }

  LogOut()
  {
    this.currentUser$.next(undefined)
    localStorage.removeItem("currentUser")
    this.router.navigateByUrl("auth/login")
  }

  Read()
  {    
   const storUser = localStorage.getItem("currentUser");
    ;
   if(!storUser)
   {
    this.currentUser$.next(undefined)
   }
   else
   {
    const _user:CurrentUser = JSON.parse(storUser)
     this.currentUser$.next(_user)
   }
  }

  GetCurrentUser():CurrentUser | undefined
  {     
    return this.currentUser$.value
  }
}
