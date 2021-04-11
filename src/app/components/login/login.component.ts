import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {}

  user:User;

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      let loginModel = Object.assign({}, this.loginForm.value);
      this.getUserByEmail(loginModel.email);
      this.authService.login(loginModel).subscribe((response) => {
        this.toastrService.success(response.message,"Başarılı")
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("expiration",response.data.expiration)
        this.router.navigate(['/cars']);
        
      },(responseError)=>{
            this.toastrService.error(responseError.error,"Başarısız")
      });
    }
  }

  getUserByEmail(email: string) {
    this.userService.getUserByMail(email).subscribe((response) => {
      this.user = response.data;
      this.localStorageService.setCurrentUser(this.user);
    });
  }
}
