import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  loans: any[] = [];
  loanSchedules: any[] = [];
  installments: any[] = [];
  paymentHistory: any[] = [];

  selectedLoanIndex: number | null = null;
  selectedInstallment: number | null = null;

  paymentAmount: number | null = null;
  paymentDate: string = '';

  ngOnInit(): void {
    this.loadData();
  }

  // Load data from LocalStorage
  loadData() {
    this.loans = JSON.parse(localStorage.getItem('loans') || '[]');
    this.loanSchedules = JSON.parse(localStorage.getItem('loanSchedules') || '[]');
    this.paymentHistory = JSON.parse(localStorage.getItem('payments') || '[]');
  }

  // Load installments for the selected loan
  loadInstallments(event: Event) {
    const index = +(event.target as HTMLSelectElement).value;
    this.selectedLoanIndex = index;

    if (this.loanSchedules[index]) {
      this.installments = this.loanSchedules[index].schedule.map((installment: any) => ({
        ...installment,
        status: installment.status || 'Pending' // Default status if not set
      }));
    }
  }

  // Mark installment as 'Paid' and update localStorage
  makePayment() {
    if (
      this.selectedLoanIndex === null || 
      this.selectedInstallment === null || 
      !this.paymentAmount || 
      !this.paymentDate
    ) {
      alert('Please fill all payment details.');
      return;
    }

    const loanSchedule = this.loanSchedules[this.selectedLoanIndex];

    // Use '==' instead of '===' for number matching
    const installment = loanSchedule.schedule.find(
      (inst: any) => inst.installmentNumber == this.selectedInstallment
    );

    console.log('Selected Installment:', installment);

    if (installment && installment.status !== 'Paid') {
      installment.status = 'Paid';

      const paymentRecord = {
        loanId: loanSchedule.loanId,
        installmentNumber: this.selectedInstallment,
        amount: this.paymentAmount,
        date: this.paymentDate
      };

      this.paymentHistory.push(paymentRecord);

      // Update localStorage
      localStorage.setItem('loanSchedules', JSON.stringify(this.loanSchedules));
      localStorage.setItem('payments', JSON.stringify(this.paymentHistory));

      alert('Payment Successful! ');

      // Clear form
      this.paymentAmount = null;
      this.paymentDate = '';
      this.selectedInstallment = null;
    } else {
      alert('Installment already paid or invalid.');
    }
  }
}