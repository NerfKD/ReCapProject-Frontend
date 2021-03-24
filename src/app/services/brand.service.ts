import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrandResponseModel } from '../models/brandResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl= "https://localhost:44306/api/brands/getall"
  constructor(private httpCLient:HttpClient) { }

  getBrands():Observable<BrandResponseModel>{
    return this.httpCLient.get<BrandResponseModel>(this.apiUrl);
  }
}