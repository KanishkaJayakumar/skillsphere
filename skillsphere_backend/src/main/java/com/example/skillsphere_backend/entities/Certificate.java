package com.example.skillsphere_backend.entities;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Certificate {
    private String studentName;
    private String courseTitle;
    private LocalDateTime completionDate;
    private String certificateUrl; // can be PDF path or download link
}

