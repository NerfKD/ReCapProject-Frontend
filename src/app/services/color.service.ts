import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  apiUrl = 'https://localhost:44306/api/colors/getall';
  constructor(private httpCLient: HttpClient) {}

  getColors(): Observable<ListResponseModel<Color>> {
    return this.httpCLient.get<ListResponseModel<Color>>(this.apiUrl);
  }
}
