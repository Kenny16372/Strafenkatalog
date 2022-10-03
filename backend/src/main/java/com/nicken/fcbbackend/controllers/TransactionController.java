package com.nicken.fcbbackend.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import com.nicken.fcbbackend.transaction.Transaction;
import com.nicken.fcbbackend.transaction.TransactionNotFoundException;
import com.nicken.fcbbackend.transaction.TransactionRestModel;
import com.nicken.fcbbackend.services.PlayerService;
import com.nicken.fcbbackend.services.FineService;
import com.nicken.fcbbackend.services.TransactionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@CrossOrigin
@RequestMapping(path = "/api/transaction")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;
    @Autowired
    private PlayerService playerService;
    @Autowired
    private FineService fineService;

    @GetMapping("/{transactionId}")
    public ResponseEntity<TransactionRestModel> getTransactionById(@PathVariable long transactionId)
            throws TransactionNotFoundException {
        var transaction = this.transactionService.find(transactionId).orElseThrow(TransactionNotFoundException::new);

        var transactionRestModel = new TransactionRestModel();

        transactionRestModel.setId(transaction.getId());
        transactionRestModel.setPlayerId(transaction.getPlayer().getId());
        transactionRestModel.setFineId(transaction.getFine().getId());
        transactionRestModel.setAmount(transaction.getAmount());
        transactionRestModel.setCount(transaction.getCount());
        transactionRestModel.setTimestamp(transaction.getTimestamp());
        transactionRestModel.setTimestampPaid(transaction.getTimestampPaid());
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
            transactionRestModel.setPlayerId(transaction.getPlayer().getId());
            transactionRestModel.setPlayer(transaction.getPlayer().getName());
            transactionRestModel.setFineId(transaction.getFine().getId());
            transactionRestModel.setFine(transaction.getFine().getName());
            transactionRestModel.setAmount(transaction.getAmount());
            transactionRestModel.setCount(transaction.getCount());
            transactionRestModel.setTimestamp(transaction.getTimestamp());
            transactionRestModel.setTimestampPaid(transaction.getTimestampPaid());
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
        var fineId = transactionRestModel.getFineId();
        var amount = transactionRestModel.getAmount();
        var count = transactionRestModel.getCount();
        var player = playerService.find(playerId);
        var fine = fineService.find(fineId);

        if (player.isEmpty() || fine.isEmpty() || amount == null || count == null) {
            return ResponseEntity.badRequest().build();
        }
        transaction.setPlayer(player.orElseThrow());
        transaction.setFine(fine.orElseThrow());
        transaction.setAmount(amount);
        transaction.setCount(count);

        this.transactionService.save(transaction);

        transactionRestModel.setId(transaction.getId());

        return ResponseEntity.created(new URI(String.valueOf(transaction.getId()))).body(transactionRestModel);
    }

    @PatchMapping("/transactions")
    public ResponseEntity<Void> payFines(@RequestBody Long[] transactionIds) {
        for (var transactionId : transactionIds) {
            var transaction = this.transactionService.find(transactionId)
                    .orElseThrow(TransactionNotFoundException::new);
            // There's no other patch request, so only paying a fine is possible
            this.transactionService.payFine(transaction);
        }
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{transactionId}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable long transactionId) {
        var transaction = this.transactionService.find(transactionId).orElseThrow(TransactionNotFoundException::new);

        this.transactionService.delete(transaction);

        return ResponseEntity.ok().build();
    }
}
