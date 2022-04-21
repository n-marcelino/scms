package com.ciit.scms.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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
import com.ciit.scms.models.Product;
import com.ciit.scms.operations.ProductBuilder;
import com.ciit.scms.repositories.CategoryRepository;
import com.ciit.scms.repositories.ProductRepository;
import com.google.gson.Gson;

@Controller
@ResponseBody
@RequestMapping(value= {"/api/products"})
public class ProductsController {
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@RequestMapping(
			value= {"","/"},
			method=RequestMethod.POST,
			produces=MediaType.APPLICATION_JSON_VALUE)
	@CrossOrigin(origins="*")
	public String save(@RequestBody String payload) {
		Gson gson = new Gson();
		HashMap<String,Object> data = new HashMap<String,Object>();
		data = gson.fromJson(payload, data.getClass());
		
		String name			= data.get("name").toString();
		Double price		= Double.parseDouble(data.get("price").toString());
		Integer categoryId 	= (int)Double.parseDouble(data.get("categoryId").toString());
		
		Product p = new Product();
		p.setName(name);
		p.setPrice(price);
		
		Category c = categoryRepository.findById(categoryId).get();
		p.setCategory(c);
		
		productRepository.save(p);
		return " { \"message\": \"ok\" } ";
	}
	
	@RequestMapping(
			value= {"","/"},
			method=RequestMethod.GET,
			produces=MediaType.APPLICATION_JSON_VALUE)
	@CrossOrigin(origins="*") //allows us to test our app
	public String index() {
		//array of hashmaps (array of key + value pairs)
		ArrayList<HashMap<String,Object>> products = new ArrayList<HashMap<String,Object>>();
		
		//Iterable, from the word "iteration", which means instance ig
		//just means u can use it in for loops
		Iterable<Product> productResult = productRepository.findAll();
		
		//for each product p in product result, do the code
		for(Product p: productResult) {
			//make an instance of builder, which basically just makes the json for us
			ProductBuilder builder = new ProductBuilder(p);
			//gets data from builder and stores into productdata
			HashMap<String,Object> productdata = builder.getData();
			//adds all productdata into products arraylist
			products.add(productdata);
		}
		
		HashMap<String,Object> data = new HashMap<String,Object>();
		data.put("products", products);
		
		Gson gson = new Gson(); //parser
		String result = gson.toJson(data);
		
		return result;
	}
	
	// update 
		@RequestMapping(
				value= {"","/"},
				method=RequestMethod.PATCH,
				produces=MediaType.APPLICATION_JSON_VALUE)
		@CrossOrigin(origins="*")
		public String update(@RequestBody String payload) {
			Gson gson = new Gson();
			HashMap<String,Object> data = new HashMap<String,Object>();
			data = gson.fromJson(payload, data.getClass());
			
			int id = Integer.parseInt(data.get("id").toString());
			String name = data.get("name").toString();
			Double price = Double.parseDouble(data.get("price").toString());
			int category_id = Integer.parseInt(data.get("category_id").toString());
			
//			// get category by name
//			String category_name = data.get("category").toString();
//			
//			// added findByName at category repo
//			List<Category> c_list = categoryRepository.findByName(category_name);
			
			Category c = categoryRepository.findById(category_id).get();
			Product p = productRepository.findById(id).get();
			p.setName(name);
			p.setPrice(price);
			p.setCategory(c);
			
			productRepository.save(p);
			return " { \"message\": \"ok\" } ";
		}
	
	// delete
	@RequestMapping(
			value= {"","/"},
			method=RequestMethod.DELETE,
			produces=MediaType.APPLICATION_JSON_VALUE)
	@CrossOrigin(origins="*")
	public String delete(@RequestBody String payload) {
		Gson gson = new Gson();
		HashMap<String,Object> data = new HashMap<String,Object>();
		data = gson.fromJson(payload, data.getClass());
		
		int id = Integer.parseInt(data.get("id").toString());
		
		productRepository.deleteById(id);
		
		return " { \"message\": \"ok\" } ";
	}

	
	@RequestMapping(
			value= {"/{id}"},
			method=RequestMethod.GET,
			produces=MediaType.APPLICATION_JSON_VALUE)
	public String show(@PathVariable Integer id) {
		
		//fetching product from database
		
		Product product = productRepository.findById(id).get();
		
		ProductBuilder builder = new ProductBuilder(product);
		HashMap<String,Object> productdata = builder.getData();
		
		Gson gson = new Gson();
		String data = gson.toJson(productdata);
		
		return data;
	}
}
