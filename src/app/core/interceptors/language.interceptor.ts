import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';


export const languageInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService)
  const lang = storageService.getLocalStorage("currentLanguage") ?? '' ;
  
    const langReq = req.clone({
     headers: req.headers.set('language', lang)
   });

  return next(langReq);

};
