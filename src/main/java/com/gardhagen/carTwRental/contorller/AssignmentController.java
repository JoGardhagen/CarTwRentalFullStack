package com.gardhagen.carTwRental.contorller;

import com.gardhagen.carTwRental.model.Assignment;
import com.gardhagen.carTwRental.model.UserEntity;
import com.gardhagen.carTwRental.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;

    @PostMapping("")
    public ResponseEntity<?> createAssignment(@AuthenticationPrincipal UserEntity user){
        Assignment newAssignment = assignmentService.save(user);
        return ResponseEntity.ok(newAssignment);
    }
    @GetMapping("")
    public ResponseEntity<?> getAssignments(@AuthenticationPrincipal UserEntity user){
//        Set<Assignment> assignmentByUser = assignmentService.findByUser(user);
//        return ResponseEntity.ok(assignmentByUser);
          return ResponseEntity.ok(assignmentService.findByUserEntity(user));
    }
    @GetMapping("{assignmentId}")
    public ResponseEntity<?> getAssignments(@PathVariable Long assignmentId ,@AuthenticationPrincipal UserEntity user){
//        Set<Assignment> assignmentByUser = assignmentService.findByUserEntity(user);
        Optional<Assignment> assignmentOpt = assignmentService.findById(assignmentId);
        return ResponseEntity.ok(assignmentOpt.orElse(new Assignment()));
//        return ResponseEntity.ok(assignmentService.findByUserEntity(user));
    }
}
