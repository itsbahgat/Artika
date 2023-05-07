import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  name: string;
  email: string;
  message: string;

  composeEmail() {
    const body = `Name: ${this.name}\nEmail: ${this.email}\nMessage: ${this.message}`;
    const mailtoLink = `mailto:akreview22@gmail.com?subject=Contact Form Submission&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  }
}
