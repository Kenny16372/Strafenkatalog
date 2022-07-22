package com.nicken.fcbbackend.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import com.nicken.fcbbackend.fine.Fine;
import com.nicken.fcbbackend.fine.FineNotFoundException;
import com.nicken.fcbbackend.fine.FineRestModel;
import com.nicken.fcbbackend.services.FineService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@CrossOrigin
@RestController
@RequestMapping(path = "/api/fine")
public class FineController {
    @Autowired
    private FineService fineService;

    @GetMapping("/{fineId}")
    public ResponseEntity<FineRestModel> getFineById(@PathVariable long fineId) throws FineNotFoundException {
        var fine = this.fineService.find(fineId).orElseThrow(FineNotFoundException::new);

        var fineRestModel = new FineRestModel();
        fineRestModel.setId(fine.getId());
        fineRestModel.setName(fine.getName());
        fineRestModel.setAmount(fine.getAmount());

        return ResponseEntity.ok(fineRestModel);
    }

    @GetMapping("/fines")
    public ResponseEntity<List<FineRestModel>> getFines() {
        var fines = this.fineService.list();

        var fineRestModels = new ArrayList<FineRestModel>();

        for (var fine : fines) {
            var fineRestModel = new FineRestModel();
            fineRestModel.setId(fine.getId());
            fineRestModel.setName(fine.getName());
            fineRestModel.setAmount(fine.getAmount());
            fineRestModels.add(fineRestModel);
        }

        return ResponseEntity.ok(fineRestModels);
    }

    @PostMapping
    public ResponseEntity<FineRestModel> createFine(@RequestBody FineRestModel fineRestModel)
            throws URISyntaxException {
        var fine = new Fine();

        var name = fineRestModel.getName();
        var amount = fineRestModel.getAmount();
        if (name == null || amount == null) {
            return ResponseEntity.badRequest().build();
        }
        fine.setName(name);
        fine.setAmount(amount);

        this.fineService.save(fine);

        fineRestModel.setId(fine.getId());

        return ResponseEntity.created(new URI(String.valueOf(fine.getId()))).body(fineRestModel);
    }

    @PutMapping("/{fineId}")
    public ResponseEntity<Void> updateFine(@PathVariable long fineId,
            @RequestBody FineRestModel fineRestModel) {
        var fine = this.fineService.find(fineId).orElseThrow(FineNotFoundException::new);

        var name = fineRestModel.getName();
        var amount = fineRestModel.getAmount();
        if (name == null || amount == null) {
            return ResponseEntity.badRequest().build();
        }
        fine.setName(name);
        fine.setAmount(amount);

        this.fineService.save(fine);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{fineId}")
    public ResponseEntity<Void> deleteFine(@PathVariable long fineId) {
        var fine = this.fineService.find(fineId).orElseThrow(FineNotFoundException::new);

        this.fineService.delete(fine);

        return ResponseEntity.accepted().build();
    }
}
