import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HaircareComponent } from './haircare/haircare.component';
import { AuthGuard } from './auth.guard';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path:'haircare', component:HaircareComponent},
    { path: 'login', component: LoginComponent },
    {path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] }, 
];
