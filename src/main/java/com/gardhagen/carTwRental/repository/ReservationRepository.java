package com.gardhagen.carTwRental.repository;


import com.gardhagen.carTwRental.model.Reservation;
import com.gardhagen.carTwRental.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface ReservationRepository extends JpaRepository<Reservation,Long> {
    Set<Reservation> findByUserEntity(UserEntity user);
}
