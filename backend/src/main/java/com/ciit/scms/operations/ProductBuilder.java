package com.ciit.scms.operations;

import com.ciit.scms.models.Product;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class ProductBuilder {

    private final List<Product> products = new ArrayList<>();
    private final AtomicInteger counter = new AtomicInteger();

    public Product createProduct(Product product) {
        product.setId(counter.incrementAndGet());
        products.add(product);
        return product;
    }

    public Product getProductById(int id) {
        Optional<Product> productOptional = products.stream().filter(p -> p.getId() == id).findFirst();
        return productOptional.orElse(null);
    }

    public List<Product> getAllProducts() {
        return products;
    }

    public Product updateProduct(int id, Product updatedProduct) {
        Optional<Product> productOptional = products.stream().filter(p -> p.getId() == id).findFirst();
        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            product.setName(updatedProduct.getName());
            product.setPrice(updatedProduct.getPrice());
            product.setCategoryId(updatedProduct.getCategoryId());
            return product;
        }
        return null;
    }

    public boolean deleteProduct(int id) {
        Optional<Product> productOptional = products.stream().filter(p -> p.getId() == id).findFirst();
        if (productOptional.isPresent()) {
            return products.remove(productOptional.get());
        }
        return false;
    }
}
