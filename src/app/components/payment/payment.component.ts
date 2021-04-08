import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { RentalDto } from 'src/app/models/rentalDto';
import { RentWithCreditCard } from 'src/app/models/rentWithCreditCard';
import { CarService } from 'src/app/services/car.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  rental: RentalDto | null;
  car: Car | null = null;
  cardHoldersName: string | null = null;
  cardNumber: string | null = null;
  cardExpirationMonth: number | null = null;
  cardExpirationYear: number | null = null;
  cardCvcNumber: number | null = null;
  totalPrice: number = 0;
  totalDay: number = 0;
  totalTime: number = 0;
  kontrolDegeri: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private carService: CarService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getRentalToLocalStorage();
        this.getCarById();
      }
    });
  }

  getRentalToLocalStorage() {
    this.rental = JSON.parse(localStorage.getItem('rental'));
  }

  getCarById() {
    this.carService
      .getCarByCarId(this.activatedRoute.snapshot.params['id'])
      .subscribe((response) => {
        this.car = response.data;
        this.calcTotalPrice();
      });
  }

  calcTotalPrice() {
    let price: number = this.car.dailyPrice;
    this.totalTime =
      new Date(this.rental.returnDate).getTime() -
      new Date(this.rental.rentDate).getTime();

    this.totalDay = Math.round(this.totalTime / (1000 * 3600 * 24));
    if (this.totalPrice > 0) {
      this.totalPrice = this.totalDay * price;
    } else {
      this.totalPrice = 1 * price;
    }
  }

  paymentRent() {
    this.kontrolDegeri = 0;
    this.cardHoldersNameValidationCheck();
    this.cardNumberValidationCheck();
    this.cardExpirationMonthValidationCheck();
    this.cardExpirationYearValidationCheck();
    this.cardCvcNumberValidationCheck();

    if (this.kontrolDegeri > 0) {
      this.toastrService.error('Eksik bilgiler mevcut.', 'Yanlış Veri');
    } else {
      let payment: RentWithCreditCard = {
        rental: this.rental,
        cardHoldersName: this.cardHoldersName,
        cardNumber: this.cardNumber,
        cardExpirationMonth: Number(this.cardExpirationMonth),
        cardExpirationYear: Number(this.cardExpirationYear),
        cardCvcNumber: Number((this.cardCvcNumber)),
        totalPrice: Number(this.totalPrice),
      };
      this.paymentService.rentalAdd(payment).subscribe(
        (response) => {
          if (response.success) {
            this.toastrService.success(response.message, 'Ödeme tamamlandı');
            this.router.navigate([
              './carrental',
              this.activatedRoute.snapshot.params['id'],
            ]);
          }
        },
        (error) => {
          this.toastrService.error(error.error.message, 'Ödeme Hatası');
        }
      );
    }
  }

  cardHoldersNameValidationCheck() {
    if (this.cardHoldersName) {
      if (this.cardHoldersName.match(/[a-zA-Z]/)) {
        document.getElementById('validationTooltip01').className =
          'form-control is-valid';
        return 0;
      }
    }
    document.getElementById('validationTooltip01').className =
      'form-control is-invalid';
    this.kontrolDegeri += 1;
    return 1;
  }

  cardNumberValidationCheck() {
    if (this.cardNumber) {
      if (this.cardNumber.match(/^\d{16,16}$/)) {
        document.getElementById('validationTooltip02').className =
          'form-control is-valid';
        return 0;
      }
    }
    document.getElementById('validationTooltip02').className =
      'form-control is-invalid';
    this.kontrolDegeri += 1;
    return 1;
  }

  cardExpirationMonthValidationCheck() {
    if (this.cardExpirationMonth && this.cardExpirationYear) {
      if (
        String(this.cardExpirationMonth).match(/^\d{2,2}$/) &&
        (this.cardExpirationYear > new Date().getFullYear() ||
          (this.cardExpirationYear == new Date().getFullYear() &&
            this.cardExpirationMonth > new Date().getMonth()))
      ) {
        document.getElementById('validationTooltip03').className =
          'form-control is-valid';
        return 0;
      }
    }
    document.getElementById('validationTooltip03').className =
      'form-control is-invalid';
    this.kontrolDegeri += 1;
    return 1;
  }

  cardExpirationYearValidationCheck() {
    if (
      this.cardExpirationYear &&
      this.cardExpirationYear >= new Date().getFullYear()
    ) {
      if (String(this.cardExpirationYear).match(/^\d{4,4}$/)) {
        document.getElementById('validationTooltip04').className =
          'form-control is-valid';
        return 0;
      }
    }
    document.getElementById('validationTooltip04').className =
      'form-control is-invalid';
    this.kontrolDegeri += 1;
    return 1;
  }

  cardCvcNumberValidationCheck() {
    if (this.cardCvcNumber) {
      if (String(this.cardCvcNumber).match(/^\d{3,3}$/)) {
        document.getElementById('validationTooltip05').className =
          'form-control is-valid';
        return 0;
      }
    }
    document.getElementById('validationTooltip05').className =
      'form-control is-invalid';
    this.kontrolDegeri += 1;
    return 1;
  }
}
