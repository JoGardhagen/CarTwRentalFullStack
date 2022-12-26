package com.gardhagen.carTwRental.contorller;


import com.gardhagen.carTwRental.model.Reservation;
import com.gardhagen.carTwRental.model.UserEntity;
import com.gardhagen.carTwRental.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;
    @Autowired
    public ReservationController(ReservationService reservationService){this.reservationService = reservationService;}

    @GetMapping("/myorders")
    public List<Reservation> getAllRents(){return reservationService.getAllRents();}
    @PostMapping("/ordercar")
    public ResponseEntity<Reservation> addRent(@RequestBody Reservation reservation){
        return new ResponseEntity<Reservation>(reservationService.addRent(reservation), HttpStatus.CREATED);
    }
    @PutMapping("/cancelorder/{id}")
    public ResponseEntity<Reservation> canscelOrder(@PathVariable("id")long id, @RequestBody Reservation reservation){
        return new ResponseEntity<Reservation>(reservationService.updateRent(reservation,id),HttpStatus.OK);
    }

    @PutMapping("/updateorder/{id}")
    public ResponseEntity<Reservation> updateRent(@PathVariable("id")long id, @RequestBody Reservation reservation){
        return new ResponseEntity<Reservation>(reservationService.updateRent(reservation,id),HttpStatus.OK);
    }
    @GetMapping("/myorder")
    public ResponseEntity<?> getReservations(@AuthenticationPrincipal UserEntity user){
        return ResponseEntity.ok(reservationService.findByUserEntity(user));
    }
//    @GetMapping("/exchange")
//    public List<OrderCurrencyExchangeDTO> getTotalPriceExchanged(){ return reservationService.getTotalPriceExchanged();}
}
