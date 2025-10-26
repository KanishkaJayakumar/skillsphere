package com.example.skillsphere_backend.controllers;

import java.util.List;

import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.skillsphere_backend.DTOs.CourseDTO;
import com.example.skillsphere_backend.Repositories.CourseRepository;
import com.example.skillsphere_backend.Repositories.UserRepository;
import com.example.skillsphere_backend.entities.CourseEntity;
import com.example.skillsphere_backend.entities.UserEntity;
import com.example.skillsphere_backend.services.CourseService;
import com.example.skillsphere_backend.services.S3Service;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/course")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @Autowired
    private S3Service s3Service;

    @PostMapping("/create/{instructorId}")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<?> createCourse(@PathVariable Long instructorId, @Valid @RequestBody CourseEntity course) {
        return ResponseEntity.ok(courseService.createCourse(instructorId, course));
    }

    @GetMapping()
    @PreAuthorize("hasAnyRole('INSTRUCTOR','STUDENT')")
    public ResponseEntity<?> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    @GetMapping("/instructor/{id}")
    @PreAuthorize("hasAnyRole('INSTRUCTOR', 'STUDENT')")
    public ResponseEntity<?> getCoursesByInstructor(@PathVariable Long id) {
        return ResponseEntity.ok(courseService.getCoursesByInstructor(id));
    }

    @PostMapping("/createWithVideo/{instructorId}")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<?> createCourseWithVideo(
            @PathVariable Long instructorId,
            @RequestParam String courseTitle,
            @RequestParam String courseDescription,
            @RequestParam("video") MultipartFile videoFile) {

        String videoUrl = s3Service.uploadFile(videoFile);

        CourseEntity course = new CourseEntity();
        course.setCourseTitle(courseTitle);
        course.setCourseDescription(courseDescription);
        course.setCourseVideourl(videoUrl);

        return ResponseEntity.ok(courseService.createCourseinS3(instructorId, course));
    }

}
