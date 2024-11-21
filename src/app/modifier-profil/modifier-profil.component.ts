import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormsModule,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-modifier-profil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './modifier-profil.component.html',
  styleUrl: './modifier-profil.component.css',
})
export class ModifierProfilComponent {
  current_user: any = SharedService.users[SharedService.current_user_id];
  profileForm = new FormGroup({
    username: new FormControl(this.current_user.username, [
      Validators.required,
    ]),
    name: new FormControl(this.current_user.name, [Validators.required]),
    telephone: new FormControl(this.current_user.telephone, [
      Validators.required,
    ]),
    email: new FormControl(this.current_user.email, [
      Validators.required,
      Validators.email,
    ]),
    adress: new FormControl(this.current_user.adress, [Validators.required]),
    age: new FormControl(this.current_user.age, [Validators.required]),
    password: new FormControl(this.current_user.password, [
      Validators.required,
    ]),
  });
  constructor(private router: Router) {}
  OnSubmit() {
    if (this.profileForm.valid) {
      SharedService.users[SharedService.current_user_id]={
        id: SharedService.nb_users,
        username: this.profileForm.value.username,
        name: this.profileForm.value.name,
        telephone: this.profileForm.value.telephone,
        email: this.profileForm.value.email,
        password: this.profileForm.value.password,
        adress: this.profileForm.value.adress,
        age: this.profileForm.value.age,
      }
      this.router.navigate(['/profil']);
    }
  }
}
