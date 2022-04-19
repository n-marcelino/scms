package com.ciit.scms.models;

import java.sql.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="orders")
public class Order {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@ManyToOne
	@JoinColumn(name="customer_id", nullable=false)
	private Customer customer;
	
	//equivalent of foreign key
	//mappedby must correspond to existing equal key in other table
	@ManyToMany(fetch=FetchType.EAGER)//eager vs lazy; eager pulls out category from database and queries at the same  time
	@JoinTable
	Set<Product> products;
	
	@Column(name = "order_date", nullable = false)
	private Date orderDate;
	
	@Column(name="isOrderFulfilled", nullable=false)
	private Boolean isOrderFulfilled;

	//SETTERS AND GETTERS 
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public Set<Product> getProducts() {
		return products;
	}

	public void setProducts(Set<Product> products) {
		this.products = products;
	}

	public Date getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}

	public Boolean getIsOrderFulfilled() {
		return isOrderFulfilled;
	}

	public void setIsOrderFulfilled(Boolean isOrderFulfilled) {
		this.isOrderFulfilled = isOrderFulfilled;
	}	
	
}