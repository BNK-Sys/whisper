package com.example.backend.domain;

import com.example.backend.domain.global.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Optional;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Trade_history extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "trade_id")
    private Long id;  // 거래내역 id

    private int amount;  // 금액
    private String receiving_account_number;  // 수신 계좌번호
    private String name;  // 보낸 예금주

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_number")
    private Account account;

    public Trade_history(int amount, String receiving_account_number, String name, Account account) {
        this.amount = amount;
        this.receiving_account_number = receiving_account_number;
        this.name = name;
        this.account = account;
        account.getTradeHistories().add(this);
    }
}
