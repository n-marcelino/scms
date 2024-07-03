package com.ciit.scms.operations;

import com.ciit.scms.models.Category;

import com.ciit.scms.models.Customer;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class CategoryBuilder {

    private final List<Category> categories = new ArrayList<>();
    private final AtomicInteger counter = new AtomicInteger();

    public Category createCategory(Category category) {
        category.setId(counter.incrementAndGet());
        categories.add(category);
        return category;
    }

    public Category getCategoryById(int id) {
        Optional<Category> categoryOptional = categories.stream().filter(c -> c.getId() == id).findFirst();
        return categoryOptional.orElse(null);
    }

    public List<Category> getAllCategories() {
        return categories;
    }

    public Category updateCategory(int id, Category updatedCategory) {
        Optional<Category> categoryOptional = categories.stream().filter(c -> c.getId() == id).findFirst();
        if (categoryOptional.isPresent()) {
            Category category = categoryOptional.get();
            category.setName(updatedCategory.getName());
            return category;
        }
        return null;
    }

    public boolean deleteCategory(int id) {
        Optional<Category> categoryOptional = categories.stream().filter(c -> c.getId() == id).findFirst();
        if (categoryOptional.isPresent()) {
            return categories.remove(categoryOptional.get());
        }
        return false;
    }
}