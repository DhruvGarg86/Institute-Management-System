package com.institute.service.admin;

import java.util.List;

import com.institute.dto.admin.ComplaintsDto;
import com.institute.dto.complaint.ComplaintResponseDTO;
import com.institute.dto.complaint.ComplaintUpdateStatusDTO;


public interface ComplaintService {
    List<ComplaintResponseDTO> getAllComplaints();

    String updateComplaintStatus(Long id, ComplaintUpdateStatusDTO dto);

    String softDeleteComplaint(Long id);

    List<ComplaintsDto> getComplaintsByStudentId(Long studentId);
}
