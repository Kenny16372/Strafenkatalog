package com.nicken.fcbbackend.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import com.nicken.fcbbackend.price.Price;
import com.nicken.fcbbackend.price.PriceNotFoundException;
import com.nicken.fcbbackend.price.PriceRestModel;
import com.nicken.fcbbackend.services.PriceService;

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
@RequestMapping(path = "/api/price")
public class PriceController {
    @Autowired
    private PriceService priceService;

    @GetMapping("/{priceId}")
    public ResponseEntity<PriceRestModel> getPriceById(@PathVariable long priceId) throws PriceNotFoundException {
        var price = this.priceService.find(priceId).orElseThrow(PriceNotFoundException::new);

        var priceRestModel = new PriceRestModel();
        priceRestModel.setId(price.getId());
        priceRestModel.setName(price.getName());
        priceRestModel.setAmount(price.getAmount());

        return ResponseEntity.ok(priceRestModel);
    }

    @GetMapping("/prices")
    public ResponseEntity<List<PriceRestModel>> getPrices() {
        var prices = this.priceService.list();

        var priceRestModels = new ArrayList<PriceRestModel>();

        for (var price : prices) {
            var priceRestModel = new PriceRestModel();
            priceRestModel.setId(price.getId());
            priceRestModel.setName(price.getName());
            priceRestModel.setAmount(price.getAmount());
            priceRestModels.add(priceRestModel);
        }

        return ResponseEntity.ok(priceRestModels);
    }

    @PostMapping
    public ResponseEntity<PriceRestModel> createPrice(@RequestBody PriceRestModel priceRestModel)
            throws URISyntaxException {
        var price = new Price();
        System.out.println("new");

        var name = priceRestModel.getName();
        var amount = priceRestModel.getAmount();
        if (name == null || amount == null) {
            return ResponseEntity.badRequest().build();
        }
        price.setName(name);
        price.setAmount(amount);

        this.priceService.save(price);

        priceRestModel.setId(price.getId());

        return ResponseEntity.created(new URI(String.valueOf(price.getId()))).body(priceRestModel);
    }

    @PutMapping("/{priceId}")
    public ResponseEntity<Void> updatePrice(@PathVariable long priceId,
            @RequestBody PriceRestModel priceRestModel) {
        var price = this.priceService.find(priceId).orElseThrow(PriceNotFoundException::new);

        var name = priceRestModel.getName();
        var amount = priceRestModel.getAmount();
        if (name == null || amount == null) {
            return ResponseEntity.badRequest().build();
        }
        price.setName(name);
        price.setAmount(amount);

        this.priceService.save(price);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{priceId}")
    public ResponseEntity<Void> deletePrice(@PathVariable long priceId) {
        var price = this.priceService.find(priceId).orElseThrow(PriceNotFoundException::new);

        this.priceService.delete(price);

        return ResponseEntity.accepted().build();
    }
}
