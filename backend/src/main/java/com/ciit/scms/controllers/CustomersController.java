package com.ciit.scms.controllers;

import java.util.ArrayList;
import java.util.HashMap;

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
import com.ciit.scms.operations.CustomerBuilder;
import com.ciit.scms.repositories.CustomerRepository;
import com.google.gson.Gson;


@Controller
@ResponseBody
@RequestMapping(value= {"/api/customers"})
@CrossOrigin(origins="*")
public class CustomersController {
	
	@Autowired
	private CustomerRepository customerRepository;
	
	@RequestMapping(
			value= {"","/"},
			method=RequestMethod.POST,
			produces=MediaType.APPLICATION_JSON_VALUE)
	@CrossOrigin(origins="*")
	public String save(@RequestBody String payload) {
		Gson gson = new Gson();
		HashMap<String,Object> data = new HashMap<String,Object>();
		data = gson.fromJson(payload, data.getClass());
		
		String firstName = data.get("firstName").toString();
		String lastName = data.get("lastName").toString();
		String street = data.get("street").toString();
		String city = data.get("city").toString();
		String zip = data.get("zip").toString();
		String phone = data.get("phone").toString();
		
		Customer c = new Customer();
		c.setFirstName(firstName);
		c.setLastName(lastName);
		c.setStreet(street);
		c.setCity(city);
		c.setZip(zip);
		c.setPhone(phone);
		
		customerRepository.save(c);
		return " { \"message\": \"ok\" } ";
	}
	
	@RequestMapping(
			value= {"","/"},
			method=RequestMethod.GET,
			produces=MediaType.APPLICATION_JSON_VALUE)
	@CrossOrigin(origins="*")
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
	@CrossOrigin(origins = "*")
	public String show(@PathVariable Integer id) {
		Customer customer = customerRepository.findById(id).get();
		
		CustomerBuilder builder = new CustomerBuilder(customer);
		HashMap<String,Object> customerdata = builder.getData();
		
		Gson gson = new Gson();
		String data = gson.toJson(customerdata);
		
		return data;
	}
	
}
