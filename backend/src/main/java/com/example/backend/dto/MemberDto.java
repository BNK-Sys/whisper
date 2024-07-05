package com.example.backend.dto;

import com.example.backend.domain.Member;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Builder
public class MemberDto {
    private String name;

    public MemberDto toEntity() {
        return MemberDto.builder()
                .name(name)
                .build();
    }
}
