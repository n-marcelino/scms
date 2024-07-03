package com.ciit.scms.operations;

import com.ciit.scms.models.OrderItem;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class OrderItemBuilder {

    private final List<OrderItem> orderItems = new ArrayList<>();
    private final AtomicInteger counter = new AtomicInteger();

    public OrderItem createOrderItem(OrderItem orderItem) {
        orderItem.setId(counter.incrementAndGet());
        orderItems.add(orderItem);
        return orderItem;
    }

    public OrderItem getOrderItemById(int id) {
        Optional<OrderItem> orderItemOptional = orderItems.stream().filter(oi -> oi.getId() == id).findFirst();
        return orderItemOptional.orElse(null);
    }

    public List<OrderItem> getAllOrderItems() {
        return orderItems;
    }

    public OrderItem updateOrderItem(int id, OrderItem updatedOrderItem) {
        Optional<OrderItem> orderItemOptional = orderItems.stream().filter(oi -> oi.getId() == id).findFirst();
        if (orderItemOptional.isPresent()) {
            OrderItem orderItem = orderItemOptional.get();
            orderItem.setOrder(updatedOrderItem.getOrder());
            orderItem.setProduct(updatedOrderItem.getProduct());
            orderItem.setPrice(updatedOrderItem.getPrice());
            orderItem.setQuantity(updatedOrderItem.getQuantity());
            return orderItem;
        }
        return null;
    }

    public boolean deleteOrderItem(int id) {
        Optional<OrderItem> orderItemOptional = orderItems.stream().filter(oi -> oi.getId() == id).findFirst();
        if (orderItemOptional.isPresent()) {
            return orderItems.remove(orderItemOptional.get());
        }
        return false;
    }
}
