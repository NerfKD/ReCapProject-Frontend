import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RentalDto } from 'src/app/models/rentalDto';
import { RentWithCreditCard } from 'src/app/models/rentWithCreditCard';
import { PaymentService } from 'src/app/services/payment.service';
import { CardModule } from 'ngx-card/ngx-card';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  payment: RentWithCreditCard | null;
  rental: RentalDto | null;
  cardForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private paymentService: PaymentService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getRentalToLocalStorage();
      }
    });

    this.cardForm = this.fb.group({
      cardno: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      expDate: ['', Validators.required],
      cvvNo: ['', Validators.required]

    });

  }

  onSubmit(){
    console.log(this.cardForm.value)
  }

  getRentalToLocalStorage() {
    this.rental = JSON.parse(localStorage.getItem("rental"))
    console.log(this.rental);
  }

}
