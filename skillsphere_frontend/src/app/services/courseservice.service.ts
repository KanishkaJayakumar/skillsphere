import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { CourseDTO } from '../models/courseDTO.model';

@Injectable({
  providedIn: 'root'
})
export class Courseservice {

  private baseUrl = 'http://localhost:8081/api/course';

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}`);
  }

  getCoursesByInstructor(instructorId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/instructor/${instructorId}`);
  }
  
   createCourse(instructorId: number, course: CourseDTO): Observable<Course> {
    return this.http.post<Course>(`${this.baseUrl}/create/${instructorId}`, course);
  }

  getEnrollment(enrollmentId: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/enrollment/${enrollmentId}`);
    }

    updateProgress(enrollmentId: number, progress: number): Observable<any> {
        return this.http.put(`${this.baseUrl}/enrollment/${enrollmentId}/progress?progress=${progress}`, {});
    }

    getCertificate(enrollmentId: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/enrollment/${enrollmentId}/certificate`);
    }

    createCourseWithVideo(instructorId: number, formData: FormData) {
    return this.http.post(`${this.baseUrl}/createWithVideo/${instructorId}`, formData);
  }
   
  
}
