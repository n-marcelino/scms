package com.ciit.scms.controllers;

import com.ciit.scms.models.Category;
import com.ciit.scms.models.Customer;
import com.ciit.scms.operations.CategoryBuilder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/categories")
@CrossOrigin(origins = "*")
public class CategoriesController {

    private final CategoryBuilder categoryBuilder;

    @Autowired
    public CategoriesController(CategoryBuilder categoryBuilder) {
        this.categoryBuilder = categoryBuilder;
    }

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        Category createdCategory = categoryBuilder.createCategory(category);
        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable int id) {
        Category foundCategory = categoryBuilder.getCategoryById(id);
        return foundCategory != null ?
                ResponseEntity.ok(foundCategory) :
                ResponseEntity.notFound().build();
    }

    @GetMapping
    public List<Category> getAllCategories() {
        return categoryBuilder.getAllCategories();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable int id, @RequestBody Category updatedCategory) {
        Category updated = categoryBuilder.updateCategory(id, updatedCategory);
        return updated != null ?
                ResponseEntity.ok(updated) :
                ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable int id) {
        boolean deleted = categoryBuilder.deleteCategory(id);
        return deleted ?
                ResponseEntity.noContent().build() :
                ResponseEntity.notFound().build();
    }
}