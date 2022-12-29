package com.gardhagen.carTwRental.dto;

import com.gardhagen.carTwRental.model.Car;
import com.gardhagen.carTwRental.model.UserEntity;

public class ReservationDto {
    private Car car;
    private UserEntity user;

    private int dayToRent;



    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }
}
