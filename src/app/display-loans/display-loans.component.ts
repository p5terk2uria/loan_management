import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-loans',
  templateUrl: './display-loans.component.html',
  styleUrls: ['./display-loans.component.scss']
})
export class DisplayLoansComponent implements OnInit {
  loans: any[] = [];
  loanSchedules: any[] = [];
  selectedSchedule: any[] = [];

  ngOnInit() {
    this.loadLoans();
  }

  loadLoans() {
    this.loans = JSON.parse(localStorage.getItem('loans') || '[]');
    this.loanSchedules = JSON.parse(localStorage.getItem('loanSchedules') || '[]');
  }

  displaySchedule(event: Event) {
    const target = event.target as HTMLSelectElement;
    const loanIndex = +target.value;
    this.selectedSchedule = this.loanSchedules[loanIndex]?.schedule || [];
  }
  
}
