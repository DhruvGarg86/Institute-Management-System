package com.institute.controllers.teacher;

import com.institute.dto.admin.StudentDetailsDTO;
import com.institute.dto.admin.StudentPercentageDto;
import com.institute.entities.Student;
import com.institute.security.AuthUtil;
import com.institute.service.admin.StudentService;
import com.institute.service.teacher.TeacherStudentService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/teacher/students")
@AllArgsConstructor
public class TeacherStudentController {

    private final TeacherStudentService teacherStudentService;
    private final StudentService studentService;

//    ----------with JWT
//    @GetMapping("/students")
//    public ResponseEntity<List<Student>> getMyStudents() {
//        Long teacherId = AuthUtil.getCurrentUserId(); // assuming JWT provides the ID
//        List<Student> students = teacherStudentService.findStudentsByTeacherId(teacherId);
//        return ResponseEntity.ok(students);
//    }

//    WITHOUT JWT
    @GetMapping("/{teacherId}")
    public ResponseEntity<List<StudentDetailsDTO>> getStudentsByTeacher(@PathVariable Long teacherId) {
        return ResponseEntity.ok(teacherStudentService.getStudentsByTeacher(teacherId));
    }

    @GetMapping("/marks/{studentId}")
    public ResponseEntity<?> getStudentMarks(@PathVariable Long studentId) {
        return ResponseEntity.ok(studentService.getStudentWithMarks(studentId));
    }

    @GetMapping("/attendance")
    public ResponseEntity<List<StudentPercentageDto>> getStudentPercentages() {
        List<StudentPercentageDto> data = studentService.getAllStudentPercentages();
        return ResponseEntity.ok(data);
    }


}
