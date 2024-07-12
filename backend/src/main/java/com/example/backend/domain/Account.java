package com.example.backend.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Account {
    @Id
    private String account_number;  // 계좌번호

    private int balance;  // 잔액

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    private String bank;
    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Trade> tradeHistories = new ArrayList<>();

    public Account(int balance, String account_number, Member member, String bank) {
        this.balance = balance;
        this.account_number = account_number;
        this.member = member;
        this.bank = bank;
        member.getAccounts().add(this);
    }

}
