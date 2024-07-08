package com.example.backend.domain;

import com.example.backend.domain.global.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Trade extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "trade_id")
    private int id;  // 거래내역 id

    private int amount;  // 금액
    private String receivingAccountNumber;  // 수신 계좌번호
    private String name;  // 보낸 예금주

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_number")
    private Account account;

    public Trade(int amount, Account myAccount, Account receivingAccount) {
        this.amount = amount;
        this.receivingAccountNumber = receivingAccount.getAccount_number();
        this.name = receivingAccount.getMember().getName();
        this.account = myAccount;
        account.getTradeHistories().add(this);
    }
}
