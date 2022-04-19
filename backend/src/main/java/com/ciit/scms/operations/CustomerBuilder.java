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
		data.put("firstname", customer.getFirstName());
		data.put("lastname", customer.getLastName());
		data.put("street", customer.getStreet());
		data.put("city", customer.getCity());
		data.put("zip", customer.getZip());
		data.put("phone", customer.getPhone());
	}
	
	public HashMap<String, Object> getData() {
		return data;
	}
}
