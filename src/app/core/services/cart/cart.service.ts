import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
  private readonly httpClient = inject(HttpClient);
  myToken =localStorage.getItem('userToken');
  cartNumber:BehaviorSubject<number> = new BehaviorSubject(0);

  addProductToCart(id:string ):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/cart` ,
      {
        "productId": id
      }
    )
  }

  getLogddedUserCart():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/cart`
    )
  }

  removeSpecificCartItem(id:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`
    )
  }

  updateProductQuantity(id:string , newCount:number):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
        "count": newCount
      }
    )
  }

  clearCart():Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart`
    )
  }

}
