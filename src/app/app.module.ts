import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CustomersComponent } from './customers/customers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog';
import { AddComponent } from './add/add.component';
import { LoanManagementComponent } from './loan-management/loan-management.component';
import { DisplayLoansComponent } from './display-loans/display-loans.component';
import { PaymentComponent } from './payment/payment.component';
import { EditComponent } from './edit/edit.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CustomersComponent,
    AddComponent,
    LoanManagementComponent,
    DisplayLoansComponent,
    PaymentComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    FormsModule,
  HttpClientModule, 
  MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
