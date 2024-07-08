package com.example.backend.repository;

import com.example.backend.domain.Account;
import com.example.backend.domain.Trade;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TradeRepository  extends JpaRepository<Trade, Integer> {
}
