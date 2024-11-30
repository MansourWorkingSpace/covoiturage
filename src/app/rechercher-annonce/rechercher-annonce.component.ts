import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-rechercher-annonce',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rechercher-annonce.component.html',
  styleUrl: './rechercher-annonce.component.css',
})
export class RechercherAnnonceComponent {
  users = SharedService.users;
  current_user=SharedService.current_user_id;
  isFutureDate(dateDepart: string): boolean {
    return new Date(dateDepart) > new Date();
  }
  devenirParticipant(annonce: any) {
    annonce.indexParticipants.push(SharedService.current_user_id);
    annonce.vehicule.places -= 1;
  }
  participant(annonce: any): boolean {
    return annonce.indexParticipants.includes(SharedService.current_user_id);
  }
}
