import { Component, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth-service';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {


  isLoggedIn: boolean = false;
  userRole: string | null = null;

  constructor(public authService: AuthService, private router: Router, private location : Location) {}

  ngOnInit(): void {
    // Subscribe to login state changes
    this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isLoggedIn = isAuth;
    })

   
    // Subscribe to role changes
    this.authService.userRole$.subscribe(role => {
      this.userRole = role;
    });
  }

   goBack() : void{
      this.location.back();
    }


  logout(): void {
    this.authService.logout();
  }

  // constructor(public authService: AuthService, private router : Router) {}

  // userRole: string | null = null;
  // isLoggedIn: boolean = false;


  // ngOnInit() {
  //   this.getRole();
  //   const userId = localStorage.getItem('userId');
  //   this.isLoggedIn = !!userId;
  // }

  // getRole(){
  //   const storedRole = localStorage.getItem('userRole'); // 'STUDENT' or 'INSTRUCTOR'
    
  //   this.userRole = storedRole;
  //   console.log(this.userRole);
  // }

  // logout(): void {
  //   this.authService.logout();
  // }
}
