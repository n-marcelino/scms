package com.ciit.scms.operations;

import com.ciit.scms.models.Order;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class OrderBuilder {

    private final List<Order> orders = new ArrayList<>();
    private final AtomicInteger counter = new AtomicInteger();

    public Order createOrder(Order order) {
        order.setId(counter.incrementAndGet());
        orders.add(order);
        return order;
    }

    public Order getOrderById(int id) {
        Optional<Order> orderOptional = orders.stream().filter(o -> o.getId() == id).findFirst();
        return orderOptional.orElse(null);
    }

    public List<Order> getAllOrders() {
        return orders;
    }

    public Order updateOrder(int id, Order updatedOrder) {
        Optional<Order> orderOptional = orders.stream().filter(o -> o.getId() == id).findFirst();
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            order.setCustomer(updatedOrder.getCustomer());
            order.setIsOrderFulfilled(updatedOrder.getIsOrderFulfilled());
            return order;
        }
        return null;
    }

    public boolean deleteOrder(int id) {
        Optional<Order> orderOptional = orders.stream().filter(o -> o.getId() == id).findFirst();
        if (orderOptional.isPresent()) {
            return orders.remove(orderOptional.get());
        }
        return false;
    }
}
