import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiResponseError } from '../models/api-response-error';

@Injectable({providedIn:'root'})
export class MessageService {

  constructor() { }

  private isPageSplit$:Subject<boolean> = new Subject()

  getIsPageSplit():Observable<boolean>
  {
    return this.isPageSplit$.asObservable()
  }

  setIsPageSplit(data:boolean)
  {
    this.isPageSplit$.next(data)
  }



}
