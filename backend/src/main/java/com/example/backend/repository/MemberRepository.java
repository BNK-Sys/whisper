package com.example.backend.repository;


import com.example.backend.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {
    Optional<Member> findByName(String name);
//    boolean existsByUsername(String username);
}
