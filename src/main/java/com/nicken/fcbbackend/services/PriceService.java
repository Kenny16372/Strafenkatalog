package com.nicken.fcbbackend.services;

import java.util.List;
import java.util.Optional;

import com.nicken.fcbbackend.price.Price;
import com.nicken.fcbbackend.repositories.IPriceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PriceService {
    @Autowired
    private IPriceRepository priceRepository;

    public List<Price> list() {
        return priceRepository.findAll();
    }

    public Long save(Price price) {
        return priceRepository.save(price).getId();
    }

    public void delete(long id) {
        priceRepository.deleteById(id);
    }

    public void delete(Price price) {
        this.delete(price.getId());
    }

    public Optional<Price> find(long id) {
        return priceRepository.findById(id);
    }
}
