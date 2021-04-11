import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'https://localhost:44306/api/auth/';

  constructor(private httpClient:HttpClient) { }

  login(loginModel:Login):Observable<SingleResponseModel<Token>>{
    return this.httpClient.post<SingleResponseModel<Token>>(this.apiUrl+"login",loginModel)
  }

  register(registerModel:Register):Observable<SingleResponseModel<Token>>{
    return this.httpClient.post<SingleResponseModel<Token>>(this.apiUrl+"register",registerModel)
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }
}
