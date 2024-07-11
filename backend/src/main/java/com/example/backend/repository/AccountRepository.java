package com.example.backend.repository;

import com.example.backend.domain.Account;
import com.example.backend.domain.Member;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, String> {

    List<Account> findByMember(Member member);
}
