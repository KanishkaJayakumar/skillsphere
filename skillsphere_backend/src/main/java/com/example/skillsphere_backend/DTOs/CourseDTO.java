package com.example.skillsphere_backend.DTOs;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseDTO {

    @NotBlank
    @Size(max = 200)
    private String courseTitle;

    @NotBlank
    @Size(max = 1000)
    private String courseDescription;

    @NotBlank
    @Size(max = 1000)
    private String courseVideoUrl;
}

