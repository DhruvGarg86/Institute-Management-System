package com.institute.service.admin;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.institute.dao.SubjectDao;
import com.institute.dto.ApiResponse;
import com.institute.dto.admin.SubjectDto;
import com.institute.entities.Subject;
import com.institute.exception.customexceptions.ApiException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class SubjectServiceImpl implements SubjectService {

    private final SubjectDao subjectDao;
    private final ModelMapper modelMapper;

    // ---------------------- GET ALL subjects ----------------------
    @Override
    public List<SubjectDto> getAllSubjects() {
        return subjectDao.findAll().stream()
                .map(subject -> modelMapper.map(subject, SubjectDto.class))
                .toList();
    }

    // ---------------------- ADD new SUBJECT ----------------------
    @Override
    public ApiResponse addSubject(SubjectDto dto) {
        if (subjectDao.existsByName(dto.getName()))
            throw new ApiException("Duplicate subject name");

        Subject subject = modelMapper.map(dto, Subject.class);
        subjectDao.save(subject);

        return new ApiResponse("New subject added with ID: " + subject.getId());
    }
    // ---------------------- UPDATE exsisting SUBJECT ----------------------
    @Override
    public ApiResponse updateSubjectsById(Long subjectId, SubjectDto dto) {
    	Subject subject = subjectDao.findByIdAndIsDeletedFalse(subjectId)
    		    .orElseThrow(() -> new ApiException("Subject not found or has been deleted."));
        subject.setName(dto.getName());
        subject.setCode(Integer.valueOf(String.valueOf(dto.getCode())));
        subject.setDescription(dto.getDescription());
        subjectDao.save(subject);
        return new ApiResponse("Subject updated successfully.");
    }


    // ---------------------- DELETE SUBJECT (Soft Delete) ----------------------
    @Override
    public ApiResponse deleteSubjectsById(Long subjectId) {
        Subject subject = subjectDao.findById(subjectId)
                .orElseThrow(() -> new ApiException("Subject not found"));
        if (subject.isDeleted() == true) {
            return new ApiResponse("Subject is already soft-deleted successfully.");
        }
        else {
        	subject.setDeleted(true); 
            subjectDao.save(subject);
            return new ApiResponse("Subject is deleted (soft deleted)");
        }
        
    }
}
