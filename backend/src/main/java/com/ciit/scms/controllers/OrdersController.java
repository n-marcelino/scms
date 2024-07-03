package com.ciit.scms.controllers;

import com.ciit.scms.models.Order;
import com.ciit.scms.operations.OrderBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "/*")
public class OrdersController {

    private final OrderBuilder orderBuilder;

    @Autowired
    public OrdersController(OrderBuilder orderBuilder) {
        this.orderBuilder = orderBuilder;
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        Order createdOrder = orderBuilder.createOrder(order);
        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable int id) {
        Order foundOrder = orderBuilder.getOrderById(id);
        return foundOrder != null ?
                ResponseEntity.ok(foundOrder) :
                ResponseEntity.notFound().build();
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderBuilder.getAllOrders();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable int id, @RequestBody Order updatedOrder) {
        Order updated = orderBuilder.updateOrder(id, updatedOrder);
        return updated != null ?
                ResponseEntity.ok(updated) :
                ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable int id) {
        boolean deleted = orderBuilder.deleteOrder(id);
        return deleted ?
                ResponseEntity.noContent().build() :
                ResponseEntity.notFound().build();
    }
}
