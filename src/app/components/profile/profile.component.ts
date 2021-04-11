import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private userService:UserService
  ) { }

  profileForm: FormGroup;
  user:User;
  id:number;
  firstName:string;
  lastName:string;
  email:string;

  ngOnInit(): void {
    this.createProfileForm();
    this.getUser();
  }
  createProfileForm(){
    this.profileForm = this.formBuilder.group({
      id:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
    });
  }
  getUser(){
    this.user = this.localStorageService.getCurrentUser();
    this.id= this.user.id;
    this.firstName=this.user.firstName;
    this.lastName = this.user.lastName;
    this.email = this.user.email;
  }

  update(){
    if (this.profileForm.valid) {
      let profileModel = Object.assign({}, this.profileForm.value + this.user.passwordHash + this.user.passwordSalt + this.user.Status);

      console.log(profileModel)
      this.userService.update(profileModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
      },
      (responseError)=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası")
          }
        }
      });
    } else {
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }
  goToCars() {
    this.router.navigate(['./cars']);
  }

  passwordUpdate(){

  }

}
