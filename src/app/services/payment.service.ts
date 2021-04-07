import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentWithCreditCard } from '../models/rentWithCreditCard';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = 'https://localhost:44306/api/rentals/';
  constructor(private httpClient: HttpClient) { }

  rentalAdd(rentalPayment:RentWithCreditCard): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'payment',rentalPayment
      );
  }

}
