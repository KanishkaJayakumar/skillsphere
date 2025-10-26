package com.example.skillsphere_backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.skillsphere_backend.Repositories.CourseRepository;
import com.example.skillsphere_backend.Repositories.UserRepository;
import com.example.skillsphere_backend.entities.CourseEntity;
import com.example.skillsphere_backend.entities.UserEntity;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

   public CourseEntity createCourse(Long instructorId, CourseEntity course) {
        UserEntity instructor = userRepository.findById(instructorId)
                .orElseThrow(() -> new RuntimeException("Instructor not found"));

        course.setInstructor(instructor);
        return courseRepository.save(course);
    }

    // Get all courses
    public List<CourseEntity> getAllCourses() {
        return courseRepository.findAll();
    }

    // Get courses by instructor
    public List<CourseEntity> getCoursesByInstructor(Long instructorId) {
        UserEntity instructor = userRepository.findById(instructorId)
                .orElseThrow(() -> new RuntimeException("Instructor not found"));
        return courseRepository.findByInstructor(instructor);
    }

    public CourseEntity createCourseinS3(Long instructorId, CourseEntity course) {
    UserEntity instructor = userRepository.findById(instructorId)
            .orElseThrow(() -> new RuntimeException("Instructor not found"));

    course.setInstructor(instructor);
    return courseRepository.save(course);
}

    
}
