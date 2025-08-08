package com.institute.service.admin;

import java.util.List;

import com.institute.dto.admin.ComplaintsDto;
import com.institute.dto.complaint.ComplaintResponseDTO;
import com.institute.dto.complaint.ComplaintUpdateStatusDTO;
import com.institute.dto.complaint.DisplayComplaintDto;


public interface ComplaintService {
    List<ComplaintResponseDTO> getAllComplaints();

    String updateComplaintStatus(Long id, ComplaintUpdateStatusDTO dto);

    String softDeleteComplaint(Long id);


    ComplaintsDto getComplaintById(Long complaintId);

    List<DisplayComplaintDto> getComplaintsByStudent(Long studentId);

    ComplaintsDto getComplaintsById(Long id);
}
