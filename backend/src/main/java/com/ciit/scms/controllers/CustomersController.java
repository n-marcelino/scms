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

import com.ciit.scms.models.Customer;
import com.ciit.scms.operations.CustomerBuilder;
import com.ciit.scms.repositories.CustomerRepository;
import com.google.gson.Gson;


@Controller
@ResponseBody
@RequestMapping(value= {"/api/customers"})
public class CustomersController {
	@Autowired
	private CustomerRepository customerRepository;
	
	@RequestMapping(
			value= {"","/"},
			method=RequestMethod.GET,
			produces=MediaType.APPLICATION_JSON_VALUE)
	public String index() {
		ArrayList<HashMap<String,Object>> customers = new ArrayList<HashMap<String,Object>>();
		Iterable<Customer> customerResult = customerRepository.findAll();
		
		for(Customer c: customerResult) {
			CustomerBuilder builder = new CustomerBuilder(c);
			HashMap<String,Object> customerdata = builder.getData();
			customers.add(customerdata);
		}
		
		HashMap<String,Object> data = new HashMap<String,Object>();
		data.put("customers", customers);
		
		Gson gson = new Gson();
		String result = gson.toJson(data);
		
		return result;
	}
	
	@RequestMapping(
			value= {"/{id}"},
			method=RequestMethod.GET,
			produces=MediaType.APPLICATION_JSON_VALUE)
	public String show(@PathVariable Integer id) {
		Customer customer = customerRepository.findById(id).get();
		
		CustomerBuilder builder = new CustomerBuilder(customer);
		HashMap<String,Object> customerdata = builder.getData();
		
		Gson gson = new Gson();
		String data = gson.toJson(customerdata);
		
		return data;
	}
	
}
