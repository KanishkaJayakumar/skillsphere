package com.example.skillsphere_backend.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.skillsphere_backend.entities.UserEntity;

    public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByUserEmail(String userEmail);
    boolean existsByUserEmail(String userEmail);
}

