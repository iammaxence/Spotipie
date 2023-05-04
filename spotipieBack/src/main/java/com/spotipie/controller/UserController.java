package com.spotipie.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spotipie.domain.User;
import com.spotipie.services.UserService;

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
}
