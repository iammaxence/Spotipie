package com.spotipie.secondary.repository.user.response;

public class ImageResponse {
    private String url;
    

  public ImageResponse() {
  }
  
  public ImageResponse(String url) {
    this.url = url;
  }

  public String getUrl() {
    return this.url;
  }

  public void setUrl(String url) {
    this.url = url;
  }
}
