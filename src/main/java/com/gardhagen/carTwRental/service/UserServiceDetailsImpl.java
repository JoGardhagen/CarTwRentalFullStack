package com.gardhagen.carTwRental.service;

import com.gardhagen.carTwRental.dto.UserDto;
import com.gardhagen.carTwRental.model.UserEntity;
import com.gardhagen.carTwRental.repository.UserRepository;
import com.gardhagen.carTwRental.util.CustomPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceDetailsImpl implements UserDetailsService {


    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<UserEntity> userOpt = userRepository.findByUsername(username);

        return userOpt.orElseThrow(()-> new UsernameNotFoundException("Invalid credentials"));


    }
    public UserEntity registerNewUser(UserEntity userEntity){return userRepository.save(userEntity);}
    public void createUser(UserDto userDto) {
        passwordEncoder = new BCryptPasswordEncoder();
        UserEntity newUser = new UserEntity();
        newUser.setUsername(userDto.getUsername());
//        newUser.setName(userDto.getName());
        String encodedPassword = passwordEncoder.encode(userDto.getPassword());
//        newUser.setPassword(passwordEncoder.encode((userDto.getPassword())));
        newUser.setPassword(encodedPassword);
        userRepository.save(newUser);
//        Authorities authority = new Authorities();
//        authority.setAuthority("ROLE_STUDENT");
//        authority.setUser(newUser);
//        authorityRepo.save(authority);

    }
}
