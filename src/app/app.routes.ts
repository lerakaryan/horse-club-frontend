import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HorseListComponent } from './components/horses/horse-list.component';
import { HorseFormComponent } from './components/horses/horse-form.component';
import { HorseDetailComponent } from './components/horses/horse-detail.component';
import { AuthGuard } from '../app/services/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'horses', component: HorseListComponent },
  { path: 'horses/new', component: HorseFormComponent },
  { path: 'horses/:id', component: HorseDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
