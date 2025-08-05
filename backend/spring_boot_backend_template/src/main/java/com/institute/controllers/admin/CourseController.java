package com.institute.controllers.admin;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.institute.dto.ApiResponse;
import com.institute.dto.admin.CourseDto;
import com.institute.dto.admin.CourseStatusUpdateDto;
import com.institute.service.admin.CourseService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @GetMapping("/display-course")
    public ResponseEntity<?> displayAllCourses() {
        List<CourseDto> courses = courseService.getAllCourses();
        if (courses.isEmpty())
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        return ResponseEntity.ok(courses);
    }

    @PostMapping("/add-course")
    @Operation(description = "Add a new course")
    public ResponseEntity<?> addNewCourse(@Valid @RequestBody CourseDto courseDto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(courseService.addCourse(courseDto));
    }

    @PutMapping("/edit-course/{courseId}")
    @Operation(summary = "Update course", description = "Updates the details of a course by its ID.")
    public ResponseEntity<?> editCourseById(
            @PathVariable Long courseId,
            @Valid @RequestBody CourseDto dto) {
        return ResponseEntity.ok(courseService.updateCoursesById(courseId, dto));
    }

    @DeleteMapping("/delete-course/{courseId}")
    @Operation(summary = "Soft delete course", description = "Soft deletes the course if its status is INACTIVE.")
    public ResponseEntity<ApiResponse> deleteCourseById(@PathVariable Long courseId) {
        ApiResponse response = courseService.deleteCourseById(courseId);
        HttpStatus status = response.getMessage().contains("successfully")
                ? HttpStatus.OK
                : HttpStatus.BAD_REQUEST;
        return ResponseEntity.status(status).body(response);
    }

    @PutMapping("/update-course-status/{courseId}")
    @Operation(summary = "Update course status", description = "Changes the status (ACTIVE/INACTIVE) of a course")
    public ResponseEntity<ApiResponse> updateCourseStatusById(
            @PathVariable Long courseId,
            @Valid @RequestBody CourseStatusUpdateDto statusDto,
            @AuthenticationPrincipal(expression = "id") Long userId
    ) {
        ApiResponse response = courseService.updateCourseStatus(courseId, statusDto.getStatus());
        return ResponseEntity.ok(response);
    }
}
