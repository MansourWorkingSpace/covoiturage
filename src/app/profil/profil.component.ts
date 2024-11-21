import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  current_user : any = SharedService.users[SharedService.current_user_id];
}
