package com.gardhagen.carTwRental.contorller;

import com.gardhagen.carTwRental.model.Reservation;
import com.gardhagen.carTwRental.model.UserEntity;
import com.gardhagen.carTwRental.repository.CarRepository;
import com.gardhagen.carTwRental.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;
    @Autowired
    private CarRepository carRepository;

    @GetMapping("orders")
    public ResponseEntity<?> getAllRents(@AuthenticationPrincipal UserEntity user){
        return ResponseEntity.ok(reservationService.getAllRents());
    }
    @GetMapping("/myorders")
    public ResponseEntity<?> getReservation(@AuthenticationPrincipal UserEntity user){
        return ResponseEntity.ok(reservationService.findByUserEntity(user));
    }

    @PostMapping("/ordercar")
    public ResponseEntity<?> createReservation(@AuthenticationPrincipal UserEntity user,@RequestBody Reservation reservation){
        reservation.setUserEntity(user);
        long diff = reservation.getEndingDate().getTime()-reservation.getStartDate().getTime();
        long diffToDays= diff/ (1000*60*60*24);
        int days= (int)diffToDays;
        reservation.setRentalDays(days);
        reservationService.creatAndSaveReservation(reservation);
        return ResponseEntity.ok(reservation);
    }

    @PutMapping("/cancelorder/{id}")
    public ResponseEntity<Reservation> canscelOrder(@PathVariable("id")long id, @RequestBody Reservation reservation){
        return new ResponseEntity<Reservation>(reservationService.updateRent(reservation,id),HttpStatus.OK);
    }

    @PutMapping("/myorder/{id}")
    public ResponseEntity<?>updateReservation(@PathVariable("id") long reservationId,
                                       @AuthenticationPrincipal UserEntity user,
                                       @RequestBody Reservation reservation){
        Reservation updatetdReservation = reservationService.addRent(reservation);
        return ResponseEntity.ok(updatetdReservation);
    }
    @GetMapping("/myorder/{id}")
    public ResponseEntity<?> getReservations(@PathVariable("id") long reservationId,@AuthenticationPrincipal UserEntity user){
        Optional<Reservation> reservationOpt = reservationService.findById(reservationId);
        return ResponseEntity.ok(reservationOpt.orElse(new Reservation()));
    }
}
