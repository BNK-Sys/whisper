package com.example.backend.service;


import com.amazonaws.services.kms.model.NotFoundException;
import com.example.backend.domain.Account;
import com.example.backend.dto.MemberDto;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.MemberRepository;
import java.util.Optional;
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

        Account account = accountRepository.findById(accountNumber)
            .orElseThrow(() -> new NotFoundException("계좌가 없습니다"));
        return account.getBalance();
    }
}
