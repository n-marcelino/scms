package com.ciit.scms.models;

import java.sql.Date;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name="customer_id", nullable=false)
    private Customer customer;

    @OneToMany(fetch=FetchType.EAGER, mappedBy="order")//eager vs lazy; eager pulls out category from database and queries at the same  time
    private Set<OrderItem> orderItems;

    //equivalent of foreign key
    //mappedby must correspond to existing equal key in other table

    @Column(name="is_order_fulfilled", nullable=false)
    private Integer isOrderFulfilled;



    //SETTERS AND GETTERS 

    public Set<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(Set<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }

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

    public Integer getIsOrderFulfilled() {
        return isOrderFulfilled;
    }

    public void setIsOrderFulfilled(Integer isOrderFulfilled) {
        this.isOrderFulfilled = isOrderFulfilled;
    }

}