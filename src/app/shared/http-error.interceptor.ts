import{
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';

export class HttpErrorInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': '*',
            },
        });
        return next.handle(req)
        .pipe(
            retry(1),
            catchError((error: HttpErrorResponse)=>{
                let errorMessage='';
                if (error.error instanceof ErrorEvent){
                    errorMessage=`error: ${error.error.message}` }
                    else{
                        errorMessage= `Error code: ${error.status}\n Message: ${error.message}`;
                    }
                    window.alert(errorMessage);
                    return throwError(()=> {return errorMessage});
            })
        )
    }
}