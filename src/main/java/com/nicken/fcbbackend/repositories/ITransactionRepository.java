package com.nicken.fcbbackend.repositories;

import com.nicken.fcbbackend.transaction.Transaction;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITransactionRepository extends JpaRepository<Transaction, Long> {

}
