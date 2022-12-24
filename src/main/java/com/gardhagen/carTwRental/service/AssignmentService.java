package com.gardhagen.carTwRental.service;

import com.gardhagen.carTwRental.model.Assignment;
import com.gardhagen.carTwRental.model.UserEntity;
import com.gardhagen.carTwRental.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class AssignmentService {
    @Autowired
    private AssignmentRepository assignmentRepository;

    public Assignment save(UserEntity user) {
        Assignment assignment = new Assignment();
        assignment.setStatus("Need to be Submitted");
        assignment.setUserEntity(user);

        return assignmentRepository.save(assignment);
    }
//    public Set<Assignment> findByUser(UserEntity user){
//        return assignmentRepository.findByUser(user);
//    }
    public Set<Assignment> findByUserEntity(UserEntity user){
        return assignmentRepository.findByUserEntity(user);
    }

    public Optional<Assignment> findById(Long assignmentId) {
        return assignmentRepository.findById(assignmentId);

    }

    public Assignment save(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }
}
