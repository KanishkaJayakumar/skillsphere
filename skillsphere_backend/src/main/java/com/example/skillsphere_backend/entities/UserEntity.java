package com.example.skillsphere_backend.entities;

import java.util.Set;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String userName;

    @Email
    @Size(max = 150)
    @Column(unique = true, nullable = false)
    private String userEmail;

    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_role", 
    joinColumns = { @JoinColumn(name = "userId")} ,
    inverseJoinColumns ={ @JoinColumn(name = "roleId") }
    )
    private Set<RoleEntity> roles;

}