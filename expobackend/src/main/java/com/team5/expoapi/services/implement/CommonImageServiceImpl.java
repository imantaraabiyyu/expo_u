package com.team5.expoapi.services.implement;

import com.team5.expoapi.configs.ApplicationProperties;
import com.team5.expoapi.entities.AbstractEntity;
import com.team5.expoapi.entities.enums.ImageTypes;
import com.team5.expoapi.exceptions.FileNotFoundException;
import com.team5.expoapi.services.CommonImageService;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.web.multipart.MultipartFile;

public abstract class CommonImageServiceImpl<E extends AbstractEntity>
  implements CommonImageService<E> {

  protected abstract String getType();

  private Path parentDir;

  @Autowired
  private ApplicationProperties properties;

  @PostConstruct
  public void init() throws IOException {
    parentDir =
      Paths
        .get(properties.getDataDir(), "/images/" + getType())
        .toAbsolutePath()
        .normalize();

    Files.createDirectories(parentDir);
  }

  @Override
  public Path save(E entity, MultipartFile file, ImageTypes type)
    throws IOException {
    Integer id = entity.getId();
    Path dir = parentDir.resolve(id.toString());
    Files.createDirectories(dir);

    String filetype = file
      .getOriginalFilename()
      .substring(file.getOriginalFilename().lastIndexOf(".") + 1);

    String filename = type.name().toLowerCase() + "." + filetype;
    Path target = dir.resolve(filename);
    Files.copy(
      file.getInputStream(),
      target,
      StandardCopyOption.REPLACE_EXISTING
    );

    return target;
  }

  @Override
  public Path saveFromOAuth(E entity, String url, ImageTypes type)
    throws IOException {
    Integer id = entity.getId();
    Path dir = parentDir.resolve(id.toString());
    Files.createDirectories(dir);

    InputStream in = new URL(url).openStream();

    Path target = dir.resolve("profile.jpg");
    Files.copy(in, target, StandardCopyOption.REPLACE_EXISTING);

    return target;
  }

  @Override
  public List<Path> findAll(E entity) throws IOException {
    Integer id = entity.getId();
    Path dir = parentDir.resolve(id.toString());

    return Files.isDirectory(dir)
      ? Files.list(dir).collect(Collectors.toList())
      : Collections.emptyList();
  }

  @Override
  public Resource load(E entity, String fileName) throws IOException {
    Integer id = entity.getId();
    Path target = parentDir.resolve(id.toString()).resolve(fileName);
    Resource resource = new UrlResource(target.toUri());

    if (!target.toFile().exists()) {
      throw new FileNotFoundException();
    }

    return resource;
  }

  @Override
  public boolean delete(E entity, String fileName) throws IOException {
    Integer id = entity.getId();
    Path target = parentDir.resolve(id.toString()).resolve(fileName);

    return Files.deleteIfExists(target);
  }
}
