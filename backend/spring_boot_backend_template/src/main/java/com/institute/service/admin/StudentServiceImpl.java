package com.institute.service.admin;

import com.institute.dao.*;
import com.institute.dto.ApiResponse;
import com.institute.dto.admin.*;
import com.institute.entities.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.institute.dao.CourseDao;
import com.institute.dao.FeeDao;
import com.institute.dao.MarksDao;
import com.institute.dao.StudentDao;
import com.institute.dto.ApiResponse;
import com.institute.dto.admin.ActiveStudentsDto;
import com.institute.dto.admin.AddStudentDto;
import com.institute.dto.admin.FeeResponseDto;
import com.institute.dto.admin.FeeUpdateRequest;
import com.institute.dto.admin.MarksDetailsDto;
import com.institute.dto.admin.StudentDetailsDTO;
import com.institute.dto.admin.StudentMarksResponseDto;
import com.institute.dto.admin.StudentPercentageDto;
import com.institute.dto.admin.TopperStudentDTO;
import com.institute.dto.admin.TopperStudentResponseDto;
import com.institute.dto.admin.UpdateStudentRequestDto;
import com.institute.entities.Course;
import com.institute.entities.Fee;
import com.institute.entities.Marks;
import com.institute.entities.Student;
import com.institute.entities.enums.Gender;
import com.institute.entities.enums.Role;
import com.institute.entities.enums.Status;
import com.institute.exception.customexceptions.ApiException;
import com.institute.exception.customexceptions.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    @Autowired
    private final StudentDao studentDao;
    private final CourseDao courseDao;
    private final MarksDao marksDao;
    private final ModelMapper modelMapper;
    private final FeeDao feeDao;
    private final LoginDao loginDao;
    private final PasswordEncoder passwordEncoder;

    @Value("${upload.path}")
    private String uploadDir;

    @Override
    public List<ActiveStudentsDto> allActiveStudents() {
        List<Student> students = studentDao.findByStatusAndIsDeletedFalse(Status.ACTIVE);

        return students.stream()
                .map(student -> {
                    ActiveStudentsDto dto = new ActiveStudentsDto();
                    dto.setId(student.getId());
                    dto.setName(student.getName());
                    dto.setPhoneNumber(student.getPhoneNumber());

                    if (student.getCourse() != null) {
                        dto.setCourseName(student.getCourse().getName());
                    }

                    if (student.getAttendance() != null &&
                            student.getAttendance().getAttendancePercentage() != null) {

                        dto.setAttendancePercentage(student.getAttendance().getAttendancePercentage().doubleValue());
                    } else {
                        dto.setAttendancePercentage(0.0);
                    }

                    return dto;
                })
                .collect(Collectors.toList());
    }


    @Override
    public AddStudentDto addStudent(AddStudentDto dto) {
        //  Check if email already exists in login table
        if (loginDao.existsByEmail(dto.getEmail())) {
            throw new ApiException("Student already exists.");
        }

        //  Find course
        Course course = courseDao.findByName(dto.getCourseName())
                .orElseThrow(() -> new ApiException("Course not found"));



        // Create Student and link Login
        Student student = new Student();
        student.setName(dto.getName());
        student.setPhoneNumber(dto.getPhoneNumber());
        student.setAddress(dto.getAddress());
        student.setDob(LocalDate.parse(dto.getDob()));
        student.setGender(Gender.valueOf(dto.getGender().toUpperCase()));
        student.setCourse(course);
        student.setImage(dto.getImage());

        // Create Login first
        Login login = new Login();
        login.setEmail(dto.getEmail());
        login.setPassword(passwordEncoder.encode(student.getEncodedPassword(dto.getName())));
        login.setRole(Role.STUDENT);

        student.setUser(login); // Link login with student
        login.setStudent(student); // Back reference

        Student saved = studentDao.save(student);
        return dto;
    }

    @Override
    public TopperStudentDTO getTopperStudent() {
        Marks marks = marksDao.findTopperStudentWithDetails()
                .orElseThrow(() -> new ApiException("No marks data available"));

        Student student = marks.getStudent();
        return new TopperStudentDTO(
                student.getCourse().getName(),
                student.getName(),
                student.getUser().getEmail(),
                student.getImage(),
                student.getGender()
        );
    }

    @Override
    public List<StudentDetailsDTO> getAllStudentDetails() {
        List<Student> students = studentDao.findAll();

        return students.stream().map(s -> new StudentDetailsDTO(
                s.getId(),
                s.getName(),
                s.getPhoneNumber(),
                s.getDob(),
                s.getAddress(),
                s.getCourse().getName(),
                s.getImage(),
                s.getStatus()
        )).collect(Collectors.toList());
    }

    @Override
    public ApiResponse deleteStudentById(Long id) {
        Student student = studentDao.findById(id)
                .orElseThrow(() -> new ApiException("Student not found with id: " + id));

        if (student.isDeleted()) {
            throw new ApiException("Student already deleted");
        }



        student.setDeleted(true);
        studentDao.save(student);
        return new ApiResponse("Student deleted successfully !!");
    }

    @Override
    public StudentMarksResponseDto getStudentWithMarks(Long studentId) {
        Student student = studentDao.findById(studentId)
                .orElseThrow(() -> new ApiException("Student not found with id: " + studentId));

        Set<Marks> marksSet = student.getMarks();

        List<MarksDetailsDto> marksDetails = marksSet.stream().map(m -> {
            double percentage = (m.getMarksObtained() / m.getTotalMarks()) * 100;
            return new MarksDetailsDto(
                    m.getSubject().getName(),
                    m.getTotalMarks(),
                    m.getMarksObtained(),
                    percentage,
                    m.getGrade()
            );
        }).collect(Collectors.toList());

        return new StudentMarksResponseDto(
                student.getId(),
                student.getName(),
                student.getUser().getEmail(),
                student.getImage(),
                student.getDob(),
                student.getCourse().getName(),
                marksDetails
        );
    }

    @Override
    public ApiResponse updateStudent(Long studentId, UpdateStudentRequestDto request) {
        Student student = studentDao.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        if (request.getCourseId() != null) {
            Course course = courseDao.findById(request.getCourseId())
                    .orElseThrow(() -> new ResourceNotFoundException("Course not found !!"));
            student.setCourse(course);
        }

        modelMapper.map(request, student);
        studentDao.save(student);
        return new ApiResponse("Student updated successfully !!");
    }

    @Override
    public List<TopperStudentResponseDto> getTopperStudentsByCourse() {
        return studentDao.findTopperStudentsFromEachCourse();
    }

    @Override
    public List<StudentPercentageDto> getAllStudentPercentages() {
        return studentDao.findAllStudentsWithPercentage();
    }

    @Override
    public List<FeeResponseDto> getAllStudentFeeDetails() {
        return List.of();
    }

    @Override
    public ApiResponse updateFee(Long studentId, FeeUpdateRequest dto) {
        Student student = studentDao.findByIdAndStatus(studentId, Status.ACTIVE)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found !!"));

        Fee fee = student.getFee();
        modelMapper.map(dto, fee);
        feeDao.save(fee);

        return new ApiResponse("Fee data updated successfully!");
    }
}
