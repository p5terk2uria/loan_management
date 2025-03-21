import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddComponent } from './add/add.component';
import { CustomersComponent } from './customers/customers.component';
import { LoanManagementComponent } from './loan-management/loan-management.component';
import { DisplayLoansComponent } from './display-loans/display-loans.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, children: [
      { path: 'customers', component: CustomersComponent },
      { path: 'customers/add', component: AddComponent },
      { path: 'loans', component: LoanManagementComponent },
      {path:'display',component:DisplayLoansComponent},
      {path:'payment',component: PaymentComponent}

    ]
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
