package com.swapnil.TradingApp.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender mailSender;

    public void sendVerificationOtpEmail(String email, String otp) throws MessagingException {
        MimeMessage mimeMessage=mailSender.createMimeMessage();
        MimeMessageHelper messageHelper=new MimeMessageHelper(mimeMessage, "utf-8");

        String subject="Verify Otp";
        String text="Your verification code is "+otp;

        messageHelper.setSubject(subject);
        messageHelper.setText(text);
        messageHelper.setTo(email);

        try{
            mailSender.send(mimeMessage);
        }
        catch(MailException e){
            throw new MailSendException(e.getMessage());
        }

    }


}
