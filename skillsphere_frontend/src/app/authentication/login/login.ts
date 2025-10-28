import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
  this.authService.login(this.email, this.password).subscribe({
    next: res => {
      const userRole = localStorage.getItem('userRole'); // get the single current role
      if (userRole === 'INSTRUCTOR') {
        this.router.navigate(['/']);
      } else if (userRole === 'STUDENT') {
        this.router.navigate(['/']);
      }
    },
    error: err => alert('Invalid credentials')
  });
}


}
