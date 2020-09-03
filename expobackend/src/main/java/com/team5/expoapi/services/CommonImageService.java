package com.team5.expoapi.services;

import com.team5.expoapi.entities.enums.ImageTypes;
import java.io.IOException;
import java.nio.file.Path;
import java.util.List;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface CommonImageService<E> {
  public Resource load(E entity, String fileName) throws IOException;

  public boolean delete(E entity, String fileName) throws IOException;

  public Path save(E entity, MultipartFile file, ImageTypes type)
    throws IOException;

  public Path saveFromOAuth(E entity, String url, ImageTypes type)
    throws IOException;

  public List<Path> findAll(E entity) throws IOException;
}
