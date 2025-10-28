// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   private baseUrl = 'http://localhost:8081/api/auth';

//   constructor(private http: HttpClient, private router: Router) {}

//   login(email: string, password: string): Observable<any> {
//     return this.http.post(`${this.baseUrl}/login`, null, {
//       params: { email, password }
//     }).pipe(
//       tap((res: any) => {
//         if (res.token) {
//           localStorage.setItem('jwt', res.token);
//           localStorage.setItem('userId', res.userId);
//           localStorage.setItem('roles', JSON.stringify(res.roles));
//         }
//       })
//     );
//   }

// register(name: string, email: string, password: string, role: string): Observable<any> {
//   return this.http.post(`${this.baseUrl}/register`, null, {
//     params: { name, email, password, role }
//   });
// }

//   logout(): void {
//     localStorage.clear();
//     this.router.navigate(['/login']);
//   }

//   getToken(): string | null {
//     return localStorage.getItem('jwt');
//   }

//   isLoggedIn(): boolean {
//     return !!this.getToken();
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

//   private authSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('userId'));
//   isAuthenticated$ = this.authSubject.asObservable();

//   private baseUrl = 'http://localhost:8081/api/auth';
//   private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

//   constructor(private http: HttpClient, private router: Router) {}

//   private hasToken(): boolean {
//     return !!localStorage.getItem('jwt');
//   }

//   login(email: string, password: string): Observable<any> {
//     return this.http.post(`${this.baseUrl}/login`, null, {
//       params: { email, password }
//     }).pipe(
//       tap((res: any) => {
//         if (res.success && res.token) {
//           localStorage.setItem('jwt', res.token);
//           localStorage.setItem('userId', res.userId);
//           localStorage.setItem('roles', JSON.stringify(res.roles));
//           this.loggedIn.next(true);
//         }
//       })
//     );
    
//   }

//   register(name: string, email: string, password: string, role: string): Observable<any> {
//   return this.http.post(`${this.baseUrl}/register`, null, {
//     params: { name, email, password, role }
//   });
// }

//   logout(): void {
//     // Clear all stored data
//     localStorage.removeItem('jwt');
//     localStorage.removeItem('userId');
//     localStorage.removeItem('roles');
    
//     // Update login state
//     this.loggedIn.next(false);
    
//     // Navigate to login
//     this.router.navigate(['/login']);
//   }

//   isLoggedIn(): Observable<boolean> {
//     return this.loggedIn.asObservable();
//   }

//   getToken(): string | null {
//     return localStorage.getItem('jwt');
//   }

//   // Check if user is currently authenticated
//   get isAuthenticated(): boolean {
//     return this.hasToken();
//   }



private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$ = this.loggedInSubject.asObservable();

  private userRoleSubject = new BehaviorSubject<string | null>(this.getStoredRole());
  userRole$ = this.userRoleSubject.asObservable();

  private baseUrl = 'http://localhost:8081/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('jwt');
  }

  private getStoredRole(): string | null {
    return localStorage.getItem('userRole'); // or 'roles' if stored as array
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, null, {
      params: { email, password }
    }).pipe(
      tap((res: any) => {
        if (res.success && res.token) {
          localStorage.setItem('jwt', res.token);
          localStorage.setItem('userId', res.userId);
          localStorage.setItem('userRole', res.roles[0]); // assuming roles array
          
          // Update observables
          this.loggedInSubject.next(true);
          this.userRoleSubject.next(res.roles[0]);
        }
      })
    );
  }

  register(name: string, email: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, null, {
      params: { name, email, password, role }
    });
  }

  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');

    this.loggedInSubject.next(false);
    this.userRoleSubject.next(null);

    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }
}
