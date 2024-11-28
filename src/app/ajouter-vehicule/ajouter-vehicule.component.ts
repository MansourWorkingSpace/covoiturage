import { Component } from '@angular/core';
import {  FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-ajouter-vehicule',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ajouter-vehicule.component.html',
  styleUrl: './ajouter-vehicule.component.css',
})
export class AjouterVehiculeComponent {
  carForm = new FormGroup({
    marque: new FormControl('', Validators.required),
    immatriculation: new FormControl('', Validators.required),
    couleur: new FormControl('', Validators.required),
    places: new FormControl('', [Validators.required, Validators.min(1)]),
    type: new FormControl('familial', Validators.required),
  });
  constructor(private router: Router) {}
  
  onSubmit() {
    if (!Array.isArray(SharedService.users[SharedService.current_user_id].voitures)) {
      SharedService.users[SharedService.current_user_id].voitures = [];
    }
    if (this.carForm.valid) {
      SharedService.users[SharedService.current_user_id].voitures.push(this.carForm.value);
      this.router.navigate(['/profil']);
    }
  }
}
