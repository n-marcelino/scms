package com.ciit.scms.operations;

import java.util.HashMap;

import com.ciit.scms.models.Customer;

public class CustomerBuilder {
	private Customer customer;
	private HashMap<String, Object> data;
	
	public CustomerBuilder(Customer customer) {
		this.customer=customer;
		this.data = new HashMap<String, Object>();
		
		this.execute();
	}

	public void execute() {
		data.put("id", customer.getId());
		data.put("name", customer.getLastName() + ", " + customer.getFirstName());
		data.put("address", customer.getStreet() + ", " + customer.getCity() + " " + customer.getZip());
		data.put("phone number", customer.getPhone());
	}
	
	public HashMap<String, Object> getData() {
		return data;
	}
}
