package com.spotipie.services;

import org.springframework.stereotype.Service;

import com.spotipie.domain.User;
import com.spotipie.repository.user.UserRepository;

@Service
public class UserService {

  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public User getUserProfile(String token) {
    return userRepository.getUserProfile(token);
  }
}
