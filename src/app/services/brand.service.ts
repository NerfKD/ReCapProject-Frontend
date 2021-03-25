import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  apiUrl = 'https://localhost:44306/api/brands/getall';
  constructor(private httpCLient: HttpClient) {}

  getBrands(): Observable<ListResponseModel<Brand>> {
    return this.httpCLient.get<ListResponseModel<Brand>>(this.apiUrl);
  }
}
