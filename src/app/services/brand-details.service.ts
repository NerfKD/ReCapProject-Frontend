import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandDetailsService {
  apiUrl = 'https://localhost:44306/api/brands/';

  constructor(private httpClient: HttpClient) {}

  getBrandDetailByBrandId(id: number): Observable<SingleResponseModel<Brand>> {
    let newPath = this.apiUrl+ "getbyid?id=" + id;
    return this.httpClient.get<SingleResponseModel<Brand>>(newPath);
  }

  update(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "update" ,brand)
  }
}
