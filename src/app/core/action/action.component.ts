import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from '../services/current-user.service';

@Component({
  selector: 'mecha-action',
  standalone: true,
  imports: [],
  templateUrl: './action.component.html',
  styleUrl: './action.component.css'
})
export class ActionComponent {

  router:Router = inject(Router)
  currentUserService:CurrentUserService = inject(CurrentUserService)
  
  itemClick()
  {
    // localStorage.removeItem("user")
    // this.router.navigateByUrl("login")
    this.currentUserService.LogOut();

  }
}
