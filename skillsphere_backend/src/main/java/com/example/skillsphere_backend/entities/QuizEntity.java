package com.example.skillsphere_backend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "quizzes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long quizId;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private CourseEntity course;

    @NotBlank
    private String question;

    @NotBlank
    private String optionA;
    @NotBlank
    private String optionB;
    @NotBlank
    private String optionC;
    @NotBlank
    private String optionD;

    @NotBlank
    private String correctAnswer;
}

