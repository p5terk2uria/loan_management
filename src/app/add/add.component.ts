import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  customerForm!: FormGroup;
  customers: any[] = [];
  customerPhoto: string = '';

  constructor(private fb: FormBuilder, private ref:MatDialogRef<AddComponent>) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      fullName: ['',[Validators.required]],
      email: ['',[Validators.required]],
      phone: ['',[Validators.required]],
      registrationDate: ['',[Validators.required]],
      customerType: ['Regular'],
      photo: ['',[Validators.required]]
    });
    this.loadCustomers();
  }

  addCustomer() {
    const newCustomer = {
      ...this.customerForm.value,
      photo: this.customerPhoto
    };

    this.customers.push(newCustomer);
    localStorage.setItem('customers', JSON.stringify(this.customers));
    this.customerForm.reset(); // Clear the form
    this.customerPhoto = ''; // Reset the photo
    alert('added successfuly')
    this.ref.close()
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.customerPhoto = e.target.result; // Convert to Base64
      };
      reader.readAsDataURL(file);
    }
  }

  loadCustomers() {
    const storedCustomers = localStorage.getItem('customers');
    if (storedCustomers) {
      this.customers = JSON.parse(storedCustomers);
    }
  }
  onclose(){
    this.ref.close()
  }
}
