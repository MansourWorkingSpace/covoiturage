import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
})
export class InscriptionComponent {
  profileForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    telephone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    adress: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
  });

  constructor( private router: Router) {}

  OnSubmit() {
    if (this.profileForm.valid) {
      SharedService.users.push({
        id: SharedService.nb_users,
        username: this.profileForm.value.username,
        name: this.profileForm.value.name,
        telephone: this.profileForm.value.telephone,
        email: this.profileForm.value.email,
        password: this.profileForm.value.password,
        adress: this.profileForm.value.adress,
        age: this.profileForm.value.age,
      });
      SharedService.current_user_id=SharedService.nb_users;
      SharedService.nb_users++;
      SharedService.connected = true;
      this.router.navigate(['/profil']);
    }
  }
}
