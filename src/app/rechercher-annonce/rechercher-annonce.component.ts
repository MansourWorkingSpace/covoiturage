import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-rechercher-annonce',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rechercher-annonce.component.html',
  styleUrl: './rechercher-annonce.component.css'
})
export class RechercherAnnonceComponent {
  users=SharedService.users;
}
