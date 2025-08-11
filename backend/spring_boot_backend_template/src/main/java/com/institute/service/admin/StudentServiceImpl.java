package com.institute.service.admin;

import com.institute.dao.*;
import com.institute.dto.ApiResponse;
import com.institute.dto.admin.*;
import com.institute.entities.*;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import com.institute.entities.enums.Grade;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.institute.dao.CourseDao;
import com.institute.dao.FeeDao;
import com.institute.dao.MarksDao;
import com.institute.dao.StudentDao;
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
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class StudentServiceImpl implements StudentService {

    @Autowired
    private final StudentDao studentDao;
    private final CourseDao courseDao;
    private final MarksDao marksDao;
    private final ModelMapper modelMapper;
    private final FeeDao feeDao;
    private final LoginDao loginDao;
    private final PasswordEncoder passwordEncoder;
    private final SubjectDao subjectDao;

    @Override
    public List<ActiveStudentsDto> allActiveStudents() {
        List<Student> students = studentDao.findByStatusAndIsDeletedFalse(Status.ACTIVE);

        return students.stream()
                .map(student -> {
                    ActiveStudentsDto dto = new ActiveStudentsDto();
                    dto.setImage(student.getImagePath());
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
        student.setImagePath(dto.getImagePath());
        student.setAdmissionDate(dto.getAdmissionDate());

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
                student.getImagePath(),
                student.getGender()
        );
    }

    @Override
    public List<StudentDetailsDTO> getAllStudentDetails() {
        List<Student> students = studentDao.findAll();

        return students.stream()
                .filter(s -> !s.isDeleted())
                .map(s -> new StudentDetailsDTO(
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

        if (request.getCourseName() != null) {
            Course course = courseDao.findByName(request.getCourseName())
                    .orElseThrow(() -> new ResourceNotFoundException("Course not found !!"));
            student.setCourse(course);
        }

        modelMapper.map(request, student);
        studentDao.save(student);
        return new ApiResponse("Student updated successfully !!");
    }

    @Override
    public List<TopperStudentResponseDto> getTopperStudentsByCourse() {
        List<TopperStudentResponseDto> all = studentDao.findAllStudentsWithPercentageForTopper();

        // Map of courseName -> topper (highest percentage)
        Map<String, TopperStudentResponseDto> toppersByCourse = new HashMap<>();

        for (TopperStudentResponseDto dto : all) {
            String courseName = dto.getCourseName();
            TopperStudentResponseDto existing = toppersByCourse.get(courseName);

            if (existing == null || dto.getPercentage() > existing.getPercentage()) {
                toppersByCourse.put(courseName, dto);
            }
        }

        return new ArrayList<>(toppersByCourse.values());
    }


    @Override
    public List<StudentPercentageDto> getAllStudentPercentages() {
        return studentDao.findAllStudentsWithPercentage();
    }

    @Override
    public List<FeeResponseDto> getAllStudentFeeDetails() {
        List<FeeResponseDto> fees = feeDao.findAllFeeDetails();
        if (fees.isEmpty()) {
            throw new ResourceNotFoundException("No fee details found");
        }
        return fees;
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

    @Override
    public Optional<AddStudentDto> getStudentDetailsById(Long id) {
        Student student = studentDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
        AddStudentDto dto = modelMapper.map(student, AddStudentDto.class);
        if (student.getUser() != null) {
            dto.setEmail(student.getUser().getEmail());
        }
        if (student.getCourse() != null) {
            dto.setCourseName(student.getCourse().getName());
        }
        return Optional.ofNullable(dto);
    }

    @Override
    public List<StudentSubjectsDto> getSubjectNamesByStudentId(Long studentId) {
        Student student = studentDao.findById(studentId)
                .orElseThrow(() -> new ApiException("Student not found with ID: " + studentId));

        return student.getCourse()
                .getCourseSubjectTeachers()
                .stream()
                .map(cst -> new StudentSubjectsDto(cst.getSubject().getName()))
                .distinct()
                .toList();
    }

    @Override
    public ApiResponse addOrUpdateMarks(MarksRequestDTO dto) {
        Student student = studentDao.findById(dto.getStudentId())
                .orElseThrow(() -> new ApiException("Student not found"));

        Subject subject = subjectDao.findByName(dto.getSubjectName())
                .orElseThrow(() -> new ApiException("Subject not found"));

        Marks marks = marksDao.findByStudentAndSubject(student, subject)
                .orElse(new Marks());

        marks.setStudent(student);
        marks.setSubject(subject);
        marks.setMarksObtained(dto.getMarksObtained());
        marks.setTotalMarks(100.0);
        marks.setStatus(Status.ACTIVE);
        marks.setGrade(calculateGrade(dto.getMarksObtained()));

        marksDao.save(marks);
        return new ApiResponse("Marks updated successfully !!");
    }

    private Grade calculateGrade(Double marksObtained) {
        if (marksObtained >= 90) return Grade.A;
        else if (marksObtained >= 80) return Grade.B;
        else if (marksObtained >= 70) return Grade.C;
        else if (marksObtained >= 55) return Grade.D;
        else if (marksObtained >= 40) return Grade.E;
        else return Grade.F;
    }

    @Override
    public TopperStudentResponseDto getInstituteTopper() {
        List<Student> activeStudents = studentDao.findByStatus(Status.ACTIVE);

        double maxPercentage = -1;
        Student topper = null;

        for (Student student : activeStudents) {
            Set<Marks> marksSet = student.getMarks();

            double totalObtained = 0;
            double totalMarks = 0;

            for (Marks mark : marksSet) {
                if (mark.getStatus() == Status.ACTIVE) {
                    totalObtained += mark.getMarksObtained();
                    totalMarks += mark.getTotalMarks();
                }
            }

            if (totalMarks > 0) {
                double percentage = (totalObtained / totalMarks) * 100;

                if (percentage > maxPercentage) {
                    maxPercentage = percentage;
                    topper = student;
                }
            }
        }

        if (topper == null) {
            throw new RuntimeException("No topper found. Make sure students and marks are available.");
        }

        TopperStudentResponseDto dto = new TopperStudentResponseDto();
        dto.setStudentName(topper.getName());
        dto.setImagePath(topper.getImagePath());
        dto.setCourseName(topper.getCourse().getName());
        dto.setPercentage(maxPercentage);

        return dto;
    }



        @Override
        public List<TopperStudentResponseDto> getAllStudentsWithPercentage() {
            List<Student> students = studentDao.findAll();
            List<TopperStudentResponseDto> responseList = new ArrayList<>();

            for (Student student : students) {
                Set<Marks> marksSet = student.getMarks();
                double totalMarksObtained = 0;
                double totalMaxMarks = 0;

                for (Marks mark : marksSet) {
                    totalMarksObtained += mark.getMarksObtained();
                    totalMaxMarks += mark.getTotalMarks();
                }

                double percentage = 0;
                if (totalMaxMarks > 0) {
                    percentage = (totalMarksObtained / totalMaxMarks) * 100;
                }

                TopperStudentResponseDto dto = new TopperStudentResponseDto();
                dto.setStudentName(student.getName());
                dto.setImagePath(student.getImagePath());
                dto.setCourseName(student.getCourse().getName());
                dto.setPercentage(Math.round(percentage * 100.0) / 100.0); // rounded to 2 decimals

                responseList.add(dto);
            }

            return responseList;
        }
}
