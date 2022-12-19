package com.gardhagen.carTwRental.util;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import com.gardhagen.carTwRental.filter.FilterConstats;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import static com.gardhagen.carTwRental.filter.FilterConstats.*;

@Component
public class JwtUtil implements Serializable{

    private static final long serialVersionUID = -2550185165626007488L;

    public static final long JWT_TOKEN_VALIDITY = 30 * 24 * 60 * 60;

//    @Value("${jwt.secret}")
//    private String secret;

    public String getUsernameFromToken(String token){
        return getClaimFromToken(token, Claims::getSubject);
    }
    public Date getIssuedAtDateFrom(String token){
        return getClaimFromToken(token, Claims::getIssuedAt);
    }
    public Date getExpirationDateFromToken(String token){
        return getClaimFromToken(token, Claims::getExpiration);
    }
    public <T> T getClaimFromToken(String token, Function<Claims,T> clamsResolver){
        final Claims claims = getAllClaimsFromToken(token);
        return clamsResolver.apply(claims);
    }
    public Claims getAllClaimsFromToken(String token){
        return Jwts.parser().setSigningKey(FilterConstats.JWT_SECRET).parseClaimsJws(token).getBody();
    }
    private Boolean isTokenExpierd(String token){
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }
    private Boolean ignoreTokenExpiration(String token){
        //here you specify tokens, for that the expiration is ignored
        return false;
    }
    public String generateToken(UserDetails userDetails){
        Map<String,Object> claims = new HashMap<>();
        return doGenerateToken(claims,userDetails.getUsername());
    }
    private String doGenerateToken(Map<String ,Object> clams,String subject){
        return Jwts.builder().setClaims(clams).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+ JWT_TOKEN_VALIDITY*1000))
                .signWith(SignatureAlgorithm.HS512 , FilterConstats.JWT_SECRET).compact();
    }
    public Boolean canTokenBeRefreshed(String token){
        return (!isTokenExpierd(token) || ignoreTokenExpiration(token));
    }
    public Boolean validateToken(String token, UserDetails userDetails){
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpierd(token));
    }
}
