import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css'],
})
export class CarImageComponent implements OnInit {
  carImages: CarImage[] | null;
  constructor(
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]) {
      this.getImageByCarId();
      }
    })
  }
  getImageByCarId() {
    this.carImageService.getImageByCarId(this.activatedRoute.snapshot.params["carId"]).subscribe((response) => {
      this.carImages = response.data;
    });
  }
  goToCars(){
    this.router.navigate(['./cars'])
  }
}
