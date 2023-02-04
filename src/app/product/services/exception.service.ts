import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ExceptionServices {
    constructor() {}
     handleError(err: HttpErrorResponse){
        let errorMessage=  '';
        if(err.error instanceof ErrorEvent){
            errorMessage = `An error occurred: ${err.error.message}`;
        }else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`; 
        }
        console.error(errorMessage);
        return throwError(()=> errorMessage)
    }
}