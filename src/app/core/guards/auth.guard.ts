import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CurrentUserService } from '../services/current-user.service';

export const authGuard: CanActivateFn =(route, state) => {

  const router:Router = inject(Router)

  const service:CurrentUserService = inject(CurrentUserService)

  var currentUser = service.GetCurrentUser()
 
  if(currentUser)
  {
    return true
  }
  else
  {
     
    router.navigateByUrl("auth/login")
    return false
  }
};
