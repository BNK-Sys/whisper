package com.example.backend.dto;

import lombok.Getter;

@Getter
public class BalanceResponse {
    private int balance;


    public BalanceResponse(Integer balance) {
        this.balance = balance;
    }
}
