import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDto } from '../models/rentalDto';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:44306/api/rentals/';
  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<ListResponseModel<RentalDto>> {
    return this.httpClient.get<ListResponseModel<RentalDto>>(
      this.apiUrl + 'getrentals'
    );
  }

  getRentalsById(carId:number): Observable<ListResponseModel<RentalDto>> {
    return this.httpClient.get<ListResponseModel<RentalDto>>(
      this.apiUrl + 'getallbycarid?carId=' + carId
    );
  }

  rentalAdd(rental:RentalDto): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'add',rental
      );
  }

  rentalDateCheck(rental:RentalDto): Observable<ResponseModel> {
    console.log(rental);
    return this.httpClient.post<ResponseModel>(
      this.apiUrl +'checkrentaldate',rental
    );

    }
}
