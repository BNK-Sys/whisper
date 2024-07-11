package com.example.backend.dto;

import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class TradeResponse {
    private int id;  // 거래내역 id

    private int amount;  // 금액
    private String receivingAccountNumber;  // 수신 계좌번호
    private String name;  // 보낸 예금주
    private LocalDateTime date; // 날짜
    private int balance;

    public TradeResponse(int id, int amount, String receivingAccountNumber, String name, LocalDateTime date, int balance) {
        this.id = id;
        this.amount = amount;
        this.receivingAccountNumber = receivingAccountNumber;
        this.name = name;
        this.date = date;
        this.balance = balance;

    }
}
