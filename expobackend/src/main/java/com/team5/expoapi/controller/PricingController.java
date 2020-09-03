package com.team5.expoapi.controller;

import com.team5.expoapi.entities.Pricing;
import com.team5.expoapi.models.PageAbleModel;
import com.team5.expoapi.models.PricingModel;
import com.team5.expoapi.models.ResponseModel;
import com.team5.expoapi.services.PricingService;
import java.lang.reflect.Type;
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
@RequestMapping("/pricings")
public class PricingController {
  @Autowired
  private PricingService pricingService;

  @GetMapping(produces = "application/json")
  public ResponseModel<PageAbleModel<PricingModel>> findAll(
    @RequestParam(required = false) String username,
    @RequestParam(required = false) String email,
    @RequestParam(defaultValue = "asc") String sort,
    @RequestParam(defaultValue = "0") Integer page,
    @RequestParam(defaultValue = "10") Integer size
  ) {
    Pricing entity = new Pricing();
    Sort.Direction direction = sort != null
      ? Sort.Direction.valueOf(sort.toUpperCase())
      : null;

    Page<Pricing> pagePricings = pricingService.findAll(
      entity,
      page,
      size,
      direction
    );
    List<Pricing> Pricings = pagePricings.toList();

    ModelMapper modelMapper = new ModelMapper();
    Type type = new TypeToken<List<PricingModel>>() {}.getType();

    List<PricingModel> PricingModels = modelMapper.map(Pricings, type);
    PageAbleModel<PricingModel> data = new PageAbleModel<>(
      PricingModels,
      pagePricings.getNumber(),
      pagePricings.getSize(),
      pagePricings.getTotalElements()
    );

    return ResponseModel.success(data);
  }

  @GetMapping(path = "/{id}", produces = "application/json")
  public ResponseModel<PricingModel> findById(@PathVariable Integer id) {
    Pricing Pricing = pricingService.findById(id);

    ModelMapper modelMapper = new ModelMapper();
    PricingModel data = modelMapper.map(Pricing, PricingModel.class);

    return ResponseModel.success(data);
  }

  @PostMapping(produces = "application/json", consumes = "application/json")
  public ResponseModel<PricingModel> add(
    @RequestBody @Valid PricingModel model
  ) {
    Pricing addedPricing = pricingService.save(
      new Pricing(
        model.getName(),
        model.getStock(),
        model.getPrice(),
        model.getCodename(),
        model.getDescription(),
        model.getEvent()
      )
    );

    ModelMapper modelMapper = new ModelMapper();
    PricingModel data = modelMapper.map(addedPricing, PricingModel.class);

    return ResponseModel.successAdd(data);
  }

  @PutMapping(
    path = "/{id}",
    produces = "application/json",
    consumes = "application/json"
  )
  public ResponseModel<PricingModel> edit(
    @RequestBody @Valid PricingModel model
  ) {
    model.setId(model.getId());
    ModelMapper modelMapper = new ModelMapper();
    Pricing entity = pricingService.findById(model.getId());
    modelMapper.map(model, entity);

    Pricing editedPricing = pricingService.save(entity);
    PricingModel data = modelMapper.map(editedPricing, PricingModel.class);
    return ResponseModel.success(data);
  }

  @DeleteMapping(path = "/{id}", produces = "application/json")
  public ResponseModel<PricingModel> delete(@PathVariable Integer id) {
    Pricing deletedPricing = pricingService.removeById(id);

    ModelMapper modelMapper = new ModelMapper();
    PricingModel data = modelMapper.map(deletedPricing, PricingModel.class);

    return ResponseModel.success(data);
  }

  @DeleteMapping(produces = "application/json")
  public ResponseModel<List<PricingModel>> delete(@RequestParam Integer[] ids) {
    List<Pricing> deletedPricings = pricingService.removeAll(ids);
    ModelMapper modelMapper = new ModelMapper();
    Type type = new TypeToken<List<PricingModel>>() {}.getType();
    List<PricingModel> data = modelMapper.map(deletedPricings, type);

    return ResponseModel.success(data);
  }
}
