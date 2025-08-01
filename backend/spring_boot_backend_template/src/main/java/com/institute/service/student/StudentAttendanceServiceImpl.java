package com.institute.service.student;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.institute.dao.AttendanceDao;
import com.institute.dto.student.StudentAttendanceDto;
import com.institute.exception.customexceptions.ApiException;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Service
@Transactional
@Getter
@Setter
@AllArgsConstructor
public class StudentAttendanceServiceImpl implements StudentAttendanceService{
	
	private final AttendanceDao attendanceDao;
	private final ModelMapper modelMapper;
	@Override
	public Optional<StudentAttendanceDto> displayStudentAttendance(Long studentId) {
	    return Optional.of(attendanceDao.findAttendanceByStudentId(studentId)
	        .map(attendance -> {
	            StudentAttendanceDto dto = modelMapper.map(attendance, StudentAttendanceDto.class);
	            dto.setStudentId(attendance.getStudent().getId().intValue()); // Manual mapping
	            return dto;
	        })
	        .orElseThrow(() -> new ApiException("student or Attendance not found")));
	}


}
