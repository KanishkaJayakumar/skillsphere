package com.example.skillsphere_backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.example.skillsphere_backend.entities.EnrollmentEntity;
import com.example.skillsphere_backend.services.EnrollmentService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    // Enroll a student
    @PostMapping("/enroll/{studentId}/{courseId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<EnrollmentEntity> enrollStudent(
            @PathVariable Long studentId, 
            @PathVariable Long courseId) {
        return ResponseEntity.ok(enrollmentService.enrollStudent(studentId, courseId));
    }

    // Get all courses a student is enrolled in
    @GetMapping("/student/{studentId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<EnrollmentEntity>> getStudentCourses(@PathVariable Long studentId) {
        return ResponseEntity.ok(enrollmentService.getEnrollmentsByStudent(studentId));
    }

    // Get course details by enrollment
    @GetMapping("/enrollment/{enrollmentId}")
    @PreAuthorize("hasRole('STUDENT')")
    public EnrollmentEntity getEnrollment(@PathVariable Long enrollmentId) {
        return enrollmentService.getEnrollment(enrollmentId);
    }

    // Update progress
    @PutMapping("/enrollment/{enrollmentId}/progress")
    @PreAuthorize("hasRole('STUDENT')")
    public EnrollmentEntity updateProgress(@PathVariable Long enrollmentId, @RequestParam float progress) {
        return enrollmentService.updateProgress(enrollmentId, progress);
    }

    @GetMapping("/enrollment/{id}/certificate")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ByteArrayResource> downloadCertificate(@PathVariable("id") Long enrollmentId) {
        return enrollmentService.generateCertificate(enrollmentId);
    }



}
