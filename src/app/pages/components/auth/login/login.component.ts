import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { CurrentUser } from 'src/app/core/models/current-user';
import { CurrentUserService } from 'src/app/core/services/current-user.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl:'./login.component.css' 
})
export class LoginComponent {

    valCheck: string[] = ['remember'];
    loginSuccess:boolean=false;
    password!: string;

    constructor(public layoutService: LayoutService) { }

    router:Router = inject(Router)
    formGroup= new FormGroup({
      userName : new FormControl("",[Validators.required]),
      password : new FormControl("",[Validators.required]),
    });


    currentUserService:CurrentUserService = inject(CurrentUserService)
   async loginBtnClick()
    {
         ;
      if(this.formGroup.valid)
      {
        const a = (this.formGroup.get("userName")?.value) ?  (this.formGroup.get("userName")?.value)  : ''
        const obj:CurrentUser = new CurrentUser()
        obj.userName = a !=undefined ? a : ""
        this.currentUserService.Set(obj)
    
        this.loginSuccess=true;
         this.changeImage();

      }
    }
  
  
     async changeImage() {
      const imageContainer = document.querySelector('.image-container');
       ;
      await imageContainer?.classList.add('changed');
      setTimeout(() => {
        this.router.navigateByUrl('')
      }, 2200);
   
  }
  
}
