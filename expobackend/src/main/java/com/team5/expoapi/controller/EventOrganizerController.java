package com.team5.expoapi.controller;

import com.team5.expoapi.entities.EventOrganizer;
import com.team5.expoapi.entities.enums.EntityTypes;
import com.team5.expoapi.models.EventOrganizerModel;
import com.team5.expoapi.models.EventOrganizerRequestModel;
import com.team5.expoapi.models.ImageModel;
import com.team5.expoapi.models.PageAbleModel;
import com.team5.expoapi.models.ResponseModel;
import com.team5.expoapi.services.CommonImageService;
import com.team5.expoapi.services.EventOrganizerService;
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
@RequestMapping("/eo")
public class EventOrganizerController {
  @Autowired
  private EventOrganizerService eoService;

  @Autowired
  private CommonImageService<EventOrganizer> ImageService;

  @GetMapping(produces = "application/json")
  public ResponseModel<PageAbleModel<EventOrganizerModel>> findAll(
    @RequestParam(required = false) String username,
    @RequestParam(required = false) String email,
    @RequestParam(defaultValue = "asc") String sort,
    @RequestParam(defaultValue = "0") Integer page,
    @RequestParam(defaultValue = "10") Integer size
  )
    throws IOException {
    EventOrganizer entity = new EventOrganizer();
    Sort.Direction direction = sort != null
      ? Sort.Direction.valueOf(sort.toUpperCase())
      : null;

    Page<EventOrganizer> pageEventOrganizers = eoService.findAll(
      entity,
      page,
      size,
      direction
    );
    List<EventOrganizer> EventOrganizers = pageEventOrganizers.toList();

    ModelMapper modelMapper = new ModelMapper();
    Type type = new TypeToken<List<EventOrganizerModel>>() {}.getType();

    List<EventOrganizerModel> eventOrganizerModels = modelMapper.map(
      EventOrganizers,
      type
    );

    for (EventOrganizerModel eventOrganizerModel : eventOrganizerModels) {
      EventOrganizer item = eoService.findById(eventOrganizerModel.getId());
      List<ImageModel> images = new ArrayList<>();
      List<Path> paths = ImageService.findAll(item);
      for (Path path : paths) {
        ImageModel imageData = ImageModel.from(
          eventOrganizerModel.getId(),
          path,
          EntityTypes.toEnum(3)
        );
        images.add(imageData);
      }

      eventOrganizerModel.setImages(images);
    }

    PageAbleModel<EventOrganizerModel> data = new PageAbleModel<>(
      eventOrganizerModels,
      pageEventOrganizers.getNumber(),
      pageEventOrganizers.getSize(),
      pageEventOrganizers.getTotalElements()
    );

    return ResponseModel.success(data);
  }

  @GetMapping(path = "/{id}", produces = "application/json")
  public ResponseModel<EventOrganizerModel> findById(@PathVariable Integer id)
    throws IOException {
    EventOrganizer EventOrganizer = eoService.findById(id);

    ModelMapper modelMapper = new ModelMapper();
    EventOrganizerModel data = modelMapper.map(
      EventOrganizer,
      EventOrganizerModel.class
    );

    EventOrganizer itemData = eoService.findById(data.getId());

    List<ImageModel> images = new ArrayList<>();
    List<Path> paths = ImageService.findAll(itemData);
    for (Path path : paths) {
      ImageModel imageData = ImageModel.from(
        data.getId(),
        path,
        EntityTypes.toEnum(3)
      );
      images.add(imageData);
    }

    data.setImages(images);

    return ResponseModel.success(data);
  }

  @PostMapping(produces = "application/json", consumes = "application/json")
  public ResponseModel<EventOrganizerModel> add(
    @RequestBody @Valid EventOrganizerModel model
  ) {
    EventOrganizer addedEventOrganizer = eoService.save(
      new EventOrganizer(
        model.getStatus(),
        model.getPhone(),
        model.getName(),
        model.getAddress(),
        model.getCity(),
        model.getDescription(),
        model.getNpwpNumber(),
        model.getSiupNumber(),
        model.getUser()
      )
    );

    ModelMapper modelMapper = new ModelMapper();
    EventOrganizerModel data = modelMapper.map(
      addedEventOrganizer,
      EventOrganizerModel.class
    );

    return ResponseModel.successAdd(data);
  }

  @PutMapping(
    path = "/{id}",
    produces = "application/json",
    consumes = "application/json"
  )
  public ResponseModel<EventOrganizerModel> edit(
    @RequestParam(required = true) Integer type,
    @RequestBody @Valid EventOrganizerRequestModel model
  )
    throws IOException {
    model.setId(model.getId());
    ModelMapper modelMapper = new ModelMapper();
    EventOrganizer entity = eoService.findById(model.getId());
    modelMapper.map(model, entity);

    EventOrganizer editedEventOrganizer = eoService.save(entity);

    EventOrganizerModel data = modelMapper.map(
      editedEventOrganizer,
      EventOrganizerModel.class
    );
    return ResponseModel.success(data);
  }

  @DeleteMapping(path = "/{id}", produces = "application/json")
  public ResponseModel<EventOrganizerModel> delete(@PathVariable Integer id) {
    EventOrganizer deletedEventOrganizer = eoService.removeById(id);

    ModelMapper modelMapper = new ModelMapper();
    EventOrganizerModel data = modelMapper.map(
      deletedEventOrganizer,
      EventOrganizerModel.class
    );

    return ResponseModel.success(data);
  }

  @DeleteMapping(produces = "application/json")
  public ResponseModel<List<EventOrganizerModel>> delete(
    @RequestParam Integer[] ids
  ) {
    List<EventOrganizer> deletedEventOrganizers = eoService.removeAll(ids);
    ModelMapper modelMapper = new ModelMapper();
    Type type = new TypeToken<List<EventOrganizerModel>>() {}.getType();
    List<EventOrganizerModel> data = modelMapper.map(
      deletedEventOrganizers,
      type
    );

    return ResponseModel.success(data);
  }
}
