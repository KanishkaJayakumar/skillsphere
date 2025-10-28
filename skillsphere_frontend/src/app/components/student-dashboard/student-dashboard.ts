import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Enrollment } from '../../models/enrollment.model';
import { EnrollmentService } from '../../services/enrollmentservice.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  imports: [CommonModule ],
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.css',
})
export class StudentDashboard implements OnInit  {

  enrollments: Enrollment[] = [];
  studentId!: number; 

  constructor(private enrollmentService: EnrollmentService, private router : Router) {}

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userId');

    if (storedUserId) {
      this.studentId = Number(storedUserId); 
      console.log('Student ID:', this.studentId);

      this.enrollmentService.getStudentCourses(this.studentId).subscribe({
        next: (data) => this.enrollments = data,
        error: (err) => console.error('Error fetching student courses:', err)
      });
    } else {
      console.warn('User ID not found in localStorage — please log in again.');
    }
  }

  goToCourse(courseId: number) {
  this.router.navigate(['/mycoursedetails', courseId]);
}

resumeCourse(courseId: number) {
  this.router.navigate(['/mycoursedetails', courseId], { queryParams: { action: 'resume' } });
}

relearnCourse(courseId: number) {
  this.router.navigate(['/mycoursedetails', courseId], { queryParams: { action: 'relearn' } });
}

}
