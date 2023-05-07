package com.spotipie.primary.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import com.spotipie.domain.entity.UserAuthorization;
import com.spotipie.primary.request.UserAuthorizationRequest;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN)
public interface UserAuthorizationRequestMapper {
  UserAuthorizationRequestMapper INSTANCE = Mappers.getMapper(UserAuthorizationRequestMapper.class);

  UserAuthorization userAuthorizationRequestToAuthorization(UserAuthorizationRequest userAuthorizationRequest);
}
