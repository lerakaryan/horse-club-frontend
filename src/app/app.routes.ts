import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HorseListComponent } from './components/horses/horse-list.component';
import { HorseFormComponent } from './components/horses/horse-form.component';
import { HorseDetailComponent } from './components/horses/horse-detail.component';
import { AuthGuard } from '../app/services/auth.guard';
import { ClientFormComponent } from './components/clients/client-form.component';
import { ClientListComponent } from './components/clients/client-list.component';
import { ClientDetailComponent } from './components/clients/client-detail.component';
import { InstructorListComponent } from './components/instructors/instructor-list.component';
import { InstructorFormComponent } from './components/instructors/instructor-form.component';
import { InstructorDetailComponent } from './components/instructors/instructor-detail.component';
import { TrainingListComponent } from './components/trainings/training-list.component';
import { TrainingFormComponent } from './components/trainings/training-form.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'horses', component: HorseListComponent },
  { path: 'horses/new', component: HorseFormComponent },
  { path: 'horses/:id', component: HorseDetailComponent },
  { path: 'clients', component: ClientListComponent },
  { path: 'clients/new', component: ClientFormComponent },
  { path: 'clients/:id', component: ClientDetailComponent },
  { path: 'instructors', component: InstructorListComponent },
  { path: 'instructors/new', component: InstructorFormComponent },
  { path: 'instructors/:id', component: InstructorDetailComponent },
  { path: 'trainings', component: TrainingListComponent },
  { path: 'trainings/new', component: TrainingFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
