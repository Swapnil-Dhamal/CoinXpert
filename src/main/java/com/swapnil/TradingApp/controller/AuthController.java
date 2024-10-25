package com.swapnil.TradingApp.controller;

import com.swapnil.TradingApp.model.Users;
import com.swapnil.TradingApp.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepo userRepo;

    @PostMapping("/signUp")
    public ResponseEntity<Users> register(@RequestBody Users users){

        Users newUser=new Users();
        newUser.setEmail(users.getEmail());
        newUser.setPassword(users.getPassword());
        newUser.setFullName(users.getFullName());

        Users savedUser=userRepo.save(newUser);

        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);

    }
}
