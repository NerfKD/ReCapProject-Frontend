import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandDetailsComponent } from './components/brand-details/brand-details.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarSetComponent } from './components/car-set/car-set.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorDetailsComponent } from './components/color-details/color-details.component';
import { ColorComponent } from './components/color/color.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CarComponent,
  },
  {
    path: 'cars',
    component: CarComponent,
  },
  {
    path: 'cardetail/:id',
    component: CarDetailsComponent,
  },
  {
    path: 'caradd',
    component: CarAddComponent,
  },
  {
    path: 'carset/:id',
    component: CarSetComponent,
  },
  {
    path: 'cars/color/:colorId',
    component: CarComponent,
  },
  {
    path: 'cars/brand/:brandId',
    component: CarComponent,
  },
  {
    path: 'brands',
    component: BrandComponent,
  },
  {
    path: 'branddetail/:id',
    component: BrandDetailsComponent,
  },
  {
    path: 'brandadd',
    component: BrandAddComponent,
  },
  
  {
    path: 'colors',
    component: ColorComponent,
  },
  {
    path: 'colordetail/:id',
    component: ColorDetailsComponent,
  },
  {
    path: 'coloradd',
    component: ColorAddComponent,
  },
  
  {
    path: 'carrental/:id',
    component: RentalComponent,
  },
  {
    path: 'payment/:id',
    component: PaymentComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register', 
    component: RegisterComponent,
  },
  {
    path: 'profile', 
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
