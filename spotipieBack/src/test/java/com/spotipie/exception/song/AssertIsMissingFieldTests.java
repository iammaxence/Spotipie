package com.spotipie.exception.song;

import static org.junit.Assert.assertEquals;

import org.junit.jupiter.api.Test;

public class AssertIsMissingFieldTests {
  
  @Test
  public void should_get_field_name() {
    String fieldName = "title";
    String value = "value";
    AssertIsMissingField exception = new AssertIsMissingField(fieldName, value);

    String expectedMessage = "[Song] The field " + fieldName + " is not valid : " + value;
    String actualMessage = exception.getMessage();

    assertEquals(expectedMessage, actualMessage);
  }
}
