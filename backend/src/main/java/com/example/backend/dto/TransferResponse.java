package com.example.backend.dto;

import lombok.Data;

@Data
public class TransferResponse {
    private int status;
    private String message;

    public TransferResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }

    // Getter 및 Setter 추가
}
