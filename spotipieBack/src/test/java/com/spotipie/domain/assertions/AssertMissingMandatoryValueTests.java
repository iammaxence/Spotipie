package com.spotipie.domain.assertions;

import org.junit.jupiter.api.Test;

import com.spotipie.domain.exception.MissingMandatoryValueException;

import java.util.List;
import static org.assertj.core.api.Assertions.*;

public class AssertMissingMandatoryValueTests {
  @Test
  public void testVerify_String_NullValue() {
      assertThatThrownBy(() -> AssertMissingMandatoryValue.verify("fieldName", null))
              .isInstanceOf(MissingMandatoryValueException.class)
              .hasMessage("fieldName is mandatory");
  }

  @Test
  public void testVerify_String_EmptyValue() {
      assertThatThrownBy(() -> AssertMissingMandatoryValue.verify("fieldName", ""))
              .isInstanceOf(MissingMandatoryValueException.class)
              .hasMessage("fieldName is mandatory");
  }

  @Test
  public void testVerify_List_NullValue() {
      assertThatThrownBy(() -> AssertMissingMandatoryValue.verifyArray("fieldName", null))
              .isInstanceOf(MissingMandatoryValueException.class)
              .hasMessage("fieldName is mandatory");
  }

  @Test
  public void testVerify_List_EmptyValue() {
      assertThatThrownBy(() -> AssertMissingMandatoryValue.verifyArray("fieldName", List.of()))
              .isInstanceOf(MissingMandatoryValueException.class)
              .hasMessage("fieldName is mandatory");
  }
}
