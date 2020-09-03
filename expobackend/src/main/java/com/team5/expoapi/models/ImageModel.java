package com.team5.expoapi.models;

import com.team5.expoapi.entities.enums.EntityTypes;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

public class ImageModel {
  private String fileName;
  private String url;
  private String type;
  private Long size;

  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public Long getSize() {
    return size;
  }

  public void setSize(Long size) {
    this.size = size;
  }

  public String getFileName() {
    return fileName;
  }

  public void setFileName(String fileName) {
    this.fileName = fileName;
  }

  public static ImageModel from(Integer id, Path path, EntityTypes entity)
    throws IOException {
    String fileName = path.getFileName().toString();
    String url = ServletUriComponentsBuilder
      .fromCurrentContextPath()
      .path("/" + entity.toString().toLowerCase() + "s/" + id + "/images/")
      .path(fileName)
      .toUriString();
    ImageModel itemImage = new ImageModel();
    itemImage.setFileName(fileName);
    itemImage.setUrl(url);
    itemImage.setType(Files.probeContentType(path));
    itemImage.setSize(Files.size(path));

    return itemImage;
  }
}
