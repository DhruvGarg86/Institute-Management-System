package com.institute.service.admin;

import com.institute.dao.*;
import com.institute.dto.ApiResponse;
import com.institute.dto.admin.*;
import com.institute.entities.*;
import com.institute.entities.enums.Gender;
import com.institute.entities.enums.Role;
import com.institute.entities.enums.Status;
import com.institute.exception.customexceptions.ApiException;
import com.institute.exception.customexceptions.ResourceNotFoundException;
import com.institute.service.admin.StudentService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentDao studentDao;
    private final CourseDao courseDao;
    private final MarksDao marksDao;
    private final ModelMapper modelMapper;
    private final FeeDao feeDao;
    private final LoginDao loginDao;

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
    public AddStudentDto addStudent(AddStudentDto dto, MultipartFile imageFile) {
        //  Check if email already exists in login table
        if (loginDao.existsByEmail(dto.getEmail())) {
            throw new ApiException("Student already exists.");
        }

        //  Find course
        Course course = courseDao.findByName(dto.getCourseName())
                .orElseThrow(() -> new ApiException("Course not found"));

        // Create Login first
        Login login = new Login();
        login.setEmail(dto.getEmail());
        login.setRole(Role.STUDENT);

        // Create Student and link Login
        Student student = new Student();
        student.setName(dto.getName());
        student.setPhoneNumber(dto.getPhoneNumber());
        student.setAddress(dto.getAddress());
        student.setDob(LocalDate.parse(dto.getDob()));
        student.setGender(Gender.valueOf(dto.getGender().toUpperCase()));
        student.setCourse(course);
        student.setUser(login); // Link login with student
        login.setStudent(student); // Back reference

        //  Handle image
        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                Path filePath = Paths.get(uploadDir, imageFile.getOriginalFilename());
                Files.copy(imageFile.getInputStream(), filePath);
                student.setImagePath(imageFile.getOriginalFilename());
            } catch (Exception e) {
                throw new ApiException("Image upload failed.");
            }
        }


        Student saved = studentDao.save(student);


        dto.setImagePath(saved.getImagePath());
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
                student.getImagePath(),
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
                s.getImagePath(),
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
                student.getImagePath(),
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
