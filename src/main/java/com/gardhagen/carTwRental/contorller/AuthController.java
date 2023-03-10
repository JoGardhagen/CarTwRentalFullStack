package com.gardhagen.carTwRental.contorller;

import com.gardhagen.carTwRental.dto.AuthCredentialsRequest;
import com.gardhagen.carTwRental.dto.RegisterDto;
import com.gardhagen.carTwRental.dto.UserDto;
import com.gardhagen.carTwRental.model.UserEntity;
import com.gardhagen.carTwRental.repository.UserRepository;
import com.gardhagen.carTwRental.service.UserServiceDetailsImpl;
import com.gardhagen.carTwRental.util.CustomPasswordEncoder;
import com.gardhagen.carTwRental.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

//    @Autowired
//    private UserRepository userRepository;
    @Autowired
    private UserServiceDetailsImpl userServiceDetailsImpl;
    @Autowired
    private AuthenticationManager authenticationManager;


    private PasswordEncoder passwordEncoder;


    @Autowired
    private JwtUtil jwtUtil;
//    @GetMapping("customers")
//    public ResponseEntity<?> getUsers(@AuthenticationPrincipal UserEntity user){
//        return ResponseEntity.ok(userServiceDetailsImpl.getUsers());
//    }

    @PostMapping("login")
    public ResponseEntity<?> login (@RequestBody AuthCredentialsRequest request){
        try {
            Authentication authenticate = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    request.getUsername(), request.getPassword()
                            )
                    );
            UserEntity user = (UserEntity) authenticate.getPrincipal();
            user.setPassword(null);
            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.AUTHORIZATION,
                            jwtUtil.generateToken(user)
                    )
                    .body(user);

        }catch (BadCredentialsException ex){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }}
        @PostMapping("register")
        public ResponseEntity<?> register(@RequestBody UserDto userDto) {
            userServiceDetailsImpl.createUser(userDto);
            try {
                Authentication authenticate = authenticationManager
                        .authenticate(
                                new UsernamePasswordAuthenticationToken(
                                        userDto.getUsername(), userDto.getPassword()
                                )
                        );

                UserEntity user = (UserEntity) authenticate.getPrincipal();

                user.setPassword(null);
                return ResponseEntity.ok()
                        .header(
                                HttpHeaders.AUTHORIZATION,
                                jwtUtil.generateToken(user)
                        )
                        .body(user);
            } catch (BadCredentialsException ex) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }
            @PostMapping("adminregister")
            public ResponseEntity<?> adminRegister(@RequestBody UserDto userDto){
                userServiceDetailsImpl.createAdminUser(userDto);
                try {
                    Authentication authenticate = authenticationManager
                            .authenticate(
                                    new UsernamePasswordAuthenticationToken(
                                            userDto.getUsername(), userDto.getPassword()
                                    )
                            );

                    UserEntity user = (UserEntity) authenticate.getPrincipal();

                    user.setPassword(null);
                    return ResponseEntity.ok()
                            .header(
                                    HttpHeaders.AUTHORIZATION,
                                    jwtUtil.generateToken(user)
                            )
                            .body(user);
                } catch (BadCredentialsException ex) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
                }
//            try {
//
//
////            if(userServiceDetailsImpl.loadUserByUsername(registerDto.getUsername())){
////                return new ResponseEntity<>("username is taken!", HttpStatus.BAD_REQUEST);
////            }
//                passwordEncoder = new BCryptPasswordEncoder();
//            UserEntity user = new UserEntity();
//            user.setUsername(registerDto.getUsername());
//            user.setPassword(passwordEncoder.encode((registerDto.getPassword())));
////            user.setRole(registerDto.getRole());
////            Role roles = roleRepository.findByName("USER").get();
////            user.setRoles(Collections.singletonList(roles));
////                user.setAuthorities();
//
////            userRepository.save(user);
//                userServiceDetailsImpl.registerNewUser(user);
//            return new ResponseEntity<>("User registerd success!" ,HttpStatus.OK);
//            } catch (BadCredentialsException ex) {
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//            }
        }


    }



