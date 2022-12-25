package com.gardhagen.carTwRental.repository;

import com.gardhagen.carTwRental.model.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityRepository extends JpaRepository<Authority,Long> {
}
