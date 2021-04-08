import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RentalDto } from 'src/app/models/rentalDto';
import { RentWithCreditCard } from 'src/app/models/rentWithCreditCard';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  payment: RentWithCreditCard | null;
  rental: RentalDto | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getRentalToLocalStorage();
      }
    });

  }

  getRentalToLocalStorage() {
    this.rental = JSON.parse(localStorage.getItem("rental"))
    console.log(this.rental);
  }


}
