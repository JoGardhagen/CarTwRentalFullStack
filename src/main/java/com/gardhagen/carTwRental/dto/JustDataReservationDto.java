package com.gardhagen.carTwRental.dto;

public class JustDataReservationDto {
    private long reservationId;
    private long carId;
    private String carBrand;
    private int carModelYear;
    private double carRentalPrice;
    private int rentalDays;
    private boolean active;

    public long getReservationId() {
        return reservationId;
    }

    public void setReservationId(long reservationId) {
        this.reservationId = reservationId;
    }

    public long getCarId() {
        return carId;
    }

    public void setCarId(long carId) {
        this.carId = carId;
    }

    public String getCarBrand() {
        return carBrand;
    }

    public void setCarBrand(String carBrand) {
        this.carBrand = carBrand;
    }

    public int getCarModelYear() {
        return carModelYear;
    }

    public void setCarModelYear(int carModelYear) {
        this.carModelYear = carModelYear;
    }

    public double getCarRentalPrice() {
        return carRentalPrice;
    }

    public void setCarRentalPrice(double carRentalPrice) {
        this.carRentalPrice = carRentalPrice;
    }

    public int getRentalDays() {
        return rentalDays;
    }

    public void setRentalDays(int rentalDays) {
        this.rentalDays = rentalDays;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
