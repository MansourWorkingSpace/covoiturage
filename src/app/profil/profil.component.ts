import { Component } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  current_user : any = SharedService.users[SharedService.current_user_id];
}
