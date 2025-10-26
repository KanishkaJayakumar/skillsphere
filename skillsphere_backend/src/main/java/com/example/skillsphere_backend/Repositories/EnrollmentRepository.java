package com.example.skillsphere_backend.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.skillsphere_backend.entities.CourseEntity;
import com.example.skillsphere_backend.entities.EnrollmentEntity;
import com.example.skillsphere_backend.entities.UserEntity;

@Repository
public interface EnrollmentRepository extends JpaRepository<EnrollmentEntity, Long> {

    List<EnrollmentEntity> findByStudent(UserEntity student);
    List<EnrollmentEntity> findByCourse(CourseEntity course);
    
}
