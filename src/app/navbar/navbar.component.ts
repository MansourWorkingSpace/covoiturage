import { Component, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() navbarExpanded = new EventEmitter<boolean>(); 
  checked = false;

  grandirheader() {
    this.checked = !this.checked;
    this.navbarExpanded.emit(this.checked);
  }
  get status(): boolean {
    return SharedService.connected;
  }
  get username():string{
    return  SharedService.users[SharedService.current_user_id].username
  }
  deconnecter(){
    SharedService.connected=false;
  }
}
