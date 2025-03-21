import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayLoansComponent } from './display-loans.component';

describe('DisplayLoansComponent', () => {
  let component: DisplayLoansComponent;
  let fixture: ComponentFixture<DisplayLoansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayLoansComponent]
    });
    fixture = TestBed.createComponent(DisplayLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
