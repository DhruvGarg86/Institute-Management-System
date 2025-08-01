package com.institute.dto.admin;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CountDto {
    private LocalDateTime timeStamp;
    private Long count;

    public CountDto(long count) {
        this.timeStamp = LocalDateTime.now();
        this.count = count;
    }
}
