package com.gardhagen.carTwRental.contorller;

import com.gardhagen.carTwRental.model.UserEntity;
import com.gardhagen.carTwRental.service.UserServiceDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1")
public class userCustomerController {
    @Autowired
    private UserServiceDetailsImpl userServiceDetailsImpl;
    @GetMapping("customers")
    public ResponseEntity<?> getUsers(@AuthenticationPrincipal UserEntity user){
        return ResponseEntity.ok(userServiceDetailsImpl.getUsers());
    }
}
