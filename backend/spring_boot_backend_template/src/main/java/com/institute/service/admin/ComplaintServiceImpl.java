package com.institute.service.admin;

import com.institute.dao.ComplaintDao;
import com.institute.dto.ApiResponse;
import com.institute.dto.complaint.ComplaintResponseDTO;
import com.institute.dto.complaint.ComplaintUpdateStatusDTO;
import com.institute.entities.Complaints;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class ComplaintServiceImpl implements ComplaintService{
    @Autowired
    private ComplaintDao complaintDao;

    @Override
    public List<ComplaintResponseDTO> getAllComplaints() {
        return complaintDao.findByIsDeletedFalse()
                .stream()
                .map(complaint -> {
                    ComplaintResponseDTO dto = new ComplaintResponseDTO();
                    dto.setId(complaint.getId());
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
        if (updateDTO.description != null) {
            complaint.setDescription(updateDTO.description);
        }
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
}
