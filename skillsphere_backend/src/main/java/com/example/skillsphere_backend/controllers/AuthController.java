// package com.example.skillsphere_backend.controllers;

// import com.example.skillsphere_backend.Repositories.RoleRepository;
// import com.example.skillsphere_backend.Repositories.UserRepository;
// import com.example.skillsphere_backend.entities.*;
// import com.example.skillsphere_backend.security.JwtUtil;
// import com.example.skillsphere_backend.services.UserDetailsServiceImpl;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.*;
// import org.springframework.security.authentication.*;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.web.bind.annotation.*;
// import java.util.*;

// @CrossOrigin( origins = "http://localhost:4200")
// @RestController
// @RequestMapping("/api/auth")
// public class AuthController {

//     @Autowired
//     private AuthenticationManager authManager;
//     @Autowired
//     private UserRepository userRepository;
//     @Autowired
//     private RoleRepository roleRepository;
//     @Autowired
//     private PasswordEncoder encoder;
//     @Autowired
//     private JwtUtil jwtUtil;
//     @Autowired
//     private UserDetailsServiceImpl userDetailsService;

//     @PostMapping("/register")
//     public ResponseEntity<String> register(@RequestParam String name,
//                                            @RequestParam String email,
//                                            @RequestParam String password,
//                                            @RequestParam String role) {
//         if (userRepository.existsByUserEmail(email))
//             return ResponseEntity.badRequest().body("Email already registered");

//         RoleEntity userRole = roleRepository.findByRoleName(role)
//                 .orElseGet(() -> roleRepository.save(new RoleEntity(null, role)));

//         UserEntity user = new UserEntity();
//         user.setUserName(name);
//         user.setUserEmail(email);
//         user.setPassword(encoder.encode(password));
//         user.setRoles(Set.of(userRole));
//         userRepository.save(user);

//         return ResponseEntity.ok("User registered as " + role);
        
//     }

//     @PostMapping("/login")
//     public ResponseEntity<Map<String, Object>> login(@RequestParam String email,
//                                                      @RequestParam String password) {
//         authManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
//         UserDetails userDetails = userDetailsService.loadUserByUsername(email);
//         UserEntity user = userRepository.findByUserEmail(email).get();
//         String token = jwtUtil.generateToken(userDetails, user.getUserId());

//         Map<String, Object> response = new HashMap<>();
//         response.put("token", token);
//         response.put("userId", user.getUserId());
//         response.put("email", user.getUserEmail());
//         response.put("roles", user.getRoles().stream().map(RoleEntity::getRoleName).toList());
//         return ResponseEntity.ok(response);
//     }
// }

package com.example.skillsphere_backend.controllers;

import com.example.skillsphere_backend.Repositories.RoleRepository;
import com.example.skillsphere_backend.Repositories.UserRepository;
import com.example.skillsphere_backend.entities.*;
import com.example.skillsphere_backend.security.JwtUtil;
import com.example.skillsphere_backend.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    // ------------------------ SIGNUP / REGISTER ------------------------
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam String password,
            @RequestParam String role) {

        Map<String, Object> response = new HashMap<>();

        if (userRepository.existsByUserEmail(email)) {
            response.put("success", false);
            response.put("message", "Email already registered");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        RoleEntity userRole = roleRepository.findByRoleName(role)
                .orElseGet(() -> roleRepository.save(new RoleEntity(null, role)));

        UserEntity user = new UserEntity();
        user.setUserName(name);
        user.setUserEmail(email);
        user.setPassword(encoder.encode(password));
        user.setRoles(Set.of(userRole));
        userRepository.save(user);

        response.put("success", true);
        response.put("message", "User registered successfully as " + role);
        return ResponseEntity.ok(response);
    }

    // ------------------------ LOGIN ------------------------
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(
            @RequestParam String email,
            @RequestParam String password) {

        authManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        UserEntity user = userRepository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtil.generateToken(userDetails, user.getUserId());

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("success", true);
        response.put("token", token);
        response.put("userId", user.getUserId());
        response.put("email", user.getUserEmail());
        response.put("roles", user.getRoles().stream().map(RoleEntity::getRoleName).toList());

        return ResponseEntity.ok(response);
    }
}

