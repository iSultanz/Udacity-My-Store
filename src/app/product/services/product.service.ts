import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { Product } from '../../../types/product';

@Injectable({
  providedIn: 'root',
})
export class ProductServices {
  constructor(private http: HttpClient) {}
  private productUrl: string = 'assets/api/data.json';

  getProducts(): Observable<Product[]> { 
    return this.http.get<Product[]>(this.productUrl).pipe(
      tap((data) => console.log('All: ', JSON.stringify(data)))
    )
  }
}
