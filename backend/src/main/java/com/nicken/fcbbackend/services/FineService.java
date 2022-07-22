package com.nicken.fcbbackend.services;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

import com.nicken.fcbbackend.fine.Fine;
import com.nicken.fcbbackend.repositories.IFineRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FineService {
    @Autowired
    private IFineRepository fineRepository;

    private Locale locale = new Locale("de", "de");

    public List<Fine> list() {
        return fineRepository.findByTimestampDeletedIsNull();
    }

    public Long save(Fine fine) {
        return fineRepository.save(fine).getId();
    }

    public void delete(long id) {
        var fineOptional = this.find(id);
        if (fineOptional.isEmpty()) {
            return;
        }
        var player = fineOptional.orElseThrow();

        player.setTimestampDeleted(new Timestamp(Calendar.getInstance(locale).getTime().getTime()));

        fineRepository.save(player);
    }

    public void delete(Fine fine) {
        this.delete(fine.getId());
    }

    public Optional<Fine> find(Long id) {
        if (id == null) {
            return Optional.empty();
        }
        return fineRepository.findById(id);
    }
}
