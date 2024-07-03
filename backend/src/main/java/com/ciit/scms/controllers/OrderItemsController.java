package com.ciit.scms.controllers;

import com.ciit.scms.models.OrderItem;
import com.ciit.scms.operations.OrderItemBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order-items")
@CrossOrigin(origins = "/*")
public class OrderItemsController {

    private final OrderItemBuilder orderItemBuilder;

    @Autowired
    public OrderItemsController(OrderItemBuilder orderItemBuilder) {
        this.orderItemBuilder = orderItemBuilder;
    }

    @PostMapping
    public ResponseEntity<OrderItem> createOrderItem(@RequestBody OrderItem orderItem) {
        OrderItem createdOrderItem = orderItemBuilder.createOrderItem(orderItem);
        return new ResponseEntity<>(createdOrderItem, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderItem> getOrderItemById(@PathVariable int id) {
        OrderItem foundOrderItem = orderItemBuilder.getOrderItemById(id);
        return foundOrderItem != null ?
                ResponseEntity.ok(foundOrderItem) :
                ResponseEntity.notFound().build();
    }

    @GetMapping
    public List<OrderItem> getAllOrderItems() {
        return orderItemBuilder.getAllOrderItems();
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderItem> updateOrderItem(@PathVariable int id, @RequestBody OrderItem updatedOrderItem) {
        OrderItem updated = orderItemBuilder.updateOrderItem(id, updatedOrderItem);
        return updated != null ?
                ResponseEntity.ok(updated) :
                ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrderItem(@PathVariable int id) {
        boolean deleted = orderItemBuilder.deleteOrderItem(id);
        return deleted ?
                ResponseEntity.noContent().build() :
                ResponseEntity.notFound().build();
    }
}
