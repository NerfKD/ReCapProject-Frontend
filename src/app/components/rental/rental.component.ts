import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RentalDto } from 'src/app/models/rentalDto';
import { RentalService } from 'src/app/services/rental.service';

import { CarDetailsService } from 'src/app/services/car-details.service';
import { Car } from 'src/app/models/car';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  rentals: RentalDto[] = [];
  carDetail: Car | null;
  dtBegin: Date | null = null;
  dtEnd: Date | null = null;

  minDate: string | any;
  firstDateSelected: boolean = false;

  constructor(
    private rentalService: RentalService,
    private carDetailsService: CarDetailsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getRentalsById();
        this.getCarDetailsById();
      }
    });
  }

  onChangeEvent(event: any) {
    this.minDate = event.target.value;
    this.firstDateSelected = true;
  }

  getRentalsById() {
    this.rentalService
      .getRentalsById(this.activatedRoute.snapshot.params['id'])
      .subscribe((response) => {
        this.rentals = response.data;
      });
  }
  getCarDetailsById() {
    this.carDetailsService
      .getCarDetailByCarId(this.activatedRoute.snapshot.params['id'])
      .subscribe((response) => {
        this.carDetail = response.data;
      });
  }

  checkDateAndGoToPayment() {
    let NewRental: RentalDto = {
      carId: Number(this.activatedRoute.snapshot.params['id']),
      customerId: 1,
      carName: this.carDetail.brandName,
      fullName: 'Kerim Dinçer',
      rentDate: this.dtBegin,
      returnDate: this.dtEnd,
    };
    localStorage.setItem("rental",JSON.stringify(NewRental))

    console.log(this.dtBegin);
    console.log(this.dtEnd);
    if (this.dtBegin != null && this.dtEnd != null) {
      console.log(this.dtBegin);
      console.log(this.dtEnd);
      this.rentalService.rentalDateCheck(NewRental).subscribe((response) => {
        console.log(response);
        if (response.success) {
          console.log(response);
          this.router.navigate(['./payment/'+ this.activatedRoute.snapshot.params['id']]);
        } 
      }, (error) =>{
        this.toastrService.error(error.error.message,'Kiralama başarısız' );
      });
    } else {
      this.toastrService.error("Tarih alanı boş olamaz.",'Tarih Hatası');
    }
    this.DodatesNull();
  }

  goToCars() {
    this.router.navigate(['./cars']);
  }

  DodatesNull(){
    this.dtBegin = null;
    this.dtEnd = null;
    this.firstDateSelected = false;
  }
}
