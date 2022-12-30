package com.gardhagen.carTwRental.contorller;


import com.gardhagen.carTwRental.dto.ReservationDto;
import com.gardhagen.carTwRental.model.Car;
import com.gardhagen.carTwRental.model.Reservation;
import com.gardhagen.carTwRental.model.UserEntity;
import com.gardhagen.carTwRental.repository.CarRepository;
import com.gardhagen.carTwRental.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;
    @Autowired
    private CarRepository carRepository;
//    @Autowired
//    public ReservationController(ReservationService reservationService){this.reservationService = reservationService;}
    @GetMapping("orders")
    public ResponseEntity<?> getAllRents(@AuthenticationPrincipal UserEntity user){
        return ResponseEntity.ok(reservationService.getAllRents());
    }
    @GetMapping("/myorders")
    public ResponseEntity<?> getReservation(@AuthenticationPrincipal UserEntity user){
        return ResponseEntity.ok(reservationService.findByUserEntity(user));
    }

//    @GetMapping("/myorders")
//    public List<Reservation> getAllRents(){return reservationService.getAllRents();}
//    @PostMapping("/ordercar")
//    public ResponseEntity<Reservation> addRent(@RequestBody Reservation reservation){
//        return new ResponseEntity<Reservation>(reservationService.addRent(reservation), HttpStatus.CREATED);
//    }
//    @PostMapping("/ordercar")
//    public ResponseEntity<?> createReservation(@AuthenticationPrincipal UserEntity user,@RequestBody Car car){
//        ReservationDto newReservation = new ReservationDto();
//        newReservation.setCar(car);
//        newReservation.setUser(user);
//        reservationService.createReservation(newReservation);
//        return ResponseEntity.ok(newReservation);
//
//    }
//    @PostMapping("/ordercar")
//    public ResponseEntity<?> createReservation(@AuthenticationPrincipal UserEntity user,@RequestBody Reservation reservation){
//        reservationService.creatAndSaveReservation(reservation);
//        return ResponseEntity.ok(reservation);
//    }
@PostMapping("/ordercar")
public ResponseEntity<?> createReservation(@AuthenticationPrincipal UserEntity user,@RequestBody Car car){
    ReservationDto newReservation = new ReservationDto();
    newReservation.setCar(car);
    newReservation.setUser(user);
//    Reservation newReservation = reservationService.save(user);
    reservationService.createReservation(newReservation);

    return ResponseEntity.ok(newReservation);

}
    @PutMapping("/cancelorder/{id}")
    public ResponseEntity<Reservation> canscelOrder(@PathVariable("id")long id, @RequestBody Reservation reservation){
        return new ResponseEntity<Reservation>(reservationService.updateRent(reservation,id),HttpStatus.OK);
    }

//    @PutMapping("/updateorder/{id}")
//    public ResponseEntity<Reservation> updateRent(@PathVariable("id")long id, @RequestBody Reservation reservation){
//        return new ResponseEntity<Reservation>(reservationService.updateRent(reservation,id),HttpStatus.OK);
//    }
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
//    @GetMapping("/exchange")
//    public List<OrderCurrencyExchangeDTO> getTotalPriceExchanged(){ return reservationService.getTotalPriceExchanged();}
}
