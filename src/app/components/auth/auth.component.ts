import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  isAuth() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.localStorageService.removeToken();
    this.localStorageService.removeCurrentUser();
    this.toastrService.success('Çıkış yapıldı', 'Başarılı');

    return this.router.navigate(['/login']);
  }

  getCurrentUser(): User {
    return this.localStorageService.getCurrentUser();
  }
}