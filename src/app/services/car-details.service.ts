import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDto } from '../models/carDto';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailsService {
  apiUrl = 'https://localhost:44306/api/cars/';
  constructor(private httpClient:HttpClient) { }

  getCarDetailByCarId(id:number):Observable<SingleResponseModel<CarDto>>{
    let newPath = this.apiUrl +"getcarbyid?id=" + id;
    return this.httpClient.get<SingleResponseModel<CarDto>>(newPath);
  }

  update(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "update" ,car)
  }
}
