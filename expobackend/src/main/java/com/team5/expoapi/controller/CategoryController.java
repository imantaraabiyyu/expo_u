package com.team5.expoapi.controller;

import com.team5.expoapi.entities.Category;
import com.team5.expoapi.models.CategoryModel;
import com.team5.expoapi.models.PageAbleModel;
import com.team5.expoapi.models.ResponseModel;
import com.team5.expoapi.services.CategoryService;
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
@RequestMapping("/categories")
public class CategoryController {
  @Autowired
  private CategoryService categoryService;

  @GetMapping(produces = "application/json")
  public ResponseModel<PageAbleModel<CategoryModel>> findAll(
    @RequestParam(required = false) String username,
    @RequestParam(required = false) String email,
    @RequestParam(defaultValue = "asc") String sort,
    @RequestParam(defaultValue = "0") Integer page,
    @RequestParam(defaultValue = "10") Integer size
  ) {
    Category entity = new Category();
    Sort.Direction direction = sort != null
      ? Sort.Direction.valueOf(sort.toUpperCase())
      : null;

    Page<Category> pageCategorys = categoryService.findAll(
      entity,
      page,
      size,
      direction
    );
    List<Category> Categorys = pageCategorys.toList();

    ModelMapper modelMapper = new ModelMapper();
    Type type = new TypeToken<List<CategoryModel>>() {}.getType();

    List<CategoryModel> CategoryModels = modelMapper.map(Categorys, type);
    PageAbleModel<CategoryModel> data = new PageAbleModel<>(
      CategoryModels,
      pageCategorys.getNumber(),
      pageCategorys.getSize(),
      pageCategorys.getTotalElements()
    );

    return ResponseModel.success(data);
  }

  @GetMapping(path = "/{id}", produces = "application/json")
  public ResponseModel<CategoryModel> findById(@PathVariable Integer id) {
    Category Category = categoryService.findById(id);

    ModelMapper modelMapper = new ModelMapper();
    CategoryModel data = modelMapper.map(Category, CategoryModel.class);

    return ResponseModel.success(data);
  }

  @PostMapping(produces = "application/json", consumes = "application/json")
  public ResponseModel<CategoryModel> add(
    @RequestBody @Valid CategoryModel model
  ) {
    Category addedCategory = categoryService.save(
      new Category(model.getName())
    );

    ModelMapper modelMapper = new ModelMapper();
    CategoryModel data = modelMapper.map(addedCategory, CategoryModel.class);

    return ResponseModel.successAdd(data);
  }

  @PutMapping(path = "/{id}", produces = "application/json", consumes = "application/json")
  public ResponseModel<CategoryModel> edit(
    @RequestBody @Valid CategoryModel model
  ) {
    model.setId(model.getId());
    ModelMapper modelMapper = new ModelMapper();
    Category entity = categoryService.findById(model.getId());
    modelMapper.map(model, entity);

    Category editedCategory = categoryService.save(entity);
    CategoryModel data = modelMapper.map(editedCategory, CategoryModel.class);
    return ResponseModel.success(data);
  }

  @DeleteMapping(path = "/{id}", produces = "application/json")
  public ResponseModel<CategoryModel> delete(@PathVariable Integer id) {
    Category deletedCategory = categoryService.removeById(id);

    ModelMapper modelMapper = new ModelMapper();
    CategoryModel data = modelMapper.map(deletedCategory, CategoryModel.class);

    return ResponseModel.success(data);
  }

  @DeleteMapping(produces = "application/json")
  public ResponseModel<List<CategoryModel>> delete(
    @RequestParam Integer[] ids
  ) {
    List<Category> deletedCategorys = categoryService.removeAll(ids);
    ModelMapper modelMapper = new ModelMapper();
    Type type = new TypeToken<List<CategoryModel>>() {}.getType();
    List<CategoryModel> data = modelMapper.map(deletedCategorys, type);

    return ResponseModel.success(data);
  }
}
