package com.swapnil.TradingApp.service.impl;

import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.param.checkout.SessionCreateParams;
import com.swapnil.TradingApp.domain.PaymentMethod;
import com.swapnil.TradingApp.domain.PaymentOrderStatus;
import com.swapnil.TradingApp.model.PaymentOrder;
import com.swapnil.TradingApp.model.Users;
import com.swapnil.TradingApp.repo.PaymentDetailsRepo;
import com.swapnil.TradingApp.repo.PaymentRepo;
import com.swapnil.TradingApp.response.PaymentResponse;
import com.swapnil.TradingApp.service.PaymentService;
import com.stripe.model.checkout.Session;

import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.stripe.Stripe;
import com.stripe.param.checkout.SessionCreateParams;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {


    private final PaymentRepo paymentRepo;

    @Value("${stripe.api.key}")
    private String stripeSecretKey;

    @Value(("${razorpay.api.key}"))
    private String apiKey;

    @Value("${razorpay.api.secret}")
    private String apiSecretKey;


    @Override
    public PaymentOrder createOrder(Users user, Long amount, PaymentMethod paymentMethod) {

        PaymentOrder paymentOrder=new PaymentOrder();
        paymentOrder.setAmount(amount);
        paymentOrder.setUser(user);
        paymentOrder.setPaymentMethod(paymentMethod);
        return paymentRepo.save(paymentOrder);
    }

    @Override
    public PaymentOrder getPaymentOrderById(Long id) throws Exception {
        return paymentRepo.findById(id).orElseThrow(()->new Exception("Payment order not found"));
    }

    @Override
    public Boolean proceedPaymentOrder(PaymentOrder paymentOrder, String paymentId) throws RazorpayException {


        if(paymentOrder.getPaymentOrderStatus().equals(PaymentOrderStatus.PENDING)){

            if(paymentOrder.getPaymentMethod().equals(PaymentMethod.RAZORPAY)){

                RazorpayClient razorpayClient=new RazorpayClient(apiKey,apiSecretKey);
                Payment payment=razorpayClient.payments.fetch(paymentId);

                Integer amount=payment.get("amount");
                String status=payment.get("status");

                if(status.equals("captured")){
                    paymentOrder.setPaymentOrderStatus(PaymentOrderStatus.SUCCESS);
                    return true;
                }

                paymentOrder.setPaymentOrderStatus(PaymentOrderStatus.FAILED);
                paymentRepo.save(paymentOrder);
                return false;
            }

            // For non-RazorPay payments
            paymentOrder.setPaymentOrderStatus(PaymentOrderStatus.SUCCESS);
            paymentRepo.save(paymentOrder);
            return true;
        }

        return false;
    }

    @Override
    public PaymentResponse createRazorpayPaymentLink(Users user, Long amount) throws RazorpayException {

        Long Amount=amount*100;    // conversion into cents

        try{
            RazorpayClient razorpayClient=new RazorpayClient(apiKey, apiSecretKey);

            JSONObject paymentLinkRequest=new JSONObject();
            paymentLinkRequest.put("amount", amount);
            paymentLinkRequest.put("currency", "INR");

            JSONObject customer=new JSONObject();
            customer.put("name", user.getFullName());
            customer.put("email", user.getEmail());
            paymentLinkRequest.put("cutomer", customer);

            JSONObject notify=new JSONObject();
            notify.put("email", true);
            paymentLinkRequest.put("notify", notify);

            paymentLinkRequest.put("reminder_enable", true);

            paymentLinkRequest.put("callback_url","http://localhost:5173/wallet");
            paymentLinkRequest.put("callback_method", "get");

            PaymentLink payment=razorpayClient.paymentLink.create(paymentLinkRequest);

            String paymentLinkId=payment.get("id");
            String paymentLinkUrl=payment.get("short_url");

            PaymentResponse res=new PaymentResponse();
            res.setPayment_url(paymentLinkUrl);
            return res;

        }catch(RazorpayException e){
            System.out.println("Error creating payment link: "+e.getMessage());
            throw new RazorpayException(e.getMessage());
        }

    }

    @Override
    public PaymentResponse createStripePaymentLink(Users user, Long amount, Long orderId) throws StripeException {

        Stripe.apiKey=stripeSecretKey;

        SessionCreateParams params=SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:5173/wallet?order_id="+orderId)
                .setCancelUrl("http://localhost:5173/payment/cancel")
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("usd")
                                .setUnitAmount(amount*100)
                                .setProductData(SessionCreateParams
                                        .LineItem
                                        .PriceData
                                        .ProductData
                                        .builder()
                                        .setName("Top up wallet")
                                        .build()
                                ).build()
                        ).build()
                ).build();

        Session session=Session.create(params);

        System.out.println("session____"+session);

        PaymentResponse res=new PaymentResponse();
        res.setPayment_url(session.getUrl());

        return res;
    }
}
