import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDto } from 'src/app/models/carDto';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailsService } from 'src/app/services/car-details.service';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  carDetail: CarDto | null;
  carImages: CarImage[] = [];
  carName: string;
  carModel: number;
  carPrice: number;
  carDesc: string;
  carColor: string;

  apiUrl: string = 'https://localhost:44306';
  constructor(
    private carDetailsService: CarDetailsService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getCarDetailByCarId();
        this.getImageByCarId();
        
      }
    });
  }

  getCarDetailByCarId() {
    this.carDetailsService
      .getCarDetailByCarId(this.activatedRoute.snapshot.params['id'])
      .subscribe((response) => {
        this.carDetail = response.data;
        this.carName = this.carDetail.brandName;
        this.carModel = this.carDetail.modelYear;
        this.carPrice = this.carDetail.dailyPrice;
        this.carDesc = this.carDetail.description;
        this.carColor = this.carDetail.colorName;
      });
  }

  getImageByCarId() {
    this.carImageService
      .getImageByCarId(this.activatedRoute.snapshot.params['id'])
      .subscribe((response) => {
        this.carImages = response.data;
      });
  }

  goToCars(){
    this.router.navigate(['./cars'])
  }

  goToCarRental() {
    this.router.navigate(['./carrental', this.activatedRoute.snapshot.params['id']]);
  }

  goToSet(){
    this.router.navigate(['./carset', this.activatedRoute.snapshot.params['id']])
  }
}
