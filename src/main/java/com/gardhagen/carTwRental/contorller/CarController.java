package com.gardhagen.carTwRental.contorller;

import com.gardhagen.carTwRental.dto.CarDto;
import com.gardhagen.carTwRental.model.Car;
import com.gardhagen.carTwRental.model.UserEntity;
import com.gardhagen.carTwRental.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1")
public class CarController {
    @Autowired
    private CarService carService;

//    @GetMapping("/car")
//    public List<Car>getCar(){return carService.getAllCars();}

//    @GetMapping("/cars")
//    public ResponseEntity<?> getAllCars(@AuthenticationPrincipal UserEntity user){
//        return ResponseEntity.ok(carService.getAllCars());
//    }
    @GetMapping("/car/{id}")
    public ResponseEntity<?> getCar(@PathVariable("id")long carId,@AuthenticationPrincipal UserEntity user){
        return ResponseEntity.ok(carService.getCarById(carId));
    }
    @GetMapping("/cars")
    public ResponseEntity<?> getAllCars(@AuthenticationPrincipal UserEntity user){
        return ResponseEntity.ok(carService.getAllCars());
    }

    @PostMapping("/addcar")
    public ResponseEntity<Car> addCar(@AuthenticationPrincipal UserEntity user,@RequestBody Car car){
        return new ResponseEntity<Car>(carService.addCar(car), HttpStatus.CREATED);
    }
//    @PutMapping("/updatecar/{id}")
//    public ResponseEntity<Car> updateCar(@PathVariable("id")long id,@RequestBody Car car){
//        return new ResponseEntity<Car>(carService.updateCar(car,id),HttpStatus.OK);
//    }
    @PutMapping("/updatecar/{id}")
    public ResponseEntity<?> updateCar(@PathVariable("id")long carId,
                                       @AuthenticationPrincipal UserEntity user,
                                       @RequestBody Car car){
        Car updatedCar = carService.addCar(car);
        return  ResponseEntity.ok(updatedCar);
    }
//    @DeleteMapping("/deletecar/{id}")
//    public ResponseEntity<String> deleteCar(@PathVariable("id")Long id){
//        carService.deleteCar(id);
//        return new ResponseEntity<String>("Car Deleted",HttpStatus.OK);
//    }
    @DeleteMapping("/deletecar/{id}")
    public ResponseEntity<?> deleteCar(@AuthenticationPrincipal UserEntity user ,@PathVariable("id")long id){
    carService.deleteCar(id);
    return new ResponseEntity<String>("Car Deleted",HttpStatus.OK);
}
//en äldre växlings anrop för all bilar
//    @GetMapping("/exchange")
//    public List<RentalPriceCurrencyExchangeDTO> getRentalPraices(){
//        return carService.getRentalPriceses();
//    }


}
