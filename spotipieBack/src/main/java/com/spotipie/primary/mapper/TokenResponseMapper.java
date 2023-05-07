package com.spotipie.primary.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import com.spotipie.domain.entity.Token;
import com.spotipie.primary.response.TokenResponse;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN)
public interface TokenResponseMapper {
  TokenResponseMapper INSTANCE = Mappers.getMapper(TokenResponseMapper.class);

  @Mapping(target="accessToken", source="tokenResponse.access_token")
  @Mapping(target="refreshToken", source="tokenResponse.refresh_token")
  @Mapping(target="expiresIn", source="tokenResponse.expires_in")
  Token tokenResponseToToken(TokenResponse tokenResponse);
}
