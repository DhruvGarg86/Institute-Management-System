package com.institute.dto.admin;

import java.time.LocalDate;

import com.institute.entities.enums.Audience;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class NoticeDto {

    private LocalDate date;

    private String title;

    private String description;

    private Audience audience;

    public NoticeDto(LocalDate date, String title, String description, Audience audience) {
        this.date = date;
        this.title = title;
        this.description = description;
        this.audience = audience;
    }

}
