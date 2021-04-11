import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  tokenKey: string = 'token';
  currentUser: string = 'currentUser';

  constructor() { }

  setToken(tokenValue: Token) {
    localStorage.setItem(this.tokenKey, JSON.stringify(tokenValue));
  }

  getToken(): Token {
    return JSON.parse(localStorage.getItem(this.tokenKey));
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  setCurrentUser(currentUserValue: User) {
    localStorage.setItem(this.currentUser, JSON.stringify(currentUserValue));
  }

  getCurrentUser(): User {
    return JSON.parse(localStorage.getItem(this.currentUser));
  }

  removeCurrentUser() {
    localStorage.removeItem(this.currentUser);
  }
}