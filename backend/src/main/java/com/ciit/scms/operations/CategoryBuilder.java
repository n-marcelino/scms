package com.ciit.scms.operations;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Set;

import com.ciit.scms.models.Category;
import com.ciit.scms.models.Product;
import com.ciit.scms.operations.ProductBuilder;

public class CategoryBuilder {
	private Category category;
	private HashMap<String, Object> data;
	
	public CategoryBuilder(Category category) {
		this.category=category;
		this.data = new HashMap<String, Object>();
		
		this.execute();
	}

	public void execute() {
		data.put("id", category.getId());
		data.put("name", category.getName());
		
		Set<Product> products = category.getProducts();
		
		ArrayList<HashMap<String, Object>> categoryData = new ArrayList<HashMap<String,Object>>();
		
		for (Product p: products) {
			ProductBuilder pBuilder = new ProductBuilder(p);
			categoryData.add(pBuilder.getData());
		}
		
		data.put("products", categoryData);
	}
	
	public HashMap<String, Object> getData() {
		return data;
	}
}
