import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth-service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  // constructor(private auth: AuthService, private router: Router) {}

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   if (!this.auth.isAuthenticated) {
  //       this.router.navigate(['/login']);
  //       return false;
  //   }

  //   const expectedRoles = route.data['roles'] as string[]; // roles for this route
  //   if (expectedRoles && expectedRoles.length > 0) {
  //       const userRoles = JSON.parse(localStorage.getItem('roles') || '[]');
  //       const hasRole = userRoles.some((role: string) => expectedRoles.includes(role));
  //       if (!hasRole) {
  //           alert('You are not authorized to access this page.');
  //           return false;
  //       }
  //   }

  //   return true;
  // }

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.auth.isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }

    const expectedRoles = route.data['roles'] as string[]; // roles allowed for this route
    if (expectedRoles && expectedRoles.length > 0) {
      const userRole = localStorage.getItem('userRole'); // single role as string
      if (!userRole || !expectedRoles.includes(userRole)) {
        alert('You are not authorized to access this page.');
        this.router.navigate(['/login']); // optional redirect
        return false;
      }
    }

    return true;
  }
}
