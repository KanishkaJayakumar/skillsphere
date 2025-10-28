import { Component, OnInit } from '@angular/core';
import { Courseservice } from '../../services/courseservice.service';
import { CourseDTO } from '../../models/courseDTO.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-createcourse-s3',
  imports: [FormsModule, CommonModule],
  templateUrl: './createcourse-s3.html',
  styleUrl: './createcourse-s3.css',
})
export class CreatecourseS3 implements OnInit {

  instructorId !: number;

  

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userId');

    if (storedUserId) {
      this.instructorId = Number(storedUserId); 
      console.log('User ID:', this.instructorId);
       this.course.instructor.userId = this.instructorId;
    } else {
      console.warn('User ID not found in localStorage — please log in again.');
    }
  }

  course: CourseDTO = {
    courseTitle: '',
    courseDescription: '',
    courseVideourl: '',
    instructor: { userId: this.instructorId, userName: '', userEmail: '', roles: [] }
  };

    // ✅ Loading flag
  isLoading: boolean = false;

  videoFile: File | null = null;

  constructor(private courseService: Courseservice) {}

  onFileSelected(event: any) {
    this.videoFile = event.target.files[0];
  }

  createCourse() {
    if (!this.videoFile) return alert('Please select a video');

    const formData = new FormData();
    formData.append('courseTitle', this.course.courseTitle);
    formData.append('courseDescription', this.course.courseDescription);
    formData.append('video', this.videoFile);

      // ✅ Start loading
    this.isLoading = true;

    this.courseService.createCourseWithVideo(this.course.instructor.userId, formData)
      .subscribe({
        next: data => { alert('Course created successfully!'),
         this.isLoading = false;},
        error: err => { console.error(err),
        this.isLoading = false;}
      });
  }
}
