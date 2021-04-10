import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorDetailsService {
  apiUrl = 'https://localhost:44306/api/colors/';
  constructor(private httpClient: HttpClient) { }

  getColorDetailByColorId(id: number): Observable<SingleResponseModel<Color>> {
    let newPath = this.apiUrl+ "getbyid?id=" + id;
    return this.httpClient.get<SingleResponseModel<Color>>(newPath);
  }

  update(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "update" ,color)
  }
}
