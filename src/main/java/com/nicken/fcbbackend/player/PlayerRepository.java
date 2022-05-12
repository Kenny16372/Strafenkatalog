package com.nicken.fcbbackend.player;

import java.util.HashMap;
import java.util.Optional;

import org.springframework.stereotype.Repository;

@Repository
public class PlayerRepository implements IPlayerRepository {
    private HashMap<Long, Player> players = new HashMap<>();

    @Override
    public long count() {
        return this.players.size();
    }

    @Override
    public void delete(Player player) {
        this.players.remove(player.getId());
    }

    @Override
    public void deleteAll() {
        throw new UnsupportedOperationException();
    }

    @Override
    public void deleteAll(Iterable<? extends Player> players) {
        throw new UnsupportedOperationException();
    }

    @Override
    public void deleteAllById(Iterable<? extends Long> ids) {
        throw new UnsupportedOperationException();
    }

    @Override
    public void deleteById(Long id) {
        this.players.remove(id);
    }

    @Override
    public boolean existsById(Long id) {
        throw new UnsupportedOperationException();
    }

    @Override
    public Iterable<Player> findAll() {
        return this.players.values();
    }

    @Override
    public Iterable<Player> findAllById(Iterable<Long> ids) {
        throw new UnsupportedOperationException();
    }

    @Override
    public Optional<Player> findById(Long id) {
        return this.players.containsKey(id) ? Optional.of(this.players.get(id)) : Optional.empty();
    }

    @Override
    public <S extends Player> S save(S player) {
        var id = (long) this.players.size();
        player.setId(id);
        this.players.put(id, player);
        return player;
    }

    @Override
    public <S extends Player> Iterable<S> saveAll(Iterable<S> players) {
        throw new UnsupportedOperationException();
    }

}
