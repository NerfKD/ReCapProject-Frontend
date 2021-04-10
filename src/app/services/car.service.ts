import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDto } from '../models/carDto';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44306/api/cars/';
  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<CarDto>> {
    let newPath = this.apiUrl + 'getcars'
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDto>>{
    let newPath = this.apiUrl + 'getbybrand?brandId=' + brandId;
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<CarDto>>{
    let newPath = this.apiUrl + 'getbycolor?colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }

  getCarByCarId(carId:number):Observable<SingleResponseModel<CarDto>>{
    let newPath = this.apiUrl + 'getbyid?id=' + carId;
    return this.httpClient.get<SingleResponseModel<CarDto>>(newPath);
  }

  add(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath ,car)
  }

}
