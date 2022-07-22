package com.nicken.fcbbackend.repositories;

import com.nicken.fcbbackend.transaction.Transaction;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ITransactionRepository extends JpaRepository<Transaction, Long> {
    @Query("SELECT t, p.name, f.name FROM Transaction t INNER JOIN t.player p INNER JOIN t.fine f WHERE p.id = t.player.id AND f.id = t.fine.id AND t.timestampDeleted IS NULL AND t.timestampPaid IS NULL")
    List<Transaction> findAll();
}
