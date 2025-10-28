import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  signupForm: FormGroup;
  roles = ['INSTRUCTOR', 'STUDENT'];
  isSubmitted = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }

  get form() {
    return this.signupForm.controls;
  }

  onSubmit(): void {
    this.isSubmitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.signupForm.invalid) {
      return;
    }

    const { name, email, password, role } = this.signupForm.value;

    this.authService.register(name, email, password, role).subscribe({
      next: (res) => {
        this.successMessage = 'Registration successful! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = 'Registration failed! ' + (err.error?.message || '');
      }
    });
  }

}
