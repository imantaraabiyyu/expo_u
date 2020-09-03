package com.team5.expoapi.controller.image;

import com.google.common.net.HttpHeaders;
import com.team5.expoapi.entities.EventOrganizer;
import com.team5.expoapi.entities.enums.EntityTypes;
import com.team5.expoapi.entities.enums.ImageTypes;
import com.team5.expoapi.models.ImageModel;
import com.team5.expoapi.models.ResponseModel;
import com.team5.expoapi.services.EventOrganizerImageService;
import com.team5.expoapi.services.EventOrganizerService;
import com.team5.expoapi.validation.annotations.ValidImage;
import io.swagger.annotations.ApiParam;
import java.io.IOException;
import java.net.URLConnection;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/eo/{id}/images")
@RestController
@Validated
public class EventOrganizerImageController {
  @Autowired
  private EventOrganizerService eventOrganizerService;

  @Autowired
  private EventOrganizerImageService service;

  @PostMapping
  public ResponseModel<List<ImageModel>> upload(
    @PathVariable Integer id,
    @RequestParam @ValidImage @ApiParam(
      name = "files",
      type = ".jpg/.jpeg/.png",
      value = "use this param to attach your files.",
      required = true
    ) MultipartFile file,
    @RequestParam(required = true) Integer type
  )
    throws IOException {
    EventOrganizer entity = eventOrganizerService.findById(id);
    List<ImageModel> data = new ArrayList<>();

    Path path = service.save(entity, file, ImageTypes.toEnum(type));
    ImageModel ImageData = ImageModel.from(id, path, EntityTypes.toEnum(4));
    data.add(ImageData);

    return ResponseModel.success(data);
  }

  @GetMapping
  public ResponseModel<List<ImageModel>> findAll(@PathVariable Integer id)
    throws IOException {
    EventOrganizer entity = eventOrganizerService.findById(id);
    List<ImageModel> data = new ArrayList<>();
    List<Path> paths = service.findAll(entity);

    for (Path path : paths) {
      ImageModel ImageData = ImageModel.from(id, path, EntityTypes.toEnum(4));
      data.add(ImageData);
    }
    return ResponseModel.success(data);
  }

  @GetMapping("/{filename}")
  public ResponseEntity<Resource> download(
    @PathVariable Integer id,
    @PathVariable String filename
  )
    throws IOException {
    EventOrganizer entity = eventOrganizerService.findById(id);
    Resource resource = service.load(entity, filename);

    String mediaType = URLConnection.guessContentTypeFromName(
      resource.getFilename()
    );
    return ResponseEntity
      .ok()
      .contentType(MediaType.parseMediaType(mediaType))
      .header(
        HttpHeaders.CONTENT_DISPOSITION,
        "attachment; filename=\"" + resource.getFilename() + "\""
      )
      .body(resource);
  }

  @DeleteMapping("/{filename}")
  public ResponseModel<Boolean> delete(
    @PathVariable Integer id,
    @PathVariable String filename
  )
    throws IOException {
    EventOrganizer entity = eventOrganizerService.findById(id);
    Boolean data = service.delete(entity, filename);
    return ResponseModel.success(data);
  }
}
