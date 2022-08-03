import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  // post request to the express server

  // this will pass the stripeToken from the payment component file to the server

  makePayment(stripeToken: any, amount: number): Observable<any> {
    const url = "http://localhost:5000/checkout/"


    return this.http.post<any>(url, { token: stripeToken, amount: amount })
  }
}
