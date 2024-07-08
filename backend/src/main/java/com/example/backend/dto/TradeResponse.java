package com.example.backend.dto;

import lombok.Getter;

@Getter
public class TradeResponse {
    private int id;  // 거래내역 id

    private int amount;  // 금액
    private String receivingAccountNumber;  // 수신 계좌번호
    private String name;  // 보낸 예금주

    public TradeResponse(int id, int amount, String receivingAccountNumber, String name) {
        this.id = id;
        this.amount = amount;
        this.receivingAccountNumber = receivingAccountNumber;
        this.name = name;
    }
}
