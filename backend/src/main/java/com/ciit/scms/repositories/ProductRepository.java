package com.ciit.scms.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ciit.scms.models.Product;

@Repository
public interface ProductRepository extends CrudRepository<Product, Integer> {

}
