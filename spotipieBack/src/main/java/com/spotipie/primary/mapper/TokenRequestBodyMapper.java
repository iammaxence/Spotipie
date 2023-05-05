package com.spotipie.primary.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import com.spotipie.domain.entity.AuthorizationCredentials;
import com.spotipie.primary.request.TokenRequestBody;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN)
public interface TokenRequestBodyMapper {
  TokenRequestBodyMapper INSTANCE = Mappers.getMapper(TokenRequestBodyMapper.class);

  AuthorizationCredentials toAuthorizationCredentials(TokenRequestBody tokenRequestBody);
}
