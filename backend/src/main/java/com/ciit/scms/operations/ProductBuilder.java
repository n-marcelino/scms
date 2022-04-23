package com.ciit.scms.operations;

import java.util.HashMap;

import com.ciit.scms.models.Product;

public class ProductBuilder {
	private Product product;
	private HashMap<String, Object> data;
	
	public ProductBuilder(Product product) {
		this.product=product;
		this.data = new HashMap<String, Object>();
		
		this.execute();
	}

	public void execute() {
		data.put("id", product.getId());
		data.put("name", product.getName());
		data.put("price", product.getPrice());
		data.put("category", product.getCategory().getName());
		data.put("categoryId", product.getCategory().getId());
	}
	
	public HashMap<String, Object> getData() {
		return data;
	}
}
