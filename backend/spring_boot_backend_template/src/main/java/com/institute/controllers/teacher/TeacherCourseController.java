package com.institute.controllers.teacher;

import com.institute.dto.admin.CourseDto;
import com.institute.service.admin.CourseService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/teacher/course")
@AllArgsConstructor
public class TeacherCourseController {

    public final CourseService courseService;

    @GetMapping("/display-course")
    public ResponseEntity<?> displayAllCourses(){
        List<CourseDto> Courses = courseService.getAllCourses();
        if(Courses.isEmpty())
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        return ResponseEntity.ok(Courses);

    }
}
