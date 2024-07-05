package com.example.backend.service;


import com.example.backend.dto.MemberDto;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class AccountService {

    private final AccountRepository accountRepository;

    public Integer getBalance(String accountNumber) {
        return accountRepository.getBalance(accountNumber);
    }
}
