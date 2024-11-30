import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-publier-annonce',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './publier-annonce.component.html',
  styleUrl: './publier-annonce.component.css',
})
export class PublierAnnonceComponent {
  annonceForm = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.minLength(3)]),
    dateDepart: new FormControl('', Validators.required),
    heureDepart: new FormControl('', Validators.required),
    dateArrivee: new FormControl('', Validators.required),
    heureArrivee: new FormControl('', Validators.required),
    lieuDepart: new FormControl('', Validators.required),
    lieuArrivee: new FormControl('', Validators.required),
    vehicule: new FormControl('', Validators.required),
    prixParPlace: new FormControl('', Validators.required),
    allerRetour: new FormControl(false),
    animauxAutorises: new FormControl(false),
  });

  voitures = SharedService.users[SharedService.current_user_id]?.voitures||[];
  selectedVehicle:any;

  onVehicleChange(event: Event) {
    console.log('Event Target Value:', (event.target as HTMLSelectElement).value);
    const vehicleIndex = parseInt((event.target as HTMLSelectElement).value, 10);
    console.log('Parsed Vehicle Index:', vehicleIndex);
  
    if (!isNaN(vehicleIndex) && vehicleIndex >= 0 && vehicleIndex < this.voitures.length) {
      this.selectedVehicle = this.voitures[vehicleIndex];
      console.log('Selected Vehicle:', this.selectedVehicle);
    } else {
      console.error('Invalid vehicle index');
      this.selectedVehicle = null;
    }
  }
  
  constructor(private router: Router) {}
  OnSubmit() {
    if (!Array.isArray(SharedService.users[SharedService.current_user_id].annonces)) {
      SharedService.users[SharedService.current_user_id].annonces = [];
    }
  
    if (!this.selectedVehicle) {
      console.error('No vehicle selected!');
      return;
    }
    
    if (this.annonceForm.valid) {
      this.annonceForm.patchValue({ vehicule: this.selectedVehicle });
      SharedService.users[SharedService.current_user_id].annonces.push(this.annonceForm.value);
      console.log('Form submitted successfully. Navigating to /profil...');
      this.router.navigate(['/profil']);
      
    } else {
      console.error('Form is invalid', this.annonceForm.errors);
    }
  }
  

}
