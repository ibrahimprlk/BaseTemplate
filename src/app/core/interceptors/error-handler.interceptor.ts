import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => { 
  
  const toastr:ToastrService = inject(ToastrService)
  return next(req)
        .pipe(catchError((err:HttpErrorResponse)=>{
          
          //TODO : geliştirilecek
          toastr.error(err.message,err.name,{
            timeOut:1500
          })
          return throwError(()=>err)
        }));
 
};
