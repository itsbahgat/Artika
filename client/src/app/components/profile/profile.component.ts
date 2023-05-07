import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../pages/services/authuser.service'; // Replace 'path-to-auth-service' with the actual path to your AuthService

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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Get user properties using AuthService
    this.firstName = this.authService.getProperty('firstName') || 'N/A';
    this.lastName = this.authService.getProperty('lastName') || 'N/A';
    this.email = this.authService.getProperty('email') || 'N/A';
    this.username = this.authService.getProperty('username') || 'N/A';
    this.role = this.authService.getProperty('role') || 'N/A';
    this.address = this.authService.getProperty('address') || 'N/A';
    this.phone = this.authService.getProperty('phone') || 'N/A';
  }

  updateProfile(): void {
    // Perform profile update logic here
    // For example, send an HTTP request to update the user's profile
  }
}
