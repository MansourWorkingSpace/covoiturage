import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "./navbar/navbar.component";
import { ConnexionComponent } from "./connexion/connexion.component";
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule,CommonModule, NavbarComponent, ConnexionComponent],
  exportAs: 'appRoot',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent {
  title = 'Way2go';
  marginTop = '0px';

  onNavbarExpand(expanded: boolean) { // Accept a boolean type
    this.marginTop = expanded ? '200px' : '70px'; // Adjust margin based on the navbar state
  }
}
