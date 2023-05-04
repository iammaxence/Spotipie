package com.spotipie.repository.user.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import com.spotipie.domain.Image;
import com.spotipie.domain.User;
import com.spotipie.repository.user.response.ImageResponse;
import com.spotipie.repository.user.response.UserResponse;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN)
public interface UserResponseMapper {
  UserResponseMapper INSTANCE = Mappers.getMapper(UserResponseMapper.class);
  
  @Mapping(target="pseudo", source="display_name")
  User toUser(UserResponse userResponse);

  Image toImage(ImageResponse imageResponse);
}
