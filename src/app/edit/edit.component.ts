import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  customerForm: FormGroup;
  customerPhoto: string = '';

  constructor(
    private ref:MatDialogRef<EditComponent>,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public customerData: any // Inject the passed data
  ) {
    this.customerForm = this.fb.group({
      fullName: '',
      email: '',
      phone: '',
      registrationDate: '',
      customerType: '',
      photo: ''
    });
  }

  ngOnInit(): void {
    if (this.customerData) {
      // Populate the form with customer data
      this.customerForm.patchValue({
        fullName: this.customerData.fullName,
        email: this.customerData.email,
        phone: this.customerData.phone,
        registrationDate: this.customerData.registrationDate,
        customerType: this.customerData.customerType,
        photo: this.customerData.photo
      });

      
      this.customerPhoto = this.customerData.photo || '';
    }
  }

  // Handle photo selection
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.customerPhoto = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  updateCustomer(): void {
    console.log("Updating customer data with:", this.customerForm.value);
    const updatedData = {
      ...this.customerForm.value,
      photo: this.customerPhoto || this.customerData.photo
    
    };
   alert('customer details updated successfuly')
    this.dialogRef.close(updatedData); 
  }
  

  onclose(){
    this.ref.close()
  }
}
