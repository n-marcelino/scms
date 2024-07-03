package com.ciit.scms.operations;

import com.ciit.scms.models.Customer;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class CustomerBuilder {

    private final List<Customer> customers = new ArrayList<>();
    private final AtomicInteger counter = new AtomicInteger();

    public Customer createCustomer(Customer customer) {
        customer.setId(counter.incrementAndGet());
        customers.add(customer);
        return customer;
    }

    public Customer getCustomerById(int id) {
        Optional<Customer> customerOptional = customers.stream().filter(c -> c.getId() == id).findFirst();
        return customerOptional.orElse(null);
    }

    public List<Customer> getAllCustomers() {
        return customers;
    }

    public Customer updateCustomer(int id, Customer updatedCustomer) {
        Optional<Customer> customerOptional = customers.stream().filter(c -> c.getId() == id).findFirst();
        if (customerOptional.isPresent()) {
            Customer customer = customerOptional.get();
            customer.setFirstName(updatedCustomer.getFirstName());
            customer.setLastName(updatedCustomer.getLastName());
            customer.setStreet(updatedCustomer.getStreet());
            customer.setCity(updatedCustomer.getCity());
            customer.setZip(updatedCustomer.getZip());
            customer.setPhone(updatedCustomer.getPhone());
            return customer;
        }
        return null;
    }

    public boolean deleteCustomer(int id) {
        Optional<Customer> customerOptional = customers.stream().filter(c -> c.getId() == id).findFirst();
        if (customerOptional.isPresent()) {
            return customers.remove(customerOptional.get());
        }
        return false;
    }
}
