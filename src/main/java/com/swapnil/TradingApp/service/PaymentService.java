package com.swapnil.TradingApp.service;

import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import com.swapnil.TradingApp.domain.PaymentMethod;
import com.swapnil.TradingApp.model.PaymentOrder;
import com.swapnil.TradingApp.model.Users;
import com.swapnil.TradingApp.response.PaymentResponse;

public interface PaymentService {

    PaymentOrder createOrder(Users user , Long amount, PaymentMethod paymentMethod);

    PaymentOrder getPaymentOrderById(String id) throws Exception;

    Boolean proceedPaymentOrder(PaymentOrder paymentOrder, String paymentId) throws RazorpayException;

    PaymentResponse createRazorpayPaymentLink(Users user, Long amount, String orderId) throws RazorpayException;

    PaymentResponse createStripePaymentLink(Users user, Long amount, Long orderId) throws StripeException;
}
