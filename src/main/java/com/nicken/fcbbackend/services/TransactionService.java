package com.nicken.fcbbackend.services;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

import com.nicken.fcbbackend.repositories.ITransactionRepository;
import com.nicken.fcbbackend.transaction.Transaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {
    @Autowired
    private ITransactionRepository transactionRepository;

    public List<Transaction> list() {
        return transactionRepository.findAll();
    }

    public Long save(Transaction transaction) {
        var id = transaction.getId();
        if (id != null && this.find(id).isPresent()) {
            return id;
        }
        return transactionRepository.save(transaction).getId();
    }

    public void delete(long id) {
        var transactionOptional = this.find(id);
        if (transactionOptional.isEmpty()) {
            return;
        }
        var transaction = transactionOptional.orElseThrow();

        var locale = new Locale("de", "de");
        transaction.setTimestampDeleted(new Timestamp(Calendar.getInstance(locale).getTime().getTime()));
    }

    public void delete(Transaction transaction) {
        this.delete(transaction.getId());
    }

    public Optional<Transaction> find(long id) {
        return transactionRepository.findById(id);
    }
}
