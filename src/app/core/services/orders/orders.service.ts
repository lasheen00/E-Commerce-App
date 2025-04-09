import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor() { }
  private readonly httpClient = inject(HttpClient);
  myToken = localStorage.getItem('userToken')

  checkoutpayment(id:string , data:object):Observable<any>{

    return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      {
        "shippingAddress": data,
      }
    )
  }

}
