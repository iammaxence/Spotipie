package com.spotipie.controller.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import com.spotipie.controller.request.TokenRequestBody;
import com.spotipie.domain.AuthorizationCredentials;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN)
public interface TokenRequestBodyMapper {
  TokenRequestBodyMapper INSTANCE = Mappers.getMapper(TokenRequestBodyMapper.class);

  AuthorizationCredentials toAuthorizationCredentials(TokenRequestBody tokenRequestBody);
}
