package com.team5.expoapi.controller;

import com.team5.expoapi.entities.Audience;
import com.team5.expoapi.entities.enums.EntityTypes;
import com.team5.expoapi.models.AudienceModel;
import com.team5.expoapi.models.AudienceRequestModel;
import com.team5.expoapi.models.ImageModel;
import com.team5.expoapi.models.PageAbleModel;
import com.team5.expoapi.models.ResponseModel;
import com.team5.expoapi.services.AudienceService;
import com.team5.expoapi.services.CommonImageService;
import java.io.IOException;
import java.lang.reflect.Type;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import javax.validation.Valid;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/audiences")
public class AudienceController {
  @Autowired
  private AudienceService audienceService;

  @Autowired
  private CommonImageService<Audience> ImageService;

  @GetMapping(produces = "application/json")
  public ResponseModel<PageAbleModel<AudienceModel>> findAll(
    @RequestParam(required = false) String username,
    @RequestParam(required = false) String email,
    @RequestParam(defaultValue = "asc") String sort,
    @RequestParam(defaultValue = "0") Integer page,
    @RequestParam(defaultValue = "10") Integer size
  )
    throws IOException {
    Audience entity = new Audience();
    Sort.Direction direction = sort != null
      ? Sort.Direction.valueOf(sort.toUpperCase())
      : null;

    Page<Audience> pageAudiences = audienceService.findAll(
      entity,
      page,
      size,
      direction
    );
    List<Audience> Audiences = pageAudiences.toList();

    ModelMapper modelMapper = new ModelMapper();
    Type type = new TypeToken<List<AudienceModel>>() {}.getType();

    List<AudienceModel> audienceModels = modelMapper.map(Audiences, type);

    for (AudienceModel audienceModel : audienceModels) {
      Audience item = audienceService.findById(audienceModel.getId());
      List<ImageModel> images = new ArrayList<>();
      List<Path> paths = ImageService.findAll(item);
      for (Path path : paths) {
        ImageModel imageData = ImageModel.from(
          audienceModel.getId(),
          path,
          EntityTypes.toEnum(1)
        );
        images.add(imageData);
      }

      audienceModel.setImages(images);
    }
    PageAbleModel<AudienceModel> data = new PageAbleModel<>(
      audienceModels,
      pageAudiences.getNumber(),
      pageAudiences.getSize(),
      pageAudiences.getTotalElements()
    );

    return ResponseModel.success(data);
  }

  @GetMapping(path = "/{id}", produces = "application/json")
  public ResponseModel<AudienceModel> findById(@PathVariable Integer id)
    throws IOException {
    Audience Audience = audienceService.findById(id);

    ModelMapper modelMapper = new ModelMapper();
    AudienceModel data = modelMapper.map(Audience, AudienceModel.class);

    Audience audience = audienceService.findById(data.getId());

    List<ImageModel> images = new ArrayList<>();
    List<Path> paths = ImageService.findAll(audience);
    for (Path path : paths) {
      ImageModel imageData = ImageModel.from(
        data.getId(),
        path,
        EntityTypes.toEnum(1)
      );
      images.add(imageData);
    }

    data.setImages(images);

    return ResponseModel.success(data);
  }

  @PostMapping(produces = "application/json", consumes = "application/json")
  public ResponseModel<AudienceModel> add(
    @RequestBody @Valid AudienceModel model
  ) {
    Audience addedAudience = audienceService.save(
      new Audience(
        model.getAge(),
        model.getPhone(),
        model.getGender(),
        model.getUser()
      )
    );

    ModelMapper modelMapper = new ModelMapper();
    AudienceModel data = modelMapper.map(addedAudience, AudienceModel.class);

    return ResponseModel.successAdd(data);
  }

  @PutMapping(
    path = "/{id}",
    produces = "application/json",
    consumes = "application/json"
  )
  public ResponseModel<AudienceModel> edit(
    @RequestParam(required = true) Integer type,
    @RequestBody @Valid AudienceRequestModel model
  )
    throws IOException {
    model.setId(model.getId());
    ModelMapper modelMapper = new ModelMapper();
    Audience entity = audienceService.findById(model.getId());
    modelMapper.map(model, entity);

    Audience editedAudience = audienceService.save(entity);

    AudienceModel data = modelMapper.map(editedAudience, AudienceModel.class);
    return ResponseModel.success(data);
  }

  @DeleteMapping(path = "/{id}", produces = "application/json")
  public ResponseModel<AudienceModel> delete(@PathVariable Integer id) {
    Audience deletedAudience = audienceService.removeById(id);

    ModelMapper modelMapper = new ModelMapper();
    AudienceModel data = modelMapper.map(deletedAudience, AudienceModel.class);

    return ResponseModel.success(data);
  }

  @DeleteMapping(produces = "application/json")
  public ResponseModel<List<AudienceModel>> delete(
    @RequestParam Integer[] ids
  ) {
    List<Audience> deletedAudiences = audienceService.removeAll(ids);
    ModelMapper modelMapper = new ModelMapper();
    Type type = new TypeToken<List<AudienceModel>>() {}.getType();
    List<AudienceModel> data = modelMapper.map(deletedAudiences, type);

    return ResponseModel.success(data);
  }
}
