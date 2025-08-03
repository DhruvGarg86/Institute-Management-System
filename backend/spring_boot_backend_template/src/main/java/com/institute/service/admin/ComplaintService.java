package com.institute.service.admin;

import com.institute.dto.ApiResponse;
import com.institute.dto.complaint.ComplaintResponseDTO;
import com.institute.dto.complaint.ComplaintUpdateStatusDTO;
import org.springframework.stereotype.Service;

import java.util.List;


public interface ComplaintService {
    List<ComplaintResponseDTO> getAllComplaints();

    String updateComplaintStatus(Long id, ComplaintUpdateStatusDTO dto);

    String softDeleteComplaint(Long id);
}
