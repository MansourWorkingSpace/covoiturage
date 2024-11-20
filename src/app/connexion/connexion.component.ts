import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-connexion',
  standalone: true,
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
})
export class ConnexionComponent {
  profileForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private router: Router) {}

  OnSubmit() {
    let found = false;

    // Loop through SharedService.users to check credentials
    for (let i = 0; i < SharedService.users.length; i++) {
      const user = SharedService.users[i];
      if (
        this.profileForm.value.email === user.email &&
        this.profileForm.value.password === user.password
      ) {
        SharedService.current_user_id = i; // Store the current user's ID
        found = true;
        break;
      }
    }

    if (found) {
      // If credentials are correct, navigate to the profile page
      SharedService.connected = true;
      this.router.navigate(['/profil']);
    } else {
      // Show an error message if credentials are invalid
      alert('Email ou mot de passe incorrect.');
    }
  }
}
