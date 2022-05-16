package com.nicken.fcbbackend.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import com.nicken.fcbbackend.transaction.Transaction;
import com.nicken.fcbbackend.transaction.TransactionNotFoundException;
import com.nicken.fcbbackend.transaction.TransactionRestModel;
import com.nicken.fcbbackend.services.TransactionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping(path = "/api/transaction")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @GetMapping("/{transactionId}")
    public ResponseEntity<TransactionRestModel> getTransactionById(@PathVariable long transactionId)
            throws TransactionNotFoundException {
        var transaction = this.transactionService.find(transactionId).orElseThrow(TransactionNotFoundException::new);

        var transactionRestModel = new TransactionRestModel();

        transactionRestModel.setId(transaction.getId());
        transactionRestModel.setPlayerId(transaction.getPlayerId());
        transactionRestModel.setPriceId(transaction.getPriceId());
        transactionRestModel.setAmount(transaction.getAmount());
        transactionRestModel.setCount(transaction.getCount());
        transactionRestModel.setTimestamp(transaction.getTimestamp());
        transactionRestModel.setTimestampDeleted(transaction.getTimestampDeleted());

        return ResponseEntity.ok(transactionRestModel);
    }

    @GetMapping("/transactions")
    public ResponseEntity<List<TransactionRestModel>> getTransactions() {
        var transactions = this.transactionService.list();

        var transactionRestModels = new ArrayList<TransactionRestModel>();

        for (var transaction : transactions) {
            var transactionRestModel = new TransactionRestModel();

            transactionRestModel.setId(transaction.getId());
            transactionRestModel.setPlayerId(transaction.getPlayerId());
            transactionRestModel.setPriceId(transaction.getPriceId());
            transactionRestModel.setAmount(transaction.getAmount());
            transactionRestModel.setCount(transaction.getCount());
            transactionRestModel.setTimestamp(transaction.getTimestamp());
            transactionRestModel.setTimestampDeleted(transaction.getTimestampDeleted());

            transactionRestModels.add(transactionRestModel);
        }

        return ResponseEntity.ok(transactionRestModels);
    }

    @PostMapping
    public ResponseEntity<TransactionRestModel> createTransaction(
            @RequestBody TransactionRestModel transactionRestModel)
            throws URISyntaxException {
        var transaction = new Transaction();

        var playerId = transactionRestModel.getPlayerId();
        var priceId = transactionRestModel.getPriceId();
        var amount = transactionRestModel.getAmount();
        var count = transactionRestModel.getCount();
        var timestamp = transactionRestModel.getTimestamp();

        if (playerId == null || priceId == null || amount == null || count == null || timestamp == null) {
            return ResponseEntity.badRequest().build();
        }
        transaction.setPlayerId(playerId);
        transaction.setPriceId(priceId);
        transaction.setAmount(amount);
        transaction.setCount(count);
        transaction.setTimestamp(timestamp);

        this.transactionService.save(transaction);

        transactionRestModel.setId(transaction.getId());

        return ResponseEntity.created(new URI(String.valueOf(transaction.getId()))).body(transactionRestModel);
    }

    @DeleteMapping("/{transactionId}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable long transactionId) {
        var transaction = this.transactionService.find(transactionId).orElseThrow(TransactionNotFoundException::new);

        this.transactionService.delete(transaction);

        return ResponseEntity.accepted().build();
    }
}
