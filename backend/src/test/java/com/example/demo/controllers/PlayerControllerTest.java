package com.example.demo.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nicken.fcbbackend.controllers.PlayerController;
import com.nicken.fcbbackend.player.Player;
import com.nicken.fcbbackend.player.PlayerExceptionHandler;
import com.nicken.fcbbackend.services.PlayerService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@ExtendWith(MockitoExtension.class)
public class PlayerControllerTest {
        private MockMvc mvc;

        @Mock
        private PlayerService playerService;

        @InjectMocks
        private PlayerController controller;

        private JacksonTester<Player> jsonPlayer;
        private JacksonTester<List<Player>> jsonPlayers;

        @BeforeEach
        public void init() {
                JacksonTester.initFields(this, new ObjectMapper());

                mvc = MockMvcBuilders.standaloneSetup(controller)
                                .setControllerAdvice(PlayerExceptionHandler.class)
                                .build();
        }

        @Test
        public void canRetrieveByIdWhenExists() throws Exception {
                final long id = 2;

                given(playerService.find(id)).willReturn(Optional.of(new Player(id, "Kenny")));

                MockHttpServletResponse response = mvc.perform(
                                get("/api/player/" + id)
                                                .accept(MediaType.APPLICATION_JSON))
                                .andReturn().getResponse();

                assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
                assertThat(response.getContentAsString()).isEqualTo(
                                jsonPlayer.write(new Player(id, "Kenny")).getJson());
        }

        @Test
        public void notFoundWhenRetrievingNonExistingPlayer() throws Exception {
                final long id = 2;

                given(playerService.find(id)).willReturn(Optional.empty());

                MockHttpServletResponse response = mvc.perform(
                                get("/api/player/" + id)
                                                .accept(MediaType.APPLICATION_JSON))
                                .andReturn().getResponse();

                assertThat(response.getStatus()).isEqualTo(HttpStatus.NOT_FOUND.value());
                assertThat(response.getContentAsString()).isEmpty();
        }

        @Test
        public void returnsCorrectPlayerList() throws Exception {
                var players = new ArrayList<Player>();
                players.add(new Player(1l, "Kenny"));
                players.add(new Player(2l, "Gumba"));
                players.add(new Player(3l, "Michi"));
                players.add(new Player(4l, "Luis"));

                given(playerService.list()).willReturn(players);

                MockHttpServletResponse response = mvc.perform(
                                get("/api/player/players")
                                                .accept(MediaType.APPLICATION_JSON))
                                .andReturn().getResponse();

                assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
                assertThat(response.getContentAsString()).isEqualTo(jsonPlayers.write(players).getJson());
        }
}
