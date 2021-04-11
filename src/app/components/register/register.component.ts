import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {}

  registerForm: FormGroup;
  user:User;


  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required]
    });
  }

  register(){
    console.log(this.registerForm.value)
    if (this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value);
      this.authService.register(registerModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("expiration",response.data.expiration)
        this.getUserByEmail(registerModel.email);
        this.goToCars();
      },
      (responseError)=>{
        if(responseError.error.Errors){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası")
          }
        }
        else{
          this.toastrService.error(responseError.error.Message,"Kayıt hatası")
        }
      });
    } else {
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }
  goToCars(){
    this.router.navigate(['./cars'])
  }

  getUserByEmail(email: string) {
    this.userService.getUserByMail(email).subscribe((response) => {
      this.user = response.data;
      this.localStorageService.setCurrentUser(this.user);
    });
  }
}
