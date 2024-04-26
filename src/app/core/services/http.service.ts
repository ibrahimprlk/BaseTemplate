
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy, inject } from '@angular/core';
import { Observable, Subject, map, takeUntil, tap } from 'rxjs';
import {  InternalApiResponse } from '../models/iternal-api-response';


import { ToastrService } from 'ngx-toastr';
import { HttpRequestModel } from '../models/http-request-model';



@Injectable({providedIn:'root'})
export class HttpService  implements OnDestroy{

  http:HttpClient = inject(HttpClient)
  toastr:ToastrService = inject(ToastrService)
  
  
  constructor() { }
  
  private unSubcription:Subject<boolean> = new Subject()
  
  ngOnDestroy(): void {
    this.unSubcription.next(true);
    this.unSubcription.complete();
  }

  Get<T>(parameter:HttpRequestModel) : Observable<InternalApiResponse<T>> 
  {
    return this.createRequest<T>('GET',parameter.url,parameter.body,parameter.params,parameter.headers,parameter.responseType,parameter.isResponseShow);
  }

  Post<T>(parameter:HttpRequestModel): Observable<InternalApiResponse<T>> 
  {
    return this.createRequest<T>('POST', parameter.url,parameter.body,parameter.params,parameter.headers,parameter.responseType,parameter.isResponseShow);
  }

  Put<T>(parameter:HttpRequestModel): Observable<InternalApiResponse<T>> 
  {
    return this.createRequest<T>('PUT', parameter.url,parameter.body,parameter.params,parameter.headers,parameter.responseType,parameter.isResponseShow);
  }

  Delete<T>(parameter:HttpRequestModel): Observable<InternalApiResponse<T>> 
  {
    return this.createRequest<T>('DELETE', parameter.url,parameter.body,parameter.params,parameter.headers,parameter.responseType,parameter.isResponseShow);
  }

  private createRequest<T>(
    method: string, 
    url: string, 
    body?: any, 
    params?: HttpParams, 
    headers?: HttpHeaders, 
    responseType?: 'json' | 'arraybuffer' | 'blob' | 'text' | undefined,
    isResponseShow?:boolean
    ): Observable<InternalApiResponse<T>> {
    const options = {
      body,
      params,
      headers,
      responseType
    };

    return this.http.request(method, url, options).pipe(
      tap(response=>{
        if(isResponseShow)
        {
            this.showMessage(response)
        }
      })
    )
     
  }

  private showMessage<T>(parameter:InternalApiResponse<T>)
  {
    if(!parameter.success && parameter.message)
    {
       this.createResponseMessage(parameter.message).forEach(message=>{
        this.toastr.warning(message,"Uyarı !!!")
       })
       return
    }
    
    if(parameter.success && parameter.message)
    {
       this.createResponseMessage(parameter.message).forEach(message=>{
        this.toastr.success(message,"Bilgi !!!")
       })

       return
    }
  }
  private createResponseMessage(parameter:string):string[]
  {
    const messages:string[] = parameter.split(";")
   
    return messages
  }

}
