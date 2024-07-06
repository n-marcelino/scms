package com.ciit.scms.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ciit.scms.models.Customer;

@Repository
public interface CustomerRepository extends CrudRepository<Customer, Integer>{

}
