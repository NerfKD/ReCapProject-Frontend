import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailsService {
  apiUrl = 'https://localhost:44306/api/cars/getcarbyid?id=';
  constructor(private httpClient:HttpClient) { }

  getCarDetailByCarId(id:number):Observable<SingleResponseModel<Car>>{
    let newPath = this.apiUrl + id;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }
}
