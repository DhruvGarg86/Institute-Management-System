package com.institute.service.admin;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.institute.dao.CourseSubjectTeacherDao;
import com.institute.dao.SubjectDao;
import com.institute.dto.ApiResponse;
import com.institute.dto.admin.SubjectMappingDetailsDTO;
import com.institute.dto.admin.SubjectDto;
import com.institute.entities.CourseSubjectTeacher;
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
    private final CourseSubjectTeacherDao courseSubjectTeacherDao;

    // ---------------------- GET ALL subjects ----------------------
    @Override
    public List<SubjectMappingDetailsDTO> getAllMappedSubjectDetails() {
        List<CourseSubjectTeacher> allMappings = courseSubjectTeacherDao.findAll();

        Map<Subject, List<CourseSubjectTeacher>> groupedBySubject = allMappings.stream()
                .collect(Collectors.groupingBy(CourseSubjectTeacher::getSubject));
        List<SubjectMappingDetailsDTO> result = new ArrayList<>();
        for (Map.Entry<Subject, List<CourseSubjectTeacher>> entry : groupedBySubject.entrySet()) {
            Subject subject = entry.getKey();
            List<CourseSubjectTeacher> mappings = entry.getValue();
            SubjectMappingDetailsDTO dto = modelMapper.map(subject, SubjectMappingDetailsDTO.class);
            Set<String> courseNames = mappings.stream()
                    .map(m -> m.getCourse().getName())
                    .collect(Collectors.toSet());
            Set<String> teacherNames = mappings.stream()
                    .map(m -> m.getTeacher().getName())
                    .collect(Collectors.toSet());
            dto.setCourseNames(courseNames);
            dto.setTeacherNames(teacherNames);
            result.add(dto);
        }
        return result;
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

    @Override
    public SubjectDto getSubjectById(Long id) {
        Subject subject = subjectDao.findById(id)
                .orElseThrow(() -> new ApiException("Subject not found with ID: " + id));

        return modelMapper.map(subject, SubjectDto.class);
    }
}
