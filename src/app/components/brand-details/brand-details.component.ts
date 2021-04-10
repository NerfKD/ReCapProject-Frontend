import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandDetailsService } from 'src/app/services/brand-details.service';

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.css'],
})
export class BrandDetailsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private brandDetailsService: BrandDetailsService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  brandDetail: Brand;
  brandForm: FormGroup;
  brandId:number;
  brandName:string;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getBrandDetailByBrandId();
        this.createBrandForm();
      }
    });
  }

  getBrandDetailByBrandId() {
    this.brandDetailsService
      .getBrandDetailByBrandId(this.activatedRoute.snapshot.params['id'])
      .subscribe((response) => {
        this.brandDetail = response.data;
        this.brandId= this.brandDetail.brandId
        this.brandName = this.brandDetail.brandName
      });
  }
  createBrandForm(){
    this.brandForm = this.formBuilder.group({
      brandId:[Validators.required],
      brandName:[Validators.required]
    });
  }

  update(){
    if (this.brandForm.valid) {
      let brandModel = Object.assign({}, this.brandForm.value);
      this.brandDetailsService.update(brandModel).subscribe(response=>{
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

  goToBrands(){
    this.router.navigate(['./brands'])
  }
  
}
