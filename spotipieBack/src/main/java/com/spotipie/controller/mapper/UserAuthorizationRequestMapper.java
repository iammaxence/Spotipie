package com.spotipie.controller.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import com.spotipie.controller.request.UserAuthorizationRequest;
import com.spotipie.domain.UserAuthorization;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN)
public interface UserAuthorizationRequestMapper {
  UserAuthorizationRequestMapper INSTANCE = Mappers.getMapper(UserAuthorizationRequestMapper.class);

  UserAuthorization userAuthorizationRequestToAuthorization(UserAuthorizationRequest userAuthorizationRequest);
}
