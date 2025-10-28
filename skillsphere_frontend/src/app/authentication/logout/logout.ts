import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.html',
  styleUrl: './logout.css',
})
export class Logout {

  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }

}
