package com.ciit.scms.operations;

import java.util.HashMap;

import com.ciit.scms.models.Order;

public class OrderBuilder {
	private Order order;
	private HashMap<String, Object> data;
	
	public OrderBuilder(Order order) {
		this.order=order;
		this.data = new HashMap<String, Object>();
		
		this.execute();
	}

	public void execute() {
		data.put("id", order.getId());
		data.put("customer", order.getCustomer().getLastName() + ", " + order.getCustomer().getFirstName());
		data.put("product", order.getProducts());
		data.put("order date", order.getOrderDate());
	}
	
	public HashMap<String, Object> getData() {
		return data;
	}
}
