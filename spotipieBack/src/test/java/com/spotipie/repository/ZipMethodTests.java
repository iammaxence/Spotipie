package com.spotipie.repository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.spotipie.repository.ZipMethod;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

@ExtendWith(MockitoExtension.class)
public class ZipMethodTests {

  @Mock
  private ZipFile zipFile;

  ZipMethod zipMethod;

  @BeforeEach
  public void init() {
    zipMethod = new ZipMethod();
  }

  @Test
  public void should_get_all_played_song() throws IOException {

  }
}
