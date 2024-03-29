package com.spotipie.secondary.repository.user.response.user;

import java.util.List;

import com.spotipie.secondary.repository.user.response.ImageResponse;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
public class UserResponse {
  private String country;
  private String display_name;
  private String email;
  private List<ImageResponse> images;

  public UserResponse() {
  }

  @Builder
  public UserResponse(String country, String display_name, String email, List<ImageResponse> images) {
      this.country = country;
      this.display_name = display_name;
      this.email = email;
      this.images = images;
  }
}
