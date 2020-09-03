package com.team5.expoapi.controller;

import com.team5.expoapi.entities.Category;
import com.team5.expoapi.entities.Event;
import com.team5.expoapi.entities.EventMerchant;
import com.team5.expoapi.entities.Location;
import com.team5.expoapi.entities.Merchant;
import com.team5.expoapi.entities.Pricing;
import com.team5.expoapi.entities.User;
import com.team5.expoapi.entities.enums.EntityTypes;
import com.team5.expoapi.entities.enums.Status;
import com.team5.expoapi.models.EventMerchantModel;
import com.team5.expoapi.models.EventModel;
import com.team5.expoapi.models.ImageModel;
import com.team5.expoapi.models.PageAbleModel;
import com.team5.expoapi.models.ResponseModel;
import com.team5.expoapi.repositories.LocationRepository;
import com.team5.expoapi.services.CategoryService;
import com.team5.expoapi.services.CommonImageService;
import com.team5.expoapi.services.EventOrganizerService;
import com.team5.expoapi.services.EventService;
import com.team5.expoapi.services.MerchantService;
import com.team5.expoapi.services.PricingService;
import com.team5.expoapi.services.UserService;
import java.io.IOException;
import java.lang.reflect.Type;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.validation.Valid;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.validation.annotation.Validated;
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
@Validated
@RequestMapping("/events")
public class EventController {
  @Autowired
  private EventService eventService;

  @Autowired
  private UserService userService;

  @Autowired
  private CategoryService categoryService;

  @Autowired
  private EventOrganizerService eoService;

  @Autowired
  private CommonImageService<Event> ImageService;

  @Autowired
  private LocationRepository locationRepo;

  @Autowired
  private PricingService pricingService;

  @Autowired
  private MerchantService merchantService;

  @GetMapping(produces = "application/json")
  public ResponseModel<PageAbleModel<EventModel>> findAll(
    @RequestParam(required = false) Integer status,
    @RequestParam(required = false) String email,
    @RequestParam(required = false) Integer eo,
    @RequestParam(required = false) Integer[] categories,
    @RequestParam(defaultValue = "asc") String sort,
    @RequestParam(defaultValue = "0") Integer page,
    @RequestParam(defaultValue = "10") Integer size
  )
    throws IOException {
    Event entity = new Event();

    if (status != null && eo != null) {
      User user = userService.findById(eo);
      entity = new Event(eoService.findByUser(user), Status.toEnum(status));
    } else if (status != null) {
      entity = new Event(Status.toEnum(status));
    } else if (eo != null) {
      User user = userService.findById(eo);
      entity = new Event(eoService.findByUser(user));
    } else {
      entity = new Event();
    }

    Sort.Direction direction = sort != null
      ? Sort.Direction.valueOf(sort.toUpperCase())
      : null;
    Page<Event> pageEvents;

    if (categories == null) {
      pageEvents = eventService.findAll(entity, page, size, direction);
    } else {
      Set<Category> cats = new HashSet<>();
      for (Integer id : categories) {
        Category cat = categoryService.findById(id);
        cats.add(cat);
      }
      pageEvents = eventService.findByCategoryIn(cats, page, size, direction);
    }

    List<Event> Events = pageEvents.toList();
    ModelMapper modelMapper = new ModelMapper();
    Type type = new TypeToken<List<EventModel>>() {}.getType();

    List<EventModel> eventModels = modelMapper.map(Events, type);

    for (EventModel eventModel : eventModels) {
      Event item = eventService.findById(eventModel.getId());
      List<ImageModel> images = new ArrayList<>();
      List<Path> paths = ImageService.findAll(item);
      for (Path path : paths) {
        ImageModel imageData = ImageModel.from(
          eventModel.getId(),
          path,
          EntityTypes.toEnum(0)
        );
        images.add(imageData);
      }

      eventModel.setImages(images);
    }
    PageAbleModel<EventModel> data = new PageAbleModel<>(
      eventModels,
      pageEvents.getNumber(),
      pageEvents.getSize(),
      pageEvents.getTotalElements()
    );

    return ResponseModel.success(data);
  }

  @GetMapping(path = "/{id}", produces = "application/json")
  public ResponseModel<EventMerchantModel> findById(@PathVariable Integer id)
    throws IOException {
    Event Event = eventService.findById(id);

    ModelMapper modelMapper = new ModelMapper();
    EventMerchantModel data = modelMapper.map(Event, EventMerchantModel.class);
    Event itemData = eventService.findById(data.getId());

    List<ImageModel> images = new ArrayList<>();
    List<Path> paths = ImageService.findAll(itemData);
    for (Path path : paths) {
      ImageModel imageData = ImageModel.from(
        data.getId(),
        path,
        EntityTypes.toEnum(0)
      );
      images.add(imageData);
    }

    data.setImages(images);
    return ResponseModel.success(data);
  }

  @PostMapping(produces = "application/json", consumes = "application/json")
  public ResponseModel<EventModel> add(@RequestBody @Valid EventModel model)
    throws IOException {
    Location location = locationRepo.save(model.getLocation());
    model.setStatus(Status.PENDING);
    List<Pricing> pricings = new ArrayList<>();
    for (Pricing pricing : model.getPricings()) {
      Pricing ticket = pricingService.save(pricing);

      pricings.add(ticket);
    }

    Event addedEvent = eventService.save(
      new Event(
        model.getName(),
        location,
        model.getDescription(),
        model.getOrganizer(),
        model.getStartDate(),
        model.getEndDate(),
        model.getStartTime(),
        model.getEndTime(),
        model.getCapacity(),
        model.getEventTier(),
        model.getStatus(),
        model.getCategories(),
        pricings
      )
    );

    ModelMapper modelMapper = new ModelMapper();
    EventModel data = modelMapper.map(addedEvent, EventModel.class);

    return ResponseModel.successAdd(data);
  }

  @PostMapping(
    path = "/{id}/submission",
    produces = "application/json",
    consumes = "application/json"
  )
  public ResponseModel<EventMerchantModel> submission(
    @RequestBody @Valid EventModel model,
    @PathVariable Integer id
  )
    throws IOException {
    ModelMapper modelMapper = new ModelMapper();
    Event event = eventService.findById(id);
    Merchant merchant = merchantService.findById(model.getMerchant().getId());

    EventMerchant ev = new EventMerchant();
    ev.setEvent(event);
    ev.setMerchant(merchant);
    ev.setStatus(0);
    event.getEventMerchants().add(ev);
    event = eventService.save(event);

    EventMerchantModel data = modelMapper.map(event, EventMerchantModel.class);
    return ResponseModel.success(data);
  }

  @PutMapping(
    path = "/{id}",
    produces = "application/json",
    consumes = "application/json"
  )
  public ResponseModel<EventModel> edit(@RequestBody @Valid EventModel model)
    throws IOException {
    model.setId(model.getId());
    ModelMapper modelMapper = new ModelMapper();
    Event entity = eventService.findById(model.getId());
    modelMapper.map(model, entity);

    Event editedEvent = eventService.save(entity);

    EventModel data = modelMapper.map(editedEvent, EventModel.class);
    return ResponseModel.success(data);
  }

  @DeleteMapping(path = "/{id}", produces = "application/json")
  public ResponseModel<EventModel> delete(@PathVariable Integer id) {
    Event deletedEvent = eventService.removeById(id);

    ModelMapper modelMapper = new ModelMapper();
    EventModel data = modelMapper.map(deletedEvent, EventModel.class);

    return ResponseModel.success(data);
  }

  @DeleteMapping(produces = "application/json")
  public ResponseModel<List<EventModel>> delete(@RequestParam Integer[] ids) {
    List<Event> deletedEvents = eventService.removeAll(ids);
    ModelMapper modelMapper = new ModelMapper();
    Type type = new TypeToken<List<EventModel>>() {}.getType();
    List<EventModel> data = modelMapper.map(deletedEvents, type);

    return ResponseModel.success(data);
  }
}
