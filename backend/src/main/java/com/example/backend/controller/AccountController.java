package com.example.backend.controller;

import com.example.backend.dto.AccountBalanceResponse;
import com.example.backend.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/")
public class AccountController {

    private final AccountService accountService;

    //잔액 조회
    @GetMapping("/account")
    public AccountBalanceResponse getBalance(String accountNumber) {
        //임의 account
        Integer balance = accountService.getBalance("111-111-111111");
        return new AccountBalanceResponse(balance);
    }

}
