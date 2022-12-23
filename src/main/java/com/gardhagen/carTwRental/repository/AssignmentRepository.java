package com.gardhagen.carTwRental.repository;

import com.gardhagen.carTwRental.model.Assignment;
import com.gardhagen.carTwRental.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;
import java.util.Set;

public interface AssignmentRepository extends JpaRepository<Assignment,Long> {

    Set<Assignment> findByUserEntity(UserEntity user);

//    Set<Assignment> findByUser(UserEntity userEntity);
}
