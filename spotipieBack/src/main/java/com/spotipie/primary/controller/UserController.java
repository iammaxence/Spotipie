package com.spotipie.primary.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.spotipie.domain.entity.User;
import com.spotipie.domain.entity.song.Song;
import com.spotipie.domain.services.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }
  
  @GetMapping()
  public ResponseEntity<User> getUser(@RequestParam String token ) {
    return ResponseEntity.ok().body(userService.getUserProfile(token));
  }

  @GetMapping("/top")
  public ResponseEntity<List<Song>> getTopSong(@RequestHeader("Authorization") String authHeader, @RequestParam String timeRange, @RequestParam int numberOfItems, @RequestParam int offset) {
    return ResponseEntity.ok().body(userService.getTopSongs(authHeader, timeRange, numberOfItems, offset));
  }
}
