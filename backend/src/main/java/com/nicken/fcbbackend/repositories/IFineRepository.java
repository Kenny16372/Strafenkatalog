package com.nicken.fcbbackend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nicken.fcbbackend.fine.Fine;

@Repository
public interface IFineRepository extends JpaRepository<Fine, Long> {
    public List<Fine> findByTimestampDeletedIsNull();
}
