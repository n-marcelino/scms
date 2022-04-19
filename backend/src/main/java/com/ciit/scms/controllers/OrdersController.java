package com.ciit.scms.controllers;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ciit.scms.models.Order;
import com.ciit.scms.operations.OrderBuilder;
import com.ciit.scms.repositories.OrderRepository;
import com.google.gson.Gson;

@Controller
@ResponseBody
@RequestMapping(value= {"/api/orders"})
public class OrdersController {

	@Autowired
	private OrderRepository orderRepository;
	
	@RequestMapping(
			value= {"","/"},
			method=RequestMethod.GET,
			produces=MediaType.APPLICATION_JSON_VALUE)
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
