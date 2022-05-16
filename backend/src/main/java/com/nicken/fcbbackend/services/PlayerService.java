package com.nicken.fcbbackend.services;

import java.util.List;
import java.util.Optional;

import com.nicken.fcbbackend.player.Player;
import com.nicken.fcbbackend.repositories.IPlayerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlayerService {
    @Autowired
    private IPlayerRepository playerRepository;

    public List<Player> list() {
        return playerRepository.findAll();
    }

    public void save(Player player) {
        playerRepository.save(player);
    }

    public void delete(long id) {
        playerRepository.deleteById(id);
    }

    public void delete(Player player) {
        this.delete(player.getId());
    }

    public Optional<Player> find(long id) {
        return playerRepository.findById(id);
    }
}
