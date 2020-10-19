import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import {TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

import { AuthenticateBackendProvider,ErrorInterceptor} from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent,DialogContent  } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DepartmentComponent } from './department/department.component';
import { EmployeeComponent } from './employee/employee.component';
import { MessagesComponent } from './messages/messages.component';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataEmployeeService } from './InMemory-data/InMemoryDataemployee.service';
import { SelfserviceComponent } from './selfservice/selfservice.component';
import {CardModule} from 'primeng/card';
import {MatDialogModule} from '@angular/material/dialog';
//import{ DemoMaterialModule } from './home/material-module';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DepartmentComponent,
    EmployeeComponent,
    MessagesComponent,
    SelfserviceComponent,
    DialogContent
    //DemoMaterialModule
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataEmployeeService, { dataEncapsulation: false }
    // )
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TableModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
    CardModule,
    MatDialogModule
    ],
    entryComponents: [HomeComponent, DialogContent],
    //declarations: [HomeComponent, DialogContent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthenticateBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }