package com.team5.expoapi.controller;

import com.team5.expoapi.entities.Merchant;
import com.team5.expoapi.entities.enums.EntityTypes;
import com.team5.expoapi.models.ImageModel;
import com.team5.expoapi.models.MerchantModel;
import com.team5.expoapi.models.MerchantRequestModel;
import com.team5.expoapi.models.PageAbleModel;
import com.team5.expoapi.models.ResponseModel;
import com.team5.expoapi.services.CommonImageService;
import com.team5.expoapi.services.MerchantService;
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
@RequestMapping("/merchants")
public class MerchantController {
  @Autowired
  private MerchantService merchantService;

  @Autowired
  private CommonImageService<Merchant> ImageService;

  @GetMapping(produces = "application/json")
  public ResponseModel<PageAbleModel<MerchantModel>> findAll(
    @RequestParam(required = false) String username,
    @RequestParam(required = false) String email,
    @RequestParam(defaultValue = "asc") String sort,
    @RequestParam(defaultValue = "0") Integer page,
    @RequestParam(defaultValue = "10") Integer size
  )
    throws IOException {
    Merchant entity = new Merchant();
    Sort.Direction direction = sort != null
      ? Sort.Direction.valueOf(sort.toUpperCase())
      : null;

    Page<Merchant> pageMerchants = merchantService.findAll(
      entity,
      page,
      size,
      direction
    );
    List<Merchant> Merchants = pageMerchants.toList();

    ModelMapper modelMapper = new ModelMapper();
    Type type = new TypeToken<List<MerchantModel>>() {}.getType();

    List<MerchantModel> merchantModels = modelMapper.map(Merchants, type);

    for (MerchantModel merchantModel : merchantModels) {
      Merchant merchant = merchantService.findById(merchantModel.getId());
      List<ImageModel> images = new ArrayList<>();
      List<Path> paths = ImageService.findAll(merchant);
      for (Path path : paths) {
        ImageModel imageData = ImageModel.from(
          merchantModel.getId(),
          path,
          EntityTypes.toEnum(2)
        );
        images.add(imageData);
      }

      merchantModel.setImages(images);
    }

    PageAbleModel<MerchantModel> data = new PageAbleModel<>(
      merchantModels,
      pageMerchants.getNumber(),
      pageMerchants.getSize(),
      pageMerchants.getTotalElements()
    );

    return ResponseModel.success(data);
  }

  @GetMapping(path = "/{id}", produces = "application/json")
  public ResponseModel<MerchantModel> findById(@PathVariable Integer id)
    throws IOException {
    Merchant Merchant = merchantService.findById(id);

    ModelMapper modelMapper = new ModelMapper();
    MerchantModel data = modelMapper.map(Merchant, MerchantModel.class);

    Merchant merchantData = merchantService.findById(data.getId());

    List<ImageModel> images = new ArrayList<>();
    List<Path> paths = ImageService.findAll(merchantData);
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
  public ResponseModel<MerchantModel> add(
    @RequestBody @Valid MerchantModel model
  ) {
    Merchant addedMerchant = merchantService.save(
      new Merchant(
        model.getName(),
        model.getPhone(),
        model.getCity(),
        model.getAddress(),
        model.getDescription(),
        model.getStatus(),
        model.getIdCardType(),
        model.getIdCardNumber(),
        model.getUser()
      )
    );

    ModelMapper modelMapper = new ModelMapper();
    MerchantModel data = modelMapper.map(addedMerchant, MerchantModel.class);

    return ResponseModel.successAdd(data);
  }

  @PutMapping(
    path = "/{id}",
    produces = "application/json",
    consumes = "application/json"
  )
  public ResponseModel<MerchantModel> edit(
    @RequestParam(required = true) Integer type,
    @RequestBody @Valid MerchantRequestModel model
  )
    throws IOException {
    model.setId(model.getId());
    ModelMapper modelMapper = new ModelMapper();
    Merchant entity = merchantService.findById(model.getId());
    modelMapper.map(model, entity);

    Merchant editedMerchant = merchantService.save(entity);

    MerchantModel data = modelMapper.map(editedMerchant, MerchantModel.class);
    return ResponseModel.success(data);
  }

  @DeleteMapping(path = "/{id}", produces = "application/json")
  public ResponseModel<MerchantModel> delete(@PathVariable Integer id) {
    Merchant deletedMerchant = merchantService.removeById(id);

    ModelMapper modelMapper = new ModelMapper();
    MerchantModel data = modelMapper.map(deletedMerchant, MerchantModel.class);

    return ResponseModel.success(data);
  }

  @DeleteMapping(produces = "application/json")
  public ResponseModel<List<MerchantModel>> delete(
    @RequestParam Integer[] ids
  ) {
    List<Merchant> deletedMerchants = merchantService.removeAll(ids);
    ModelMapper modelMapper = new ModelMapper();
    Type type = new TypeToken<List<MerchantModel>>() {}.getType();
    List<MerchantModel> data = modelMapper.map(deletedMerchants, type);

    return ResponseModel.success(data);
  }
}
