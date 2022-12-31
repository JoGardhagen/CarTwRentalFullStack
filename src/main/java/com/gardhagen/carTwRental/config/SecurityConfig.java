package com.gardhagen.carTwRental.config;

import com.gardhagen.carTwRental.filter.JwtFilter;
import com.gardhagen.carTwRental.repository.AuthorityRepository;
import com.gardhagen.carTwRental.util.CustomPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletResponse;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private CustomPasswordEncoder customPasswordEncoder;
    @Autowired
    private JwtFilter jwtFilter;
    @Autowired
    private AuthorityRepository authorityRepository;

    @Override @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception{
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(customPasswordEncoder.getPasswordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http = http.csrf().disable().cors().disable();

        http = http.sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and();
        http = http.exceptionHandling()
                .authenticationEntryPoint((request ,response ,ex) ->{
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, ex.getMessage());
                }).and();
        http.authorizeHttpRequests()
                .antMatchers("/api/auth/**").permitAll()
                .antMatchers("/api/v1/myorder/{id}").hasAuthority("ROLE_USER")
                .antMatchers("/api/v1/ordercar").hasAuthority("ROLE_USER")
                .antMatchers("/api/v1/myorders").hasAuthority("ROLE_USER")
                .antMatchers("/api/v1/cancelorder/{id}").hasAuthority("ROLE_USER")
                .antMatchers("/api/v1/orders").hasAuthority("ROLE_ADMIN")
                .antMatchers("/api/v1/addcar").hasAuthority("ROLE_ADMIN")
                .antMatchers("/api/v1/updatecar/{id}").hasAuthority("ROLE_ADMIN")
                .antMatchers("/api/v1//deletecar/{id}").hasAuthority("ROLE_ADMIN")
                .antMatchers("/api/v1/car/{id}").hasAuthority("ROLE_ADMIN")
                .antMatchers("/api/v1/customers").hasAuthority("ROLE_ADMIN")
                .anyRequest().authenticated();

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

    }
}
