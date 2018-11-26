import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { AuthGuard } from './auth.guard';
import { EditComponent } from './edit/edit.component';
import { ClassComponent } from './class/class.component';
import { AddclassComponent } from './addclass/addclass.component';
import { StudentsComponent } from './students/students.component';

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
    path: 'class', 
    component: ClassComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addclass', 
    component: AddclassComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'students', 
    component: StudentsComponent,
    canActivate: [AuthGuard]
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
