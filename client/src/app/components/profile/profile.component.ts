import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../pages/services/authuser.service';
import { CustomerService } from '../../pages/services/customer.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: string;
  address: string;
  phone: string;
  avatar: string;

  isEditMode: boolean = false; // Indicates whether the user is in edit mode


  constructor(private authService: AuthService, private customerService : CustomerService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    // Get user properties using AuthService
    this.firstName = this.authService.getProperty('firstName') || 'N/A';
    this.lastName = this.authService.getProperty('lastName') || 'N/A';
    this.email = this.authService.getProperty('email') || 'N/A';
    this.username = this.authService.getProperty('username') || 'N/A';
    this.role = this.authService.getProperty('role') || 'N/A';
    this.address = this.authService.getProperty('address') || 'N/A';
    this.phone = this.authService.getProperty('phone') || 'N/A';
    this.avatar = this.authService.getProperty('avatar') || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

    console.log ("first name",this.firstName);
    console.log("avatar",this.avatar);
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    this.cdr.detectChanges();
  }


  updateProfile() {
    if (this.isEditMode) {
      this.toggleEditMode();
  
      const emailInput = document.querySelector('#emailInput') as HTMLInputElement;
      const phoneInput = document.querySelector('#phoneInput') as HTMLInputElement;
      const addressInput = document.querySelector('#addressInput') as HTMLInputElement;
  
      const updatedEmail = emailInput.value || this.email;
      const updatedPhone = phoneInput.value || this.phone;
      const updatedAddress = addressInput.value || this.address;
  
      // Check if the values have changed before calling the update
      if (updatedEmail !== this.email || updatedPhone !== this.phone || updatedAddress !== this.address) {
        this.updateCustomerData(updatedEmail, updatedPhone, updatedAddress);
      }
    } else {
      this.toggleEditMode();
    }
  }
  

updateCustomerData(updatedEmail: string, updatedPhone: string, updatedAddress: string) {
  // Create an object with the updated customer data
  const updatedCustomerData = {
    email: updatedEmail,
    phone: updatedPhone,
    address: updatedAddress
  };

  // Call the updateCustomer service method and pass the customer ID and updated data
  this.customerService.updateCustomer(this.authService.getProperty("_id"), updatedCustomerData)
    .subscribe(
      response => {
        // Handle the successful response from the service if needed
        console.log('Customer updated successfully:', response);
      },
      error => {
        // Handle any errors that occurred during the update process
        console.error('Error updating customer:', error);
      }
    );
}

  
  
  
}
