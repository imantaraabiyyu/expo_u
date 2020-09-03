package com.team5.expoapi.controller;

import com.team5.expoapi.entities.Credit;
import com.team5.expoapi.models.CreditModel;
import com.team5.expoapi.models.PageAbleModel;
import com.team5.expoapi.models.ResponseModel;
import com.team5.expoapi.services.CreditService;
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
@RequestMapping("/credits")
public class CreditController {
  @Autowired
  private CreditService creditService;

  @GetMapping(produces = "application/json")
  public ResponseModel<PageAbleModel<CreditModel>> findAll(
    @RequestParam(required = false) String username,
    @RequestParam(required = false) String email,
    @RequestParam(defaultValue = "asc") String sort,
    @RequestParam(defaultValue = "0") Integer page,
    @RequestParam(defaultValue = "10") Integer size
  ) {
    Credit entity = new Credit();
    Sort.Direction direction = sort != null
      ? Sort.Direction.valueOf(sort.toUpperCase())
      : null;

    Page<Credit> pageCredits = creditService.findAll(
      entity,
      page,
      size,
      direction
    );
    List<Credit> Credits = pageCredits.toList();

    ModelMapper modelMapper = new ModelMapper();
    Type type = new TypeToken<List<CreditModel>>() {}.getType();

    List<CreditModel> CreditModels = modelMapper.map(Credits, type);
    PageAbleModel<CreditModel> data = new PageAbleModel<>(
      CreditModels,
      pageCredits.getNumber(),
      pageCredits.getSize(),
      pageCredits.getTotalElements()
    );

    return ResponseModel.success(data);
  }

  @GetMapping(path = "/{id}", produces = "application/json")
  public ResponseModel<CreditModel> findById(@PathVariable Integer id) {
    Credit Credit = creditService.findById(id);

    ModelMapper modelMapper = new ModelMapper();
    CreditModel data = modelMapper.map(Credit, CreditModel.class);

    return ResponseModel.success(data);
  }
  

  @PostMapping(produces = "application/json", consumes = "application/json")
  public ResponseModel<CreditModel> add(@RequestBody @Valid CreditModel model) {
    Credit addedCredit = creditService.save(
      new Credit(model.getAmount(), model.getUser())
    );

    ModelMapper modelMapper = new ModelMapper();
    CreditModel data = modelMapper.map(addedCredit, CreditModel.class);

    return ResponseModel.successAdd(data);
  }

  @PutMapping(path = "/{id}", produces = "application/json", consumes = "application/json")
  public ResponseModel<CreditModel> edit(
    @RequestBody @Valid CreditModel model
  ) {
    model.setId(model.getId());
    ModelMapper modelMapper = new ModelMapper();
    Credit entity = creditService.findById(model.getId());
    modelMapper.map(model, entity);

    Credit editedCredit = creditService.save(entity);
    CreditModel data = modelMapper.map(editedCredit, CreditModel.class);
    return ResponseModel.success(data);
  }

  @DeleteMapping(path = "/{id}", produces = "application/json")
  public ResponseModel<CreditModel> delete(@PathVariable Integer id) {
    Credit deletedCredit = creditService.removeById(id);

    ModelMapper modelMapper = new ModelMapper();
    CreditModel data = modelMapper.map(deletedCredit, CreditModel.class);

    return ResponseModel.success(data);
  }

  @DeleteMapping(produces = "application/json")
  public ResponseModel<List<CreditModel>> delete(@RequestParam Integer[] ids) {
    List<Credit> deletedCredits = creditService.removeAll(ids);
    ModelMapper modelMapper = new ModelMapper();
    Type type = new TypeToken<List<CreditModel>>() {}.getType();
    List<CreditModel> data = modelMapper.map(deletedCredits, type);

    return ResponseModel.success(data);
  }
}
