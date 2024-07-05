package com.ciit.scms.models;

import java.util.List;

public class Order {
    private int id;
    private int customerId;
    private int isOrderFulfilled;
    private List<OrderItem> orderItems; 

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public int getIsOrderFulfilled() {
        return isOrderFulfilled;
    }

    public void setIsOrderFulfilled(int isOrderFulfilled) {
        this.isOrderFulfilled = isOrderFulfilled;
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }
}
