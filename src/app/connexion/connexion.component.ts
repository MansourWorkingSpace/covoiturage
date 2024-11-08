import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css',
})
export class ConnexionComponent {
  email: string = '';
  password: string = '';

  onSubmit() {
    // Handle the login logic here (e.g., call an authentication service)
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }
  

  
}
