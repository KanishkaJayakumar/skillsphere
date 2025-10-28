import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage implements OnInit {

  featuredCourses = [
    {
      title: 'Master Java Spring Boot',
      desc: 'Learn backend development from scratch and build real projects.',
      img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    },
    {
      title: 'Full-Stack Web Development',
      desc: 'Become job-ready with Angular, Node.js & MongoDB.',
      img: 'https://images.unsplash.com/photo-1556761175-4b46a572b786',
    },
    {
      title: 'AWS Cloud Essentials',
      desc: 'Understand cloud computing and deploy applications securely.',
      img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2',
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToCourses() {
    this.router.navigate(['/courselist']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
