package com.example.backend.service;


import com.example.backend.domain.Account;
import com.example.backend.domain.Member;
import com.example.backend.domain.Trade;
import com.example.backend.dto.BalanceDto;
import com.example.backend.dto.TradeResponse;
import com.example.backend.dto.TransferRequest;
import com.example.backend.exception.InsufficientFundsException;
import com.example.backend.exception.NotFoundException;
import com.example.backend.repository.AccountRepository;

import com.example.backend.repository.MemberRepository;
import com.example.backend.repository.TradeRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final TradeRepository tradeRepository;
    private final MemberRepository memberRepository;

    public Integer getBalance(String accountNumber) {
        Account account = accountRepository.findById(accountNumber)
            .orElseThrow(() -> new NotFoundException("계좌가 없습니다"));
        return account.getBalance();
    }

    public List<BalanceDto> getBalanceList(int memberId){
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new NotFoundException("멤버가 없습니다"));

        return accountRepository.findByMember(member).stream()
            .map(account -> new BalanceDto(account.getAccount_number(), account.getBalance())).collect(Collectors.toList());

    }

    //이체 시 거래 내역 생성
    public Integer transfer(TransferRequest transferRequest) {
        // 내 계좌 체크
        System.out.println(transferRequest.getAccountNumber());
        Account myAccount = accountRepository.findById(transferRequest.getAccountNumber())
                .orElseThrow(() -> new NotFoundException("계좌가 없습니다"));

        // 계좌 잔액 체크 : myAccount의 balance가 얼마인지 체크
        int amount = Integer.parseInt(transferRequest.getAmount().replace(",", ""));
        if (myAccount.getBalance() < amount) {
            throw new InsufficientFundsException("잔액이 부족합니다");
        }
        // 받는 계좌 유효성 체크
        Account receivingAccount = accountRepository.findById(transferRequest.getReceivingAccountNumber())
                .orElseThrow(() -> new NotFoundException("받는 계좌가 없습니다"));
        //거래
        myAccount.setBalance(myAccount.getBalance() - amount);
        accountRepository.save(myAccount);

        // 받는 계좌에 amount 만큼 추가
        receivingAccount.setBalance(receivingAccount.getBalance() + amount);
        accountRepository.save(receivingAccount);

        //거래 내역 생성
        Trade trade = new Trade(amount, myAccount, receivingAccount);
        tradeRepository.save(trade);
        return 1;

    }

    public List<TradeResponse> getTrade(String accountNumber) {
        Account myAccount = accountRepository.findById(accountNumber)
                .orElseThrow(() -> new NotFoundException("계좌가 없습니다"));
        List<Trade> trades = tradeRepository.findByAccountNumber(accountNumber);
        return trades.stream()
                .map(trade -> new TradeResponse(trade.getId(), trade.getAmount(),
                        trade.getReceivingAccountNumber(), trade.getName(), trade.getCreatedAt(),
                        trade.getBalance()))
                .collect(Collectors.toList());
    }
}
