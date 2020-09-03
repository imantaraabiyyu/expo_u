package com.team5.expoapi.services;

import com.team5.expoapi.entities.Category;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.atLeastOnce;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import com.team5.expoapi.entities.Category;
import com.team5.expoapi.repositories.CategoryRepository;
import com.team5.expoapi.repositories.EventRepository;
import com.team5.expoapi.services.implement.CategoryServiceImpl;
import com.team5.expoapi.services.implement.CommonServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.repository.JpaRepository;

@ExtendWith(MockitoExtension.class)
@DataJpaTest
public class CategoryServiceTest {

    private static final Integer ID = 99;
    private static final String NAME = "Musik";

    @Mock
    private CategoryRepository repository;

    @InjectMocks
    private CategoryServiceImpl service;

    @Mock
    private Pageable pageableMock;

    @Mock
    private Page<Category> categoryPage;


    @BeforeEach
    void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
    }
    @Test
    public void shouldSaved() {
        Category category = createCategory();
        when(repository.save(category)).thenReturn(category);

        Category result = service.save(category);

        assertEquals(category, result);
    }
    @Test
    public void shouldFindAll() {
        
        Category category = createCategory();

        when(service.findAll(category, 0, 10, Direction.ASC)).thenReturn(categoryPage);
       
        Page<Category> result = service.findAll(category, 0, 10, Direction.ASC);
        assertEquals(categoryPage, result);
    }

    @Test
    public void shouldFindById() {
        Category category = createCategory();
        when(repository.findById(ID)).thenReturn(Optional.of(category));

        Category result = service.findById(ID);
        assertEquals(category, result);

    }

    // @Test
    // public void shouldRemoved() {

    //     Category category = createCategory();

    //     service.removeById(ID);
    //     verify(service, times(1)).removeById(eq(ID));
    // }

    private Category createCategory() {
        Category category = new Category();
        category.setId(ID);
        category.setName(NAME);
        return category;
    }
}
