package com.nicken.fcbbackend.services;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

import com.nicken.fcbbackend.player.Player;
import com.nicken.fcbbackend.repositories.IPlayerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlayerService {
    @Autowired
    private IPlayerRepository playerRepository;

    private Locale locale = new Locale("de", "de");

    public List<Player> list() {
        return playerRepository.findByTimestampDeletedIsNull();
    }

    public void save(Player player) {
        playerRepository.save(player);
    }

    public void delete(long id) {
        var playerOptional = this.find(id);
        if (playerOptional.isEmpty()) {
            return;
        }
        var player = playerOptional.orElseThrow();

        player.setTimestampDeleted(new Timestamp(Calendar.getInstance(locale).getTime().getTime()));

        playerRepository.save(player);
    }

    public void delete(Player player) {
        this.delete(player.getId());
    }

    public Optional<Player> find(Long id) {
        if (id == null) {
            return Optional.empty();
        }
        return playerRepository.findById(id);
    }
}
