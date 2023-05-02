package com.spotipie.exception.token;

import com.spotipie.exception.AssertMissingValue;

public class AssertIsMissingState extends AssertMissingValue{

  public AssertIsMissingState(String fieldName, String value) {
    super(fieldName, value);
  }
}
