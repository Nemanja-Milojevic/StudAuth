import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NbThemeModule, NbLayoutModule, NbInputModule, NbButtonModule, NbCardModule, NbListModule, NbToastrModule, NbSidebarModule, NbMenuModule } from '@nebular/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { ListService } from './list.service';
import { AddComponent } from './add/add.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { EditComponent } from './edit/edit.component';
import { ClassComponent } from './class/class.component';
import { AddclassComponent } from './addclass/addclass.component';
import { StudentsComponent } from './students/students.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListComponent,
    AddComponent,
    EditComponent,
    ClassComponent,
    AddclassComponent,
    StudentsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbInputModule,
    NbButtonModule,
    NbCardModule,
    NbListModule,
    NbToastrModule.forRoot(),
    BrowserAnimationsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
  ],
  providers: [ListService, AuthService, AuthGuard, 
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
