package com.example.skillsphere_backend.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.skillsphere_backend.entities.CourseEntity;
import com.example.skillsphere_backend.entities.UserEntity;

@Repository
public interface CourseRepository extends JpaRepository<CourseEntity, Long> {
    // boolean existsByUserEmail(String userEmail);
    List<CourseEntity> findByInstructor(UserEntity instructor);
    boolean existsByInstructor(UserEntity instructor);
    Optional<CourseEntity> findByCourseTitle(String courseTitle);
}
