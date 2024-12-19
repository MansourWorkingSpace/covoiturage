import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-annonce-participe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './annonce-participe.component.html',
  styleUrls: ['./annonce-participe.component.css']
})
export class AnnonceParticipeComponent {
  user = SharedService.users[SharedService.current_user_id];
  users = SharedService.users;
  current_user_id = SharedService.current_user_id;

  getParticipatedAnnonces() {
    let annonces: any[] = [];
    for (let i = 0; i < SharedService.users.length; i++) {
      for (let j = 0; j < SharedService.users[i].annonces.length; j++) {
        for (let k = 0; k < SharedService.users[i].annonces[j].indexParticipants.length; k++) {
          if (this.current_user_id === SharedService.users[i].annonces[j].indexParticipants[k]) {
            const annonceWithUser = {
              ...SharedService.users[i].annonces[j],
              username: SharedService.users[i].username,
              telephone: SharedService.users[i].telephone
            };
            annonces.push(annonceWithUser);
          }
        }
      }
    }
    console.log('Participated annonces:', annonces); 
    return annonces;
  }
  

  annonces = this.getParticipatedAnnonces().map((annonce: any) => ({
    ...annonce,
    affiche: false, 
  }));


  isFutureDate(dateDepart: string): boolean {
    return new Date(dateDepart) > new Date();
  }


  afficher(annonce: any) {
    annonce.affiche = !annonce.affiche; 
  }
}
