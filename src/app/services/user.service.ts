import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'https://localhost:44306/api/users/';
  constructor(private httpClient:HttpClient) { }

  getUserByMail(mail:string):Observable<SingleResponseModel<User>>{
    return this.httpClient.get<SingleResponseModel<User>>(this.apiUrl+"getbymail?email=" + mail)
  }

  update(userModel:User):Observable<ResponseModel>{
    let newPath = this.apiUrl + 'update';
    return this.httpClient.post<ResponseModel>(newPath ,userModel)
  }

  updatePassword(userModel:User, password:string):Observable<ResponseModel>{
    let newPath = this.apiUrl + 'updatepassword';
    return this.httpClient.post<ResponseModel>(newPath,{userModel,password})
  }
}
