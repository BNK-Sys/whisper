package com.example.backend.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Account {
    @Id
    private String account_number;  // 계좌번호

    private int balance;  // 잔액

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Trade_history> tradeHistories = new ArrayList<>();

    public Account(int balance, String account_number, Member member) {
        this.balance = balance;
        this.account_number = account_number;
        this.member = member;
        member.getAccounts().add(this);
    }

}
