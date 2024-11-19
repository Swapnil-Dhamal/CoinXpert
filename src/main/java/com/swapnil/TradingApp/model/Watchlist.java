package com.swapnil.TradingApp.model;


import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Watchlist {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    @OneToOne
    private Users users;

    @ManyToMany
    private List<Coin> coin=new ArrayList<>();
}
