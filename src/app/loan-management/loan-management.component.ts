import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-loan-management',
  templateUrl: './loan-management.component.html',
  styleUrls: ['./loan-management.component.scss'],
})
export class LoanManagementComponent implements OnInit {
  loanForm: FormGroup;
  customers: any[] = [];
  loans: any[] = [];

  constructor(private fb: FormBuilder) {
    this.loanForm = this.fb.group({
      customer: '',
      loanType: '',
      amount: '',
      interest: '',
      duration: ''
    });
  }

  ngOnInit(): void {
    this.customers = JSON.parse(localStorage.getItem('customers') || '[]');
    this.loans = JSON.parse(localStorage.getItem('loans') || '[]');
  }

  applyLoan() {
    const newLoan = {
      id: this.loans.length + 1,
      ...this.loanForm.value
    };

    // Prevent Duplicate Loan Application for the Same Customer and Loan Type
    const existingLoan = this.loans.find(
      (loan) => 
        loan.customer === newLoan.customer && 
        loan.loanType === newLoan.loanType
    );

    

    // Add New Loan
    this.loans.push(newLoan);
    localStorage.setItem('loans', JSON.stringify(this.loans));

    // Generate Loan Schedule
    this.generateLoanSchedule(newLoan);

    // Reset Form
    this.loanForm.reset();
  }

  generateLoanSchedule(loan: any) {
    const schedules = JSON.parse(localStorage.getItem('loanSchedules') || '[]');
    const monthlyInstallment = this.calculateEMI(+loan.amount, +loan.interest, +loan.duration);

    const schedule = [];
    for (let i = 1; i <= loan.duration; i++) {
      const dueDate = new Date();
      dueDate.setMonth(dueDate.getMonth() + i);

      schedule.push({
        installmentNumber: i,
        dueDate: dueDate.toISOString().split('T')[0],
        amount: monthlyInstallment,
        status: 'Pending'
      });
    }

    schedules.push({ loanId: loan.id, schedule });
    localStorage.setItem('loanSchedules', JSON.stringify(schedules));
  }

  calculateEMI(principal: number, rate: number, months: number): number {
    const monthlyRate = rate / 100 / 12;
    return (
      (principal * monthlyRate) / 
      (1 - Math.pow(1 + monthlyRate, -months))
    );
  }
}
