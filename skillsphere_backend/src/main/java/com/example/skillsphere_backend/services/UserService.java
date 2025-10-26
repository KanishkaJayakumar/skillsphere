package com.example.skillsphere_backend.services;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.skillsphere_backend.DTOs.RoleDTO;
import com.example.skillsphere_backend.DTOs.UserDTO;
import com.example.skillsphere_backend.Repositories.RoleRepository;
import com.example.skillsphere_backend.Repositories.UserRepository;
import com.example.skillsphere_backend.entities.RoleEntity;
import com.example.skillsphere_backend.entities.UserEntity;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    public UserEntity registerUser(UserDTO userDTO) {
        UserEntity user = new UserEntity();
        user.setUserName(userDTO.getUserName());
        user.setUserEmail(userDTO.getUserEmail());
        user.setPassword(userDTO.getPassword());

        Set<RoleEntity> roles = new HashSet<>();
        if (userDTO.getRoles() != null) {
            for (RoleDTO r : userDTO.getRoles()) {
                RoleEntity role = roleRepository.findById(r.getRoleId())
                        .orElseThrow(() -> new RuntimeException("Role not found: " + r.getRoleId()));
                roles.add(role);
            }
        }
        user.setRoles(roles);
        return userRepository.save(user);
    }

    public UserEntity assignRole(Long userId, Long roleId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));
        RoleEntity role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found: " + roleId));
        user.getRoles().add(role);
        return userRepository.save(user);
    }
}
