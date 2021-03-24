import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarResponseModel } from '../models/carResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44306/api/cars/getcars';
  constructor(private httpCLient: HttpClient) {}

  getCars(): Observable<CarResponseModel> {
    return this.httpCLient.get<CarResponseModel>(this.apiUrl);
  }
}
