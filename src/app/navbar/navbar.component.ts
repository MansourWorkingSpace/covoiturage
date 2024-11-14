import { Component, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() navbarExpanded = new EventEmitter<boolean>(); // Explicitly type as boolean
  checked = false;

  grandirheader() {
    this.checked = !this.checked;
    this.navbarExpanded.emit(this.checked); // Emit a boolean value
  }
}
