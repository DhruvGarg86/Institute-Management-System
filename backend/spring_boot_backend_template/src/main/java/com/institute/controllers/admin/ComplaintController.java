package com.institute.controllers.admin;

import com.institute.dto.admin.ComplaintsDto;
import com.institute.dto.complaint.ComplaintResponseDTO;
import com.institute.dto.complaint.ComplaintUpdateStatusDTO;
import com.institute.dto.complaint.DisplayComplaintDto;
import com.institute.service.admin.ComplaintService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/complaints")
@AllArgsConstructor
public class ComplaintController {

    private final ComplaintService complaintService;

    @GetMapping
    public ResponseEntity<List<ComplaintResponseDTO>> getAllComplaints() {
        return ResponseEntity.ok(complaintService.getAllComplaints());
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateStatus(@PathVariable Long id,
                                               @RequestBody ComplaintUpdateStatusDTO dto) {
        String response = complaintService.updateComplaintStatus(id, dto);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> softDelete(@PathVariable Long id) {
        String response = complaintService.softDeleteComplaint(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/complaintById/{id}")
    public ResponseEntity<ComplaintsDto> getComplaintById(@PathVariable Long id) {
        ComplaintsDto complaint = complaintService.getComplaintsById(id);
        return ResponseEntity.ok(complaint);
    }

}
