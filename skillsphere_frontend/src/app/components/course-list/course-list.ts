import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { Courseservice } from '../../services/courseservice.service';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from '../../services/enrollmentservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {

  courses: Course[] = [];
  studentId !: number ;
  userRole: string | null = null;

  constructor(private courseService : Courseservice, 
    private enrollmentService : EnrollmentService,
    private router : Router  
  ) {}

  ngOnInit(): void {
    this.retrieveItem();
    this.userRole = localStorage.getItem('userRole'); // e.g., 'STUDENT' or 'INSTRUCTOR'

    this.courseService.getAllCourses().subscribe( (data : any) => {
      this.courses = data;
    });
  }

 retrieveItem() {
  const id = localStorage.getItem('userId');
  if (id) {
    this.studentId = parseInt(id, 10); 
  } else {
    console.error('❌ No userId found in localStorage');
  }
}

   enroll(courseId: number): void {
    if (this.userRole !== 'STUDENT') {
    alert('You must login as a student to enroll in a course.');
    return;
  }
    this.enrollmentService.enrollStudent(this.studentId, courseId).subscribe({
      next: (res) => {
        alert(`Enrolled successfully in course ID ${courseId}`);
        this.router.navigate(['/mycoursedetails', res.enrollmentId]);
      },
      error: (err) => {
        alert(`Error enrolling: ${err.error.message || err.message}`);
      }
    });
  }
   openCourse(enrollmentId: number) {
    this.router.navigate(['/mycoursedetails', enrollmentId]);
  }

}
