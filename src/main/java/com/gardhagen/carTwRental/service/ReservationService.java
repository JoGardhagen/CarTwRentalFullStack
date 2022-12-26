package com.gardhagen.carTwRental.service;


import com.gardhagen.carTwRental.exception.ResourceNotFoundException;
import com.gardhagen.carTwRental.model.Reservation;
import com.gardhagen.carTwRental.model.UserEntity;
import com.gardhagen.carTwRental.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ReservationService implements ReservationServiceInterface {
    @Autowired
    private ReservationRepository reservationRepository;

    public Set<Reservation> findByUserEntity(UserEntity user) {
        return reservationRepository.findByUserEntity(user);
    }

//    @Autowired
//    private RestTemplate restTemplate;

    @Override
    public Reservation addRent(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    @Override
    public List<Reservation> getAllRents() {
        return reservationRepository.findAll();
    }

    @Override
    public Reservation getRentById(long id) {
        return null;
    }

    @Override
    public Reservation updateRent(Reservation reservation, long id) {
        Reservation reservationOrder = reservationRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Rent","Id",id));
        reservationOrder.setCar(reservation.getCar());
        reservationOrder.setUserEntity(reservation.getUserEntity());
        reservationOrder.setRentalDays(reservation.getRentalDays());
        reservationOrder.setActive(reservation.isActive());
        return reservationOrder;
    }
    @Override
    public Reservation cancelOrder(Reservation reservation, long id) {
        Reservation reservationOrder = reservationRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Rent","Id",id));
        reservationOrder.setCar(reservation.getCar());
        reservationOrder.setUserEntity(reservation.getUserEntity());
        reservationOrder.setRentalDays(reservation.getRentalDays());
        reservationOrder.setActive(reservation.isActive());
        return reservationOrder;
    }

    @Override
    public void deleteRent(long id) {
    }
    //MicroService Call here! ///
//    public List<OrderCurrencyExchangeDTO> getTotalPriceExchanged(){
//        return rentRepository.findAll()
//                .stream()
//                .map(this::convertVoToDTO)
//                .collect(Collectors.toList());
//    }
//    public OrderCurrencyExchangeDTO convertVoToDTO(Reservation reservation){
//        ResponseTemplateRentalVO vo = new ResponseTemplateRentalVO();
//        Currency currency = restTemplate.getForObject("http://localhost:5050/currency/1",Currency.class);// call here
//        vo.setCurrency(currency);
//        vo.setRent(reservation);
//        OrderCurrencyExchangeDTO orderCurrencyExchangeDTO = new OrderCurrencyExchangeDTO();
//        orderCurrencyExchangeDTO.setRentalId(reservation.getId());
//        orderCurrencyExchangeDTO.setCustumerId(reservation.getCustomer().getId());
//        orderCurrencyExchangeDTO.setCustomerFirstName(reservation.getCustomer().getFirstName());
//        orderCurrencyExchangeDTO.setCustomerLastName(reservation.getCustomer().getLastName());
//        orderCurrencyExchangeDTO.setCarId(reservation.getCar().getId());
//        orderCurrencyExchangeDTO.setCarBrand(reservation.getCar().getBrand());
//        orderCurrencyExchangeDTO.setCarRentalCost(reservation.getCar().getRentalPrice());
//        orderCurrencyExchangeDTO.setRentalDays(reservation.getRentalDays());
//        orderCurrencyExchangeDTO.setTotalCost(reservation.getCar().getRentalPrice()* reservation.getRentalDays());
//        orderCurrencyExchangeDTO.setCurrencyName(currency.getCurrencyName());
//        orderCurrencyExchangeDTO.setCurrencyValue(currency.getValue());
//        orderCurrencyExchangeDTO.setExchangedValue((reservation.getCar().getRentalPrice()* reservation.getRentalDays())/currency.getValue());
//        orderCurrencyExchangeDTO.setOrderdate(reservation.getBookingDate());
//
//        return orderCurrencyExchangeDTO;
//    }
    //////////////////////////////////////////////////////////////////////////////

}
