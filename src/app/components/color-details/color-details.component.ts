import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorDetailsService } from 'src/app/services/color-details.service';

@Component({
  selector: 'app-color-details',
  templateUrl: './color-details.component.html',
  styleUrls: ['./color-details.component.css']
})
export class ColorDetailsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private colorDetailsService: ColorDetailsService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) { }

  colorDetail: Color;
  colorForm: FormGroup;
  colorId:number;
  colorName:string;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getColorDetailByColorId();
        this.createColorForm();
      }
    });
  }

  getColorDetailByColorId() {
    this.colorDetailsService
      .getColorDetailByColorId(this.activatedRoute.snapshot.params['id'])
      .subscribe((response) => {
        this.colorDetail = response.data;
        this.colorId= this.colorDetail.colorId
        this.colorName = this.colorDetail.colorName
      });
  }
  createColorForm(){
    this.colorForm = this.formBuilder.group({
      colorId:[Validators.required],
      colorName:[Validators.required]
    });
  }

  update(){
    if (this.colorForm.valid) {
      let colorModel = Object.assign({}, this.colorForm.value);
      this.colorDetailsService.update(colorModel).subscribe(response=>{
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

  goToColors(){
    this.router.navigate(['./colors'])
  }
}
