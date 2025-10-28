import { Component } from '@angular/core';
import { Course } from '../../models/course.model';
import { Courseservice } from '../../services/courseservice.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseDTO } from '../../models/courseDTO.model';

@Component({
  selector: 'app-createcourse',
  imports: [FormsModule, CommonModule],
  templateUrl: './createcourse.html',
  styleUrl: './createcourse.css',
})
export class Createcourse {

  course: CourseDTO = {
    courseTitle: '',
    courseDescription: '',
    courseVideourl: '',
    instructor: {
      userId: 1, userName: '',
      userEmail: '',
      roles: []
    }
  };

  constructor(private courseService: Courseservice) {}

  createCourse() {
    this.courseService.createCourse(this.course.instructor.userId, this.course).subscribe({
      next: (data : any) => alert('Course created successfully!'),
      error: (err : any) => console.error(err)
    });
  }

}
