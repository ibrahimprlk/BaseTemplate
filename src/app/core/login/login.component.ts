import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrentUserService } from '../services/current-user.service';
import { CurrentUser } from '../models/current-user';

@Component({
  selector: 'mecha-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

 router:Router = inject(Router)
  formGroup= new FormGroup({
    userName : new FormControl("",[Validators.required]),
    password : new FormControl("",[Validators.required]),
  });
  public backgroundImageUrl='../../../assets/images/geleneksel1.jpg';
  public yeni= '../../../assets/images/teknolojik1.jpg'

  currentUserService:CurrentUserService = inject(CurrentUserService)
  loginBtnClick()
  {
    if(this.formGroup.valid)
    {
      const a = (this.formGroup.get("userName")?.value) ?  (this.formGroup.get("userName")?.value)  : ''
      const obj:CurrentUser = new CurrentUser()
      obj.userName = a !=undefined ? a : ""
      this.currentUserService.Set(obj)
      // this.router.navigateByUrl('')
      this.changeImage();
     
      // const username = this.formGroup.get("userName")?.value
      // if(username)
      //   localStorage.setItem("user",username)
      //   this.router.navigateByUrl('')
    }
  }


   changeImage() {
    const imageContainer = document.querySelector('.image-container');
     ;
    imageContainer?.classList.add('changed');
}
}
