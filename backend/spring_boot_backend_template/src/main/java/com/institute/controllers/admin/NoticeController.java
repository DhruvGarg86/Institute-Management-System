package com.institute.controllers.admin;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.institute.dto.AdminAddNoticeDTO;
import com.institute.service.admin.NoticeService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
@SecurityRequirement(name = "bearerAuth")
@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/admin")
public class NoticeController {
	public final NoticeService noticeService;
	
	@GetMapping("/display-notices")
	@Operation(summary = "Admin-Panel-DisplayAllNotices")
	public ResponseEntity<?> getNotices(){
		return ResponseEntity.ok(noticeService.getAllNotices());
	}
	
	@PostMapping("/add-notice")
	@Operation(summary = "Admin-Panel-AddNotice")
	public ResponseEntity<?> addNotice(@RequestBody AdminAddNoticeDTO dto){
		return ResponseEntity.status(HttpStatus.CREATED).body(noticeService.addNotice(dto));
		
	}
	
	@DeleteMapping("/delete-notice/{id}")
	@Operation(summary = "Admin-Panel-DeleteNotice SOFT DELETE")
	public ResponseEntity<?> deleteNotice(@PathVariable Long id){
		return ResponseEntity.ok(noticeService.deleteNotice(id));
	}
 }
