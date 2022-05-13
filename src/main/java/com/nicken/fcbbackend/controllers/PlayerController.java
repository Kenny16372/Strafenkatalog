package com.nicken.fcbbackend.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import com.nicken.fcbbackend.player.Player;
import com.nicken.fcbbackend.player.PlayerNotFoundException;
import com.nicken.fcbbackend.player.PlayerRestModel;
import com.nicken.fcbbackend.services.PlayerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
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
@RestController
@Order(2)
@RequestMapping(path = "/api/player")
public class PlayerController {
    @Autowired
    private PlayerService playerService;

    @GetMapping("/{playerId}")
    public ResponseEntity<PlayerRestModel> getPlayerById(@PathVariable long playerId) throws PlayerNotFoundException {
        var player = this.playerService.find(playerId).orElseThrow(PlayerNotFoundException::new);

        var playerRestModel = new PlayerRestModel();
        playerRestModel.setId(player.getId());
        playerRestModel.setName(player.getName());

        return ResponseEntity.ok(playerRestModel);
    }

    @GetMapping("/players")
    public ResponseEntity<List<PlayerRestModel>> getPlayers() {
        var players = this.playerService.list();

        var playerRestModels = new ArrayList<PlayerRestModel>();

        for (var player : players) {
            var playerRestModel = new PlayerRestModel();
            playerRestModel.setId(player.getId());
            playerRestModel.setName(player.getName());
            playerRestModels.add(playerRestModel);
        }

        return ResponseEntity.ok(playerRestModels);
    }

    @PostMapping
    public ResponseEntity<PlayerRestModel> createPlayer(@RequestBody PlayerRestModel playerRestModel)
            throws URISyntaxException {
        var player = new Player();

        var name = playerRestModel.getName();
        if (name == null) {
            return ResponseEntity.badRequest().build();
        }
        player.setName(name);

        this.playerService.save(player);

        playerRestModel.setId(player.getId());

        return ResponseEntity.created(new URI(String.valueOf(player.getId()))).body(playerRestModel);
    }

    @PutMapping("/{playerId}")
    public ResponseEntity<Void> updatePlayer(@PathVariable long playerId,
            @RequestBody PlayerRestModel playerRestModel) {
        var player = this.playerService.find(playerId).orElseThrow(PlayerNotFoundException::new);

        var name = playerRestModel.getName();
        if (name == null) {
            return ResponseEntity.badRequest().build();
        }
        player.setName(name);

        this.playerService.save(player);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{playerId}")
    public ResponseEntity<Void> deletePlayer(@PathVariable long playerId) {
        var player = this.playerService.find(playerId).orElseThrow(PlayerNotFoundException::new);

        this.playerService.delete(player);

        return ResponseEntity.accepted().build();
    }
}
