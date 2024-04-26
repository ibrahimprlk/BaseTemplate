import { HttpHeaders, HttpParams } from "@angular/common/http";

export class HttpRequestModel
{
    method?: string=undefined
    url: string=""
    body?: any=undefined
    params?: HttpParams 
    headers?: HttpHeaders 
    responseType?: 'json' | 'arraybuffer' | 'blob' | 'text' | undefined
    isResponseShow:boolean = false

    constructor(data:
        {    method?: string,
        url: string,
        body?: any,
        params?: HttpParams ,
        headers?: HttpHeaders ,
        responseType?: 'json' | 'arraybuffer' | 'blob' | 'text' | undefined,
        isResponseShow?:boolean
        }) { 
            this.method = data.method,
            this.url = data.url,
            this.body=data.body,
            this.params=data.params,
            this.headers = data.headers,
            this.responseType = data.responseType
            this.isResponseShow = data.isResponseShow ?? false
        }
}