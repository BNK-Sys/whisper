package com.example.backend.dto;


import lombok.Data;

@Data
public class TransferRequest {
    private String accountNumber;
    private String receivingAccountNumber;
    private String amount;

    public TransferRequest(String accountNumber, String receivingAccountNumber, String amount) {
        this.accountNumber = accountNumber;
        this.receivingAccountNumber = receivingAccountNumber;
        this.amount = amount;
    }
}
