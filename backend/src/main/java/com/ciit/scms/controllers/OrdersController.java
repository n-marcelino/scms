package com.ciit.scms.controllers;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ciit.scms.models.Category;
import com.ciit.scms.models.Customer;
import com.ciit.scms.models.Order;
import com.ciit.scms.models.Product;
import com.ciit.scms.operations.OrderBuilder;
import com.ciit.scms.repositories.CustomerRepository;
import com.ciit.scms.repositories.OrderRepository;
import com.ciit.scms.repositories.ProductRepository;
import com.google.gson.Gson;

@Controller
@ResponseBody
@RequestMapping(value= {"/api/orders"})
@CrossOrigin(origins="*")
public class OrdersController {

	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
	private ProductRepository productRepository;
	
	@RequestMapping(
			value= {"","/"},
			method=RequestMethod.POST,
			produces=MediaType.APPLICATION_JSON_VALUE)
	@CrossOrigin(origins="*")
	public String save(@RequestBody String payload) {
		Gson gson = new Gson();
		HashMap<String,Object> data = new HashMap<String,Object>();
		data = gson.fromJson(payload, data.getClass());
		
		Integer customerId 	= (int)Double.parseDouble(data.get("customer").toString());
		Iterable<Integer> productId = Arrays.asList((int)Double.parseDouble(data.get("product").toString()));
		Date orderDate = java.sql.Date.valueOf(data.get("orderDate").toString());
		Boolean isOrderFulfilled = Boolean.parseBoolean(data.get("isOrderFulfilled").toString());
		
		
		Order o = new Order();
		o.setOrderDate(orderDate);
		
		Customer c = customerRepository.findById(customerId).get();
		o.setCustomer(c);
		
		Set<Product> p = (Set<Product>) productRepository.findAllById(productId);
		o.setProducts(p);
		
		o.setIsOrderFulfilled(isOrderFulfilled);
		
		
		orderRepository.save(o);
		return " { \"message\": \"ok\" } ";
	}
	
	@RequestMapping(
			value= {"","/"},
			method=RequestMethod.GET,
			produces=MediaType.APPLICATION_JSON_VALUE)
	@CrossOrigin(origins="*")
	public String index() {
		ArrayList<HashMap<String,Object>> orders = new ArrayList<HashMap<String,Object>>();
		Iterable<Order> orderResult = orderRepository.findAll();
		
		for(Order o: orderResult) {
			OrderBuilder builder = new OrderBuilder(o);
			HashMap<String,Object> orderdata = builder.getData();
			orders.add(orderdata);
		}
		
		HashMap<String,Object> data = new HashMap<String,Object>();
		data.put("orders", orders);
		
		Gson gson = new Gson();
		String result = gson.toJson(data);
		
		return result;
	}
	
	@RequestMapping(
			value= {"/{id}"},
			method=RequestMethod.GET,
			produces=MediaType.APPLICATION_JSON_VALUE)
	public String show(@PathVariable Integer id) {
		Order order = orderRepository.findById(id).get();
		
		OrderBuilder builder = new OrderBuilder(order);
		HashMap<String,Object> orderdata = builder.getData();
		
		Gson gson = new Gson();
		String data = gson.toJson(orderdata);
		
		return data;
	}
	
}
