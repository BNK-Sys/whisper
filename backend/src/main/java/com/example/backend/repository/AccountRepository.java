package com.example.backend.repository;

import com.example.backend.domain.Account;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, String> {



//    Integer getBalance(String accountNumber);
}
