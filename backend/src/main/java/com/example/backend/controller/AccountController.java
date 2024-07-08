package com.example.backend.controller;

import com.example.backend.dto.BalanceResponse;
import com.example.backend.dto.TradeResponse;
import com.example.backend.dto.TransferRequest;
import com.example.backend.dto.TransferResponse;
import com.example.backend.service.AccountService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/account")
public class AccountController {

    private final AccountService accountService;

    //잔액 조회
    @GetMapping("/balance")
    @Operation(summary = "잔액 조회", description = "accountNumber로 잔액 조회")
    public BalanceResponse getBalance(String accountNumber) {
        Integer balance = accountService.getBalance(accountNumber);
        return new BalanceResponse(balance);
    }
    //이체
    @PostMapping("/transfer")
    @Operation(summary = "이체", description = "금액 이체 ")
    public TransferResponse transfer(@RequestBody TransferRequest transferRequest) {
        Integer result = accountService.transfer(transferRequest);
        return new TransferResponse(200, "이체 성공");
    }

    //거래내역 조회
    @GetMapping("/trade")
    @Operation(summary = "거래 조회", description = "거래 조회")
    public List<TradeResponse> getTrade(String accountNumber) {
        return accountService.getTrade(accountNumber);
    }

}
