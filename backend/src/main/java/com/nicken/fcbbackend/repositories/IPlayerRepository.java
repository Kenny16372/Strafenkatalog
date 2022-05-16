package com.nicken.fcbbackend.repositories;

import com.nicken.fcbbackend.player.Player;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPlayerRepository extends JpaRepository<Player, Long> {

}
