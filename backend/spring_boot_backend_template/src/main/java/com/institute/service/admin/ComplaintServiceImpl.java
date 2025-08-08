package com.institute.service.admin;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.institute.dto.admin.ComplaintsDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.institute.dao.ComplaintDao;
import com.institute.dto.complaint.ComplaintResponseDTO;
import com.institute.dto.complaint.ComplaintUpdateStatusDTO;
import com.institute.entities.Complaints;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class ComplaintServiceImpl implements ComplaintService{
    @Autowired
    private ComplaintDao complaintDao;
    private ModelMapper modelMapper;

    @Override
    public List<ComplaintResponseDTO> getAllComplaints() {
        return complaintDao.findByDeletedFalse()
                .stream()
                .map(complaint -> {
                    ComplaintResponseDTO dto = new ComplaintResponseDTO();
                    dto.setId(complaint.getId());
                    dto.setDate(complaint.getCreatedAt());
                    dto.setDescription(complaint.getDescription());
                    dto.setStatus(complaint.getStatus());
                    dto.setDeleted(complaint.isDeleted()); // LOMBOK GENERATES setDeleted instead of setIsDeleted!!!!
                    dto.setStudentId(complaint.getStudent().getId());
                    dto.setStudentName(complaint.getStudent().getName());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @PutMapping("/{id}")
    public String updateComplaintStatus(@PathVariable Long id, @RequestBody ComplaintUpdateStatusDTO updateDTO) {
        Optional<Complaints> optionalComplaint = complaintDao.findActiveById(id);
//        if (optionalComplaint.isEmpty()) {
//            return ResponseEntity.notFound().build();
//        }

        Complaints complaint = optionalComplaint.get();
        if (updateDTO.status != null) {
            complaint.setStatus(updateDTO.status);
        }
        complaintDao.save(complaint);

        return "Complaint updated";
    }

    @Override
    public String softDeleteComplaint(Long id) {
        Optional<Complaints> complaintOpt = complaintDao.findById(id);
        if (complaintOpt.isEmpty()) return "Complaint not found";

        Complaints complaint = complaintOpt.get();
        complaint.setDeleted(true);
        complaintDao.save(complaint);
        return "Complaint deleted.";
    }

    @Override
    public ComplaintsDto getComplaintById(Long complaintId) {
        Complaints complaint = complaintDao.findById(complaintId)
                .orElseThrow(() -> new ApiException("Complaint not found with ID: " + complaintId));

        // Manual mapping with nested fields
        ComplaintsDto dto = new ComplaintsDto();
        dto.setStudentName(complaint.getStudent().getName());
        dto.setCourseName(complaint.getStudent().getCourse().getName());
        dto.setDateOfComplaint(complaint.getCreatedAt());
        dto.setStatus(complaint.getStatus());
        dto.setDescription(complaint.getDescription());

        return dto;
    }

    @Override
    public List<DisplayComplaintDto> getComplaintsByStudent(Long studentId) {
        List<Complaints> complaints = complaintDao
                .findByStudentIdAndDeletedFalseOrderByCreatedAtDesc(studentId);

        return complaints.stream().map(complaint -> {
            DisplayComplaintDto dto = modelMapper.map(complaint, DisplayComplaintDto.class);
            String fullName = complaint.getStudent().getName();
            dto.setStudentName(fullName);
            dto.setDate(complaint.getCreatedAt());
            return dto;
        }).collect(Collectors.toList());
    }
    @Override
    public ComplaintsDto getComplaintsById(Long id) {
        return complaintDao.findDtoById(id)
                .orElseThrow(() -> new ApiException("Complaint not found with ID: " + id));
    }

}
