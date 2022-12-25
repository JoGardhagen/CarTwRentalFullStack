package com.gardhagen.carTwRental.contorller;

import com.gardhagen.carTwRental.model.Car;
import com.gardhagen.carTwRental.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1")
public class CarController {
    @Autowired
    private CarService carService;

    @GetMapping("/cars")
    public List<Car>getCar(){return carService.getAllCars();}

    @PostMapping("/addcar")
    public ResponseEntity<Car> addCar(@RequestBody Car car){
        return new ResponseEntity<Car>(carService.addCar(car), HttpStatus.CREATED);
    }
    @PutMapping("/updatecar/{id}")
    public ResponseEntity<Car> updateCar(@PathVariable("id")long id,@RequestBody Car car){
        return new ResponseEntity<Car>(carService.updateCar(car,id),HttpStatus.OK);
    }
    @DeleteMapping("/deletecar/{id}")
    public ResponseEntity<String> deleteCar(@PathVariable("id")Long id){
        carService.deleteCar(id);
        return new ResponseEntity<String>("Car Deleted",HttpStatus.OK);
    }
//en äldre växlings anrop för all bilar
//    @GetMapping("/exchange")
//    public List<RentalPriceCurrencyExchangeDTO> getRentalPraices(){
//        return carService.getRentalPriceses();
//    }


}
