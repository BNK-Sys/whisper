package com.example.backend.service;


import com.example.backend.dto.MemberDto;
import com.example.backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public void saveMember(MemberDto memberdto) {
//        memberRepository.save(memberdto);
    }
}
