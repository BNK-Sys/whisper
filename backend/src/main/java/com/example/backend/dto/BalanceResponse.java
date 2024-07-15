package com.example.backend.dto;

import lombok.Getter;

@Getter
public class BalanceResponse {
    private int balance;
    private String name;


    public BalanceResponse(Integer balance, String name) {
        this.balance = balance;
        this.name = name;
    }
}
