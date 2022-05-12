package com.example.demo.player;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.List;

import com.nicken.fcbbackend.player.Player;
import com.nicken.fcbbackend.player.PlayerRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class PlayerRepositoryTest {
    private PlayerRepository playerRepository;

    private final Player player = new Player(1, "Kenny");
    private final Player player2 = new Player(2, "Luis");

    @BeforeEach
    void init() {
        playerRepository = new PlayerRepository();
    }

    @Test
    void insertWorks() {
        var sizeBefore = playerRepository.count();
        playerRepository.save(player);
        assertEquals(sizeBefore + 1, playerRepository.count());
        var p = playerRepository.findById(player.getId());
        assertTrue(p.isPresent());
        assertEquals(player, p.get());
    }

    @Test
    void deleteWorks() {
        playerRepository.save(player);
        playerRepository.delete(player);
        assertFalse(playerRepository.findById(player.getId()).isPresent());
    }

    @Test
    void deleteByIdWorks() {
        playerRepository.save(player);
        playerRepository.deleteById(player.getId());
        assertFalse(playerRepository.findById(player.getId()).isPresent());
    }

    @Test
    void findAllReturnsEveryone() {
        List<Player> groundTruth = new ArrayList<Player>();
        groundTruth.add(player);
        groundTruth.add(player2);

        groundTruth.forEach(p -> playerRepository.save(p));

        List<Player> actual = new ArrayList<Player>();
        playerRepository.findAll().forEach(actual::add);

        assertArrayEquals(groundTruth.toArray(), actual.toArray());
    }

    @Test
    void findByIdReturnsExisting() {
        playerRepository.save(player);
        var p = playerRepository.findById(player.getId());
        assertEquals(player, p.get());
    }

    @Test
    void findByIdDoesntReturnNonExisting() {
        long notAnId = 123456;
        playerRepository.save(player);
        assertFalse(playerRepository.findById(notAnId).isPresent());
    }
}
