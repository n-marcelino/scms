package com.ciit.scms.operations;

import com.ciit.scms.models.OrderItem;
import com.ciit.scms.models.Product;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class OrderItemBuilder {

    private final List<OrderItem> orderItems = new ArrayList<>();
    private final AtomicInteger counter = new AtomicInteger();

    // Injecting ProductBuilder to fetch product details
    private final ProductBuilder productBuilder;

    public OrderItemBuilder(ProductBuilder productBuilder) {
        this.productBuilder = productBuilder;
    }

    public OrderItem createOrderItem(OrderItem orderItem) {
        // Fetching the product price from ProductBuilder
        Product product = productBuilder.getProductById(orderItem.getProductId());
        if (product != null) {
            BigDecimal totalPrice = product.getPrice().multiply(BigDecimal.valueOf(orderItem.getQuantity()));
            orderItem.setPrice(totalPrice);
            orderItem.setId(counter.incrementAndGet());
            orderItems.add(orderItem);
            return orderItem;
        }
        return null; // Return null or handle appropriately if product not found
    }

    public OrderItem getOrderItemById(int id) {
        Optional<OrderItem> orderItemOptional = orderItems.stream().filter(o -> o.getId() == id).findFirst();
        return orderItemOptional.orElse(null);
    }

    public List<OrderItem> getAllOrderItems() {
        return orderItems;
    }

    public OrderItem updateOrderItem(int id, OrderItem updatedOrderItem) {
        Optional<OrderItem> orderItemOptional = orderItems.stream().filter(o -> o.getId() == id).findFirst();
        if (orderItemOptional.isPresent()) {
            OrderItem orderItem = orderItemOptional.get();
            orderItem.setOrderId(updatedOrderItem.getOrderId());
            orderItem.setProductId(updatedOrderItem.getProductId());
            // Fetching the product price from ProductBuilder
            Product product = productBuilder.getProductById(updatedOrderItem.getProductId());
            if (product != null) {
                BigDecimal totalPrice = product.getPrice().multiply(BigDecimal.valueOf(updatedOrderItem.getQuantity()));
                orderItem.setPrice(totalPrice);
            }
            orderItem.setQuantity(updatedOrderItem.getQuantity());
            return orderItem;
        }
        return null;
    }

    public boolean deleteOrderItem(int id) {
        Optional<OrderItem> orderItemOptional = orderItems.stream().filter(o -> o.getId() == id).findFirst();
        if (orderItemOptional.isPresent()) {
            return orderItems.remove(orderItemOptional.get());
        }
        return false;
    }
}
