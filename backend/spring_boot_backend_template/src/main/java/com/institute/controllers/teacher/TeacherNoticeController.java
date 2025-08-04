package com.institute.controllers.teacher;

import com.institute.dto.AdminAddNoticeDTO;
import com.institute.service.admin.NoticeService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/teacher/notices")
@AllArgsConstructor
public class TeacherNoticeController {
    public final NoticeService noticeService;

    @GetMapping("/display-notices")
    @Operation(summary = "Teacher-Panel-DisplayAllNotices")
    public ResponseEntity<?> getNotices(){
        return ResponseEntity.ok(noticeService.getAllNotices());
    }

    @PostMapping("/add-notice")
    @Operation(summary = "Teacher-Panel-AddNotice")
    public ResponseEntity<?> addNotice(@RequestBody AdminAddNoticeDTO dto){
        return ResponseEntity.status(HttpStatus.CREATED).body(noticeService.addNotice(dto));

    }
}
