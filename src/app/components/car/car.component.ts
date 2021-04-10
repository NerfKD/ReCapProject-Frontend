import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { CarDto } from 'src/app/models/carDto';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: CarDto[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];
  selectedBrandId: number = 0;
  selectedColorId: number = 0;

  filterText: string;
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private brandService: BrandService,
    private colorService: ColorService,
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else {
        this.getCars();
      }
    });
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCarsByBrand(brandId: number) {
    if (brandId == 0) {
      this.getCars();
    } else {
      this.carService.getCarsByBrand(brandId).subscribe((response) => {
        this.cars = response.data;
      });
    }
  }

  getCarsByColor(colorId: number) {
    if (colorId == 0) {
      this.getCars();
    } else {
      this.carService.getCarsByColor(colorId).subscribe((response) => {
        this.cars = response.data;
      });
    }
  }

  goToAdd(){
    this.router.navigate(['./caradd']);
  }
  goToDetail(carId: number) {
    this.router.navigate(['./cardetail', carId]);
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
}
