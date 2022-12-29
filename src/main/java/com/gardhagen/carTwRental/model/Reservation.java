package com.gardhagen.carTwRental.model;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table
public class Reservation {
    @Id
    @SequenceGenerator(
            name = "order_sequence",
            sequenceName = "order_sequence",
            allocationSize = 1

    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "order_sequence"
    )
    private long id;

    @ManyToOne(fetch = FetchType.EAGER ,optional = false)
    @JoinColumn(name = "car_id")
    private Car car;

    @ManyToOne(fetch = FetchType.EAGER ,optional = false)
    @JoinColumn(name = "user_entity_id")
    private UserEntity userEntity;

    private int rentalDays;

    private Date bookingDate = new Date(System.currentTimeMillis());

    private Date startDate;
    private Date endingDate;


    public Reservation() {
    }



    public Reservation(long id, Car car, UserEntity userEntity, int rentalDays, Date bookingDate) {
        this.id = id;
        this.car = car;
        this.userEntity = userEntity;
        this.rentalDays = rentalDays;
        this.bookingDate = bookingDate;
    }

    public Reservation(long id, Car car, UserEntity userEntity, Date bookingDate) {
        this.id = id;
        this.car = car;
        this.userEntity = userEntity;
        this.bookingDate = bookingDate;
    }

    public Reservation(Car car, UserEntity userEntity, Date bookingDate) {
        this.car = car;
        this.userEntity = userEntity;
        this.bookingDate = bookingDate;
    }

    public Reservation(Car car, UserEntity userEntity, int rentalDays, Date bookingDate, Date startDate, Date endingDate) {
        this.car = car;
        this.userEntity = userEntity;
        this.rentalDays = rentalDays;
        this.bookingDate = bookingDate;
        this.startDate = startDate;
        this.endingDate = endingDate;
    }

    public int getRentalDays() {
        return rentalDays;
    }

    public void setRentalDays(int rentalDays) {
        this.rentalDays = rentalDays;
    }

    public Date getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(Date bookingDate) {
        this.bookingDate = bookingDate;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    public UserEntity getUserEntity() {
        return userEntity;
    }

    public void setUserEntity(UserEntity userEntity) {
        this.userEntity = userEntity;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndingDate() {
        return endingDate;
    }

    public void setEndingDate(Date endingDate) {
        this.endingDate = endingDate;
    }
}
