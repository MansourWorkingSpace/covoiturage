import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-mes-annonces',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mes-annonces.component.html',
  styleUrl: './mes-annonces.component.css',
})
export class MesAnnoncesComponent {
  annonces = SharedService.users[SharedService.current_user_id].annonces;
  user = SharedService.users[SharedService.current_user_id];
  users = SharedService.users;
  isFutureDate(dateDepart: string): boolean {
    return new Date(dateDepart) > new Date();
  }
  affiche=false;
  afficher(){
    this.affiche=true;
  }
}
