import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customers: any[] = [];
  customerForm: FormGroup;
  customerPhoto: string = '';
  editIndex: number | null = null;

  constructor(private fb: FormBuilder, private dialog:MatDialog) {
    this.customerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      registrationDate: ['', Validators.required],
      customerType: ['', Validators.required],
      photo: ['']
    });
  }

  ngOnInit(): void {
    const storedCustomers = localStorage.getItem('customers');
    if (storedCustomers) {
      this.customers = JSON.parse(storedCustomers);
    }
  }

 
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.customerPhoto = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  editCustomer(i: number): void {
    const customerToEdit = this.customers[i];
  
    const dialogRef = this.dialog.open(EditComponent, {
      width: '600px',
      data: customerToEdit
    });
  
    dialogRef.afterClosed().subscribe(updatedData => {
      if (updatedData) {
        console.log("Updated customer data:", updatedData);
     
        this.customers[i] = updatedData;
  
       
        localStorage.setItem('customers', JSON.stringify(this.customers));
      }
    });
  }
  
  
  // Add New Customer
  addCustomer() {
    if (this.customerForm.invalid) return;

    const newCustomer = {
      ...this.customerForm.value,
      photo: this.customerPhoto
    };

    this.customers.push(newCustomer);
    localStorage.setItem('customers', JSON.stringify(this.customers));
    this.customerForm.reset(); // Reset form
    this.customerPhoto = '';  // Clear photo
  }


  // Delete Customer
  deleteCustomer(index: number) {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customers.splice(index, 1);
      localStorage.setItem('customers', JSON.stringify(this.customers));
    }
  }

  
  resetForm() {
    this.customerForm.reset();
    this.customerPhoto = '';
    this.editIndex = null;
  }
}
