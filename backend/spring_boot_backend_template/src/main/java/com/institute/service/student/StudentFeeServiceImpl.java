package com.institute.service.student;

import org.springframework.stereotype.Service;

import com.institute.dao.FeeDao;
import com.institute.dto.student.StudentFeeDto;
import com.institute.entities.Course;
import com.institute.entities.Fee;
import com.institute.entities.Student;
import com.institute.entities.enums.FeeStatus;
import com.institute.exception.customexceptions.ApiException;

import jakarta.transaction.Transactional;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Service
@Transactional
@Getter
@Setter
@RequiredArgsConstructor
public class StudentFeeServiceImpl implements StudentFeeService {

    private final FeeDao feeDao;

    @Override
    public StudentFeeDto displayStudentFee(Long studentId) {
        Fee fee = feeDao.findFeeByStudentId(studentId)
                .orElseThrow(() -> new ApiException("Fee details not found for student ID: " + studentId));

        // Update status dynamically based on amount
        double amountPaid = fee.getAmountPaid();
        double totalAmount = fee.getTotalAmount();

        FeeStatus updatedStatus;
        if (amountPaid >= totalAmount) {
            updatedStatus = FeeStatus.PAID;
        } else if (amountPaid > 0) {
            updatedStatus = FeeStatus.PENDING;
        } else {
            updatedStatus = FeeStatus.UNPAID;
        }

        // Update the entity if the status has changed
        if (fee.getStatus() != updatedStatus) {
            fee.setStatus(updatedStatus);
            feeDao.save(fee); // persist updated status
        }

        Student student = fee.getStudent();
        Course course = student.getCourse();

        // Manual mapping to DTO
        StudentFeeDto dto = new StudentFeeDto();
        dto.setTotalAmount(totalAmount);
        dto.setAmountPaid(amountPaid);
        dto.setRemainingAmount(fee.getRemainingAmount());
        dto.setStatus(updatedStatus);
        dto.setDueDate(fee.getDueDate());

        dto.setStudentId(student.getId());
        dto.setStudentName(student.getName());
        dto.setEmail(student.getUser().getEmail());
        dto.setCourseName(course.getName());

        return dto;
    }
}
