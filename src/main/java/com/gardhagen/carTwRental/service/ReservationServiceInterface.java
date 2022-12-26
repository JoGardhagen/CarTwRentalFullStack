package com.gardhagen.carTwRental.service;



import com.gardhagen.carTwRental.model.Reservation;

import java.util.List;

public interface ReservationServiceInterface {
    Reservation addRent(Reservation reservation);
    List<Reservation> getAllRents();
    Reservation getRentById(long id);
    Reservation updateRent(Reservation reservation, long id);

    Reservation cancelOrder(Reservation reservation, long id);

    void deleteRent(long id);
}
