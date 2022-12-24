package com.gardhagen.carTwRental.service;

import com.gardhagen.carTwRental.model.UserEntity;
import com.gardhagen.carTwRental.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceDetailsImpl implements UserDetailsService {

//    @Autowired
//    private CustomPasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<UserEntity> userOpt = userRepository.findByUsername(username);

        return userOpt.orElseThrow(()-> new UsernameNotFoundException("Invalid credentials"));


    }
    public UserEntity registerNewUser(UserEntity userEntity){return userRepository.save(userEntity);}
}
