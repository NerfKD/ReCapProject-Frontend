import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarDto } from 'src/app/models/carDto';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarDetailsService } from 'src/app/services/car-details.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-set',
  templateUrl: './car-set.component.html',
  styleUrls: ['./car-set.component.css']
})
export class CarSetComponent implements OnInit {

  constructor( 
    private carService: CarService,
    private carDetailService: CarDetailsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private brandService: BrandService,
    private colorService: ColorService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService) 
    { }
    car: CarDto;
    brands: Brand[] = [];
    colors: Color[] = [];
    carSetForm: FormGroup;
    id:number;
    brandId:number;
    colorId:number;
    modelYear:number;
    dailyPrice:number;
    description:string;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getCarDetailByCarId();
        this.getBrands();
        this.getColors();
        this.createCarAddForm();
      }
    });
  }

  getCarDetailByCarId() {
    this.carDetailService
      .getCarDetailByCarId(this.activatedRoute.snapshot.params['id'])
      .subscribe((response) => {
        this.car = response.data;
        this.id = this.car.id
        this.brandId= this.car.brandId
        this.colorId = this.car.colorId
        this.modelYear = this.car.modelYear
        this.dailyPrice = this.car.dailyPrice
        this.description = this.car.description
      });
  }
  createCarAddForm(){
    this.carSetForm = this.formBuilder.group({
      id:["",Validators.required],
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required]

    });
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  update(){
    if (this.carSetForm.valid) {
      let carModel = Object.assign({}, this.carSetForm.value);
      this.carDetailService.update(carModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        this.goToCarDetail();
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
  goToCarDetail() {
    this.router.navigate(['./cardetail', this.activatedRoute.snapshot.params['id']]);
  }
}
