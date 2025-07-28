package com.institute.service.student;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.institute.dao.MarksDao;
import com.institute.dao.StudentDao;
import com.institute.dto.student.StudentMarksDto;
import com.institute.dto.student.SubjectMarkDto;
import com.institute.entities.Marks;
import com.institute.entities.Student;
import com.institute.entities.Subject;
import com.institute.exception.customexceptions.ApiException;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Service
@Transactional
@AllArgsConstructor
@Getter
@Setter
public class StudentMarksServiceImpl implements StudentMarksService {

    private final StudentDao studentRepository;
    private final MarksDao marksRepository;
    private final ModelMapper modelMapper;

    @Override
    public StudentMarksDto getStudentMarks(Long studentId) {
        // Step 1: Fetch student and validate
        Student student = studentRepository.findById(studentId)
            .orElseThrow(() -> new ApiException("Student not found with ID: " + studentId));

        // Step 2: Fetch all marks for that student
        List<Marks> marksList = marksRepository.findByStudentId(studentId);
        if (marksList.isEmpty()) {
            throw new ApiException("No marks found for student ID: " + studentId);
        }

        // Step 3: Process subject-wise marks
        List<SubjectMarkDto> subjectMarks = new ArrayList<>();
        double totalMarks = 0;
        double totalObtained = 0;

        for (Marks mark : marksList) {
            Subject subject = mark.getSubject();

            SubjectMarkDto subjectMarkDto = modelMapper.map(mark, SubjectMarkDto.class);
            subjectMarkDto.setSubjectId(subject.getId());
            subjectMarkDto.setSubjectName(subject.getName());

            subjectMarks.add(subjectMarkDto);

            totalMarks += mark.getTotalMarks();
            totalObtained += mark.getMarksObtained();
        }

        // Step 4: Calculate percentage
        double percentage = totalMarks == 0 ? 0 : (totalObtained / totalMarks) * 100;

        // Step 5: Prepare DTO manually (or map and set custom fields)
        StudentMarksDto dto = new StudentMarksDto();
        dto.setStudentName(student.getName());
        dto.setCourseId(student.getCourse().getId());
        dto.setCourseName(student.getCourse().getName());
        dto.setSubjectMarks(subjectMarks);
        dto.setTotalMarks(totalMarks);
        dto.setTotalMarksObtained(totalObtained);
        dto.setPercentage(percentage);

        return dto;
    }

}
