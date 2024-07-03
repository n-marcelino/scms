package com.ciit.scms.controllers;

import com.ciit.scms.models.Customer;
import com.ciit.scms.operations.CustomerBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "*")
public class CustomersController {

    private final CustomerBuilder customerBuilder;

    @Autowired
    public CustomersController(CustomerBuilder customerBuilder) {
        this.customerBuilder = customerBuilder;
    }

    @PostMapping
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer) {
        Customer createdCustomer = customerBuilder.createCustomer(customer);
        return new ResponseEntity<>(createdCustomer, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable int id) {
        Customer foundCustomer = customerBuilder.getCustomerById(id);
        return foundCustomer != null ?
                ResponseEntity.ok(foundCustomer) :
                ResponseEntity.notFound().build();
    }

    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerBuilder.getAllCustomers();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable int id, @RequestBody Customer updatedCustomer) {
        Customer updated = customerBuilder.updateCustomer(id, updatedCustomer);
        return updated != null ?
                ResponseEntity.ok(updated) :
                ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable int id) {
        boolean deleted = customerBuilder.deleteCustomer(id);
        return deleted ?
                ResponseEntity.noContent().build() :
                ResponseEntity.notFound().build();
    }
}
