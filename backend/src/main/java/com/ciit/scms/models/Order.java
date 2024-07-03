package com.ciit.scms.models;

public class Order {
    private int id;
    private Customer customer;
    private int isOrderFulfilled;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public int getIsOrderFulfilled() {
        return isOrderFulfilled;
    }

    public void setIsOrderFulfilled(int isOrderFulfilled) {
        this.isOrderFulfilled = isOrderFulfilled;
    }
}
