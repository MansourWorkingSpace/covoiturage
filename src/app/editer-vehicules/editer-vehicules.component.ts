import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-editer-vehicules',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editer-vehicules.component.html',
  styleUrl: './editer-vehicules.component.css',
})
export class EditerVehiculesComponent {
  constructor(private router: Router) {}
  voitures:any = SharedService.users[SharedService.current_user_id].voitures;
  delete(i: number) {
    SharedService.users[SharedService.current_user_id].voitures.splice(i, 1);
  }
  /*modifier(i: number) {
    const test = prompt('veuillez entrer le nouveau nom');
    if (test) {
      this.names[i].esm = test;
    }
  }
  details(i: number) {
    this.detail = { id: this.names[i].id, esm: this.names[i].esm };
  }*/
}
