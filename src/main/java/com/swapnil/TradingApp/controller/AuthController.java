package com.swapnil.TradingApp.controller;

import com.swapnil.TradingApp.config.JwtProvider;
import com.swapnil.TradingApp.model.Users;
import com.swapnil.TradingApp.repo.UserRepo;
import com.swapnil.TradingApp.response.AuthResponse;
import com.swapnil.TradingApp.service.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {


    private final UserRepo userRepo;
    private final CustomUserDetailsService userDetailsService;

    @PostMapping("/signUp")
    public ResponseEntity<AuthResponse> register(@RequestBody Users users) throws Exception {

        Users isEmailExists=userRepo.findByEmail(users.getEmail());

        if(isEmailExists != null){
            throw new Exception("Email already exists");
        }

        Users newUser=new Users();
        newUser.setEmail(users.getEmail());
        newUser.setPassword(users.getPassword());
        newUser.setFullName(users.getFullName());

        Users savedUser=userRepo.save(newUser);

        Authentication auth= new UsernamePasswordAuthenticationToken(
                users.getEmail(),
                users.getPassword()
        );
        SecurityContextHolder.getContext().setAuthentication(auth);

        String jwt= JwtProvider.generatedToken(auth);

        AuthResponse res=new AuthResponse();
        res.setJwt(jwt);
        res.setStatus(true);
        res.setMessage("Register Success");

        return new ResponseEntity<>(res, HttpStatus.CREATED);

    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody Users user){

        String userName=user.getEmail();
        String password=user.getPassword();

        Authentication auth=authenticate(userName, password);

        SecurityContextHolder.getContext().setAuthentication(auth);

        String jwt=JwtProvider.generatedToken(auth);

        AuthResponse res=new AuthResponse();
        res.setJwt(jwt);
        res.setStatus(true);
        res.setMessage("Login Success");

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    private Authentication authenticate(String userName, String password){

        UserDetails userDetails= userDetailsService.loadUserByUsername(userName);

        if(userDetails == null){
            throw new BadCredentialsException("Invalid Username");
        }
        if(!password.equals(userDetails.getPassword())){
            throw new BadCredentialsException("Invalid Password");

        }

        return new UsernamePasswordAuthenticationToken(userDetails, password, userDetails.getAuthorities());
    }
}
