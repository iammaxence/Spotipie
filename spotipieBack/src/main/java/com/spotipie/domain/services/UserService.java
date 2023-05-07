package com.spotipie.domain.services;

import org.springframework.stereotype.Service;

import com.spotipie.domain.entity.User;
import com.spotipie.secondary.repository.user.UserRepository;

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
