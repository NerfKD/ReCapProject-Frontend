import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  filterText:string;
  constructor(private brandService: BrandService, private router: Router,) {}

  ngOnInit(): void {
    this.getBrands();
  }

  goToDetail(brandId: number) {
    this.router.navigate(['./branddetail', brandId]);
  }

  goToAdd(){
    this.router.navigate(['./brandadd']);
  }


  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

}
