package com.nicken.fcbbackend.repositories;

import com.nicken.fcbbackend.price.Price;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPriceRepository extends JpaRepository<Price, Long> {

}
