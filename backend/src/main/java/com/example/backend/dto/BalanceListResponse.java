package com.example.backend.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
public class BalanceListResponse {
    private List<BalanceDto> balanceList;
}
