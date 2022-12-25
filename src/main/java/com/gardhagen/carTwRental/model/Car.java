package com.gardhagen.carTwRental.model;

import javax.persistence.*;

@Entity
@Table
public class Car {
    @Id
    @SequenceGenerator(
            name = "automobile_sequence",
            sequenceName = "automobile_sequence",
            allocationSize = 1

    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "automobile_sequence"
    )
    private long id;
    private String brand;
    private int modelYear;
    private double rentalPrice;


    public Car() {
    }

    public Car(long id, String brand, int modelYear, double rentalPrice) {
        this.id = id;
        this.brand = brand;
        this.modelYear = modelYear;
        this.rentalPrice = rentalPrice;
    }

    public Car(String brand, int modelYear, double rentalPrice) {
        this.brand = brand;
        this.modelYear = modelYear;
        this.rentalPrice = rentalPrice;
    }

    public Car(long id) {
        this.id = id;
    }

    public double getRentalPrice() {
        return rentalPrice;
    }

    public void setRentalPrice(double rentalPrice) {
        this.rentalPrice = rentalPrice;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public int getModelYear() {
        return modelYear;
    }

    public void setModelYear(int modelYear) {
        this.modelYear = modelYear;
    }


}
