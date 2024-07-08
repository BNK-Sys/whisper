package com.example.backend.controller;

import com.example.backend.dto.AccountBalanceResponse;
import com.example.backend.service.AccountService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/account")
public class AccountController {

    private final AccountService accountService;

    //잔액 조회
    @GetMapping("/balance")
    @Operation(summary = "잔액 조회", description = "accountNumber로 잔액 조회")
    public AccountBalanceResponse getBalance(String accountNumber) {
        Integer balance = accountService.getBalance(accountNumber);
        return new AccountBalanceResponse(balance);
    }
}
