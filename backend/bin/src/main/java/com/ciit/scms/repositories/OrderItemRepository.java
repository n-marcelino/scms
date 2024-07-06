package com.ciit.scms.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ciit.scms.models.OrderItem;
import com.ciit.scms.models.Product;

@Repository
public interface OrderItemRepository extends CrudRepository<OrderItem, Integer> {

}

