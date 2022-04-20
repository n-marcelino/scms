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
import com.ciit.scms.models.Product;
import com.ciit.scms.operations.CategoryBuilder;
import com.ciit.scms.repositories.CategoryRepository;
import com.google.gson.Gson;

@Controller
@ResponseBody
@RequestMapping(value= {"/api/categories"})
public class CategoriesController {
	
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
		
		String name = data.get("name").toString();
		
		Category c = new Category();
		c.setName(name);
		
		categoryRepository.save(c);
		return " { \"message\": \"ok\" } ";
	}
	
	@RequestMapping(
			value= {"","/"},
			method=RequestMethod.GET,
			produces=MediaType.APPLICATION_JSON_VALUE)
	@CrossOrigin(origins="*")
	public String index() {
		ArrayList<HashMap<String,Object>> categories = new ArrayList<HashMap<String,Object>>();
		Iterable<Category> categoryResult = categoryRepository.findAll();
		
		for(Category c: categoryResult) {
			CategoryBuilder builder = new CategoryBuilder(c);
			HashMap<String,Object> categorydata = builder.getData();
			categories.add(categorydata);
		}
		
		HashMap<String,Object> data = new HashMap<String,Object>();
		data.put("categories", categories);
		
		Gson gson = new Gson();
		String result = gson.toJson(data);
		
		return result;
	}
	
	// update (NOT WORKING YET BECUZ CANT TEST (throwing some error 400's or CORS at me))
	@RequestMapping(
			value= {"","/"},
			method=RequestMethod.PATCH,
			produces=MediaType.APPLICATION_JSON_VALUE)
	@CrossOrigin(origins="*")
	public String update(@RequestBody String payload) {
		Gson gson = new Gson();
		HashMap<String,Object> data = new HashMap<String,Object>();
		data = gson.fromJson(payload, data.getClass());
		
		String name = data.get("name").toString();
		int id = Integer.parseInt(data.get("id").toString());
		
		Category c = categoryRepository.findById(id).get();
		c.setName(name);
		
		categoryRepository.save(c);
		return " { \"message\": \"ok\" } ";
	}
		
	@RequestMapping(
			value= {"/{id}"},
			method=RequestMethod.GET,
			produces=MediaType.APPLICATION_JSON_VALUE)
	public String show(@PathVariable Integer id) {
		Category category = categoryRepository.findById(id).get();
		
		CategoryBuilder builder = new CategoryBuilder(category);
		HashMap<String,Object> categorydata = builder.getData();
		
		Gson gson = new Gson();
		String data = gson.toJson(categorydata);
		
		return data;
	}
}
