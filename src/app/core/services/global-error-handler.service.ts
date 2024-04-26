import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector, inject} from '@angular/core';
import { ApiResponseError } from '../models/api-response-error';
import { ToastrService } from 'ngx-toastr';




@Injectable()
export class GlobalErrorHandlerService {

  handleError(error: Error): void {
    
   
    if(error instanceof ApiResponseError)
    {
    
    }
    else if(error instanceof Error)
    {
      console.log(`%c ${error}`, 'background: red; color: white,padding:10px;font-size:20px');
    }

    if(error instanceof HttpErrorResponse)
    {
      switch (error.status) {
        case 404:
          this.statusCode404(error)
          break;
      
        default:
          break;
      }
    }
  }


  private statusCode404(error:HttpErrorResponse)
  {
    
  }

  private deneme()
  {
   
  }
}
