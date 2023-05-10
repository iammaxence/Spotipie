package com.spotipie.primary.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spotipie.domain.entity.User;
import com.spotipie.domain.entity.song.Song;
import com.spotipie.domain.services.UserService;

@RestController
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }
  
  @GetMapping("/user")
  public ResponseEntity<User> getUser(@RequestParam String token ) {
    return ResponseEntity.ok().body(userService.getUserProfile(token));
  }

  @GetMapping("/user/top")
  public ResponseEntity<List<Song>> getTopSong(@RequestHeader("Authorization") String authHeader, @RequestParam String timeRange, @RequestParam int numberOfItems, @RequestParam int offset) {
    return ResponseEntity.ok().body(userService.getTopSongs(authHeader, timeRange, numberOfItems, offset));
  }
}
