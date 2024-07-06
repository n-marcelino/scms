package com.ciit.scms.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ciit.scms.models.Order;

@Repository
public interface OrderRepository extends CrudRepository<Order, Integer>{

}
