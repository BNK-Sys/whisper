package com.example.backend.repository;

import com.example.backend.domain.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Integer> {
    Integer getBalance(String accountNumber);
}
