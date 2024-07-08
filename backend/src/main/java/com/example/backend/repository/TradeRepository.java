package com.example.backend.repository;

import com.example.backend.domain.Trade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TradeRepository  extends JpaRepository<Trade, Integer> {
    @Query("SELECT t FROM Trade t WHERE t.account.account_number = :accountNumber")
    List<Trade> findByAccountNumber(String accountNumber);
}
