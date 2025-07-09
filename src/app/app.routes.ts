import { Routes } from '@angular/router';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { LoginComponent } from './auth/login/login.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
  // { path: '', component: AppComponent},
  {path: '', component: LoginComponent},
  { path:'register', component: RegisterComponent},
  { path: 'list', component: TaskListComponent },
  { path: 'create', component: TaskFormComponent },
  // { path: 'edit/:id', component: TaskFormComponent},
  { path: '**', redirectTo:'' }
];
