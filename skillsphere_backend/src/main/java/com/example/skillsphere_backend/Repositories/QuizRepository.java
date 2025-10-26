package com.example.skillsphere_backend.Repositories;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.example.skillsphere_backend.entities.CourseEntity;
import com.example.skillsphere_backend.entities.QuizEntity;

@Repository
public interface QuizRepository {

    List<QuizEntity> findByCourse(CourseEntity course);
    
}
