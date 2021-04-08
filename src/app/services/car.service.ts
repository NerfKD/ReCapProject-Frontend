import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44306/api/';
  constructor(private httpCLient: HttpClient) {}

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getcars'
    return this.httpCLient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + 'cars/getbybrand?brandId=' + brandId;
    return this.httpCLient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + 'cars/getbycolor?colorId=' + colorId;
    return this.httpCLient.get<ListResponseModel<Car>>(newPath);
  }

  getCarByCarId(carId:number):Observable<SingleResponseModel<Car>>{
    let newPath = this.apiUrl + 'cars/getbyid?id=' + carId;
    return this.httpCLient.get<SingleResponseModel<Car>>(newPath);
  }

}
