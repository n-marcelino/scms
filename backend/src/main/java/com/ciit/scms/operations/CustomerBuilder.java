package com.ciit.scms.operations;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Set;

import com.ciit.scms.models.Customer;
import com.ciit.scms.models.Order;
import com.ciit.scms.models.Product;

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
		
		Set<Order> orders = customer.getOrders();
		
		ArrayList<HashMap<String, Object>> orderData = new ArrayList<HashMap<String,Object>>();
		
		for (Order o: orders) {
			OrderBuilder oBuilder = new OrderBuilder(o);
			orderData.add(oBuilder.getData());
		}
		
		data.put("orders", orderData);
	}
	
	public HashMap<String, Object> getData() {
		return data;
	}
}
