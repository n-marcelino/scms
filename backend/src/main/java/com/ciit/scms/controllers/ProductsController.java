package com.ciit.scms.controllers;

import com.ciit.scms.models.Product;
import com.ciit.scms.operations.ProductBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "/*")
public class ProductsController {

    private final ProductBuilder productBuilder;

    @Autowired
    public ProductsController(ProductBuilder productBuilder) {
        this.productBuilder = productBuilder;
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product createdProduct = productBuilder.createProduct(product);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable int id) {
        Product foundProduct = productBuilder.getProductById(id);
        return foundProduct != null ?
                ResponseEntity.ok(foundProduct) :
                ResponseEntity.notFound().build();
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productBuilder.getAllProducts();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable int id, @RequestBody Product updatedProduct) {
        Product updated = productBuilder.updateProduct(id, updatedProduct);
        return updated != null ?
                ResponseEntity.ok(updated) :
                ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable int id) {
        boolean deleted = productBuilder.deleteProduct(id);
        return deleted ?
                ResponseEntity.noContent().build() :
                ResponseEntity.notFound().build();
    }
}
