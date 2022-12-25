package com.gardhagen.carTwRental.repository;


import com.gardhagen.carTwRental.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepository extends JpaRepository<Car,Long> {
    Car findCarById(long carId);
}
