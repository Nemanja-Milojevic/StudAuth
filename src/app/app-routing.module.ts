import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { AuthGuard } from './auth.guard';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: 'index', 
    component: ListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add', 
    component: AddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit', 
    component: EditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login', 
    component: LoginComponent
  },
  {
    path: '**', 
    redirectTo: 'login', 
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
