// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { Enrollment } from '../models/enrollment.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class EnrollmentService {

//   private baseUrl = 'http://localhost:8081/api/enrollments';

//   constructor(private http: HttpClient) { }

//  enrollStudent(studentId: number, courseId: number): Observable<Enrollment> {
//     return this.http.post<Enrollment>(`${this.baseUrl}/enroll/${studentId}/${courseId}`, {});
//   }

//   getStudentCourses(studentId: number): Observable<Enrollment[]> {
//     return this.http.get<Enrollment[]>(`${this.baseUrl}/student/${studentId}`);
//   }

//   updateProgress(enrollmentId: number, progress: number): Observable<Enrollment> {
//     return this.http.put<Enrollment>(`${this.baseUrl}/progress/${enrollmentId}?progress=${progress}`, {});
//   }

//   addCertificate(enrollmentId: number, certificateUrl: string): Observable<Enrollment> {
//     return this.http.put<Enrollment>(`${this.baseUrl}/certificate/${enrollmentId}?certificateUrl=${certificateUrl}`, {});
//   }
  
// }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enrollment } from '../models/enrollment.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private baseUrl = 'http://localhost:8081/api/enrollments';

  constructor(private http: HttpClient) {}

  // POST /api/enrollments/enroll/{studentId}/{courseId}
  enrollStudent(studentId: number, courseId: number): Observable<Enrollment> {
    return this.http.post<Enrollment>(`${this.baseUrl}/enroll/${studentId}/${courseId}`, {});
  }

  // GET /api/enrollments/enrollment/{enrollmentId}
  getEnrollment(enrollmentId: number): Observable<Enrollment> {
    return this.http.get<Enrollment>(`${this.baseUrl}/enrollment/${enrollmentId}`);
  }

  // PUT /api/enrollments/enrollment/{enrollmentId}/progress?progress=80
  updateProgress(enrollmentId: number, progress: number): Observable<Enrollment> {
    return this.http.put<Enrollment>(`${this.baseUrl}/enrollment/${enrollmentId}/progress?progress=${progress}`, {});
  }

  // GET /api/enrollments/enrollment/{enrollmentId}/certificate
  getCertificate(enrollmentId: number): Observable<Blob> {
  return this.http.get(`${this.baseUrl}/enrollment/${enrollmentId}/certificate`, {
    responseType: 'blob'
  });
}


  // GET /api/enrollments/student/{studentId}
  getStudentCourses(studentId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.baseUrl}/student/${studentId}`);
  }
}

