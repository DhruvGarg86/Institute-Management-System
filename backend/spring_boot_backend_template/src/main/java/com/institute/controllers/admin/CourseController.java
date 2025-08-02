package com.institute.controllers.admin;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import com.institute.service.admin.CourseService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
public class CourseController {
//	 course apis ----------------------------------------------------------
		public final CourseService courseService;
		
		@GetMapping("/display-course")
		public ResponseEntity<?> displayAllCourses(){
			List<CourseDto> Courses = courseService.getAllCourses();
			if(Courses.isEmpty())
				return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
			return ResponseEntity.ok(Courses);
			
		}
		
		@PostMapping("/add-course")
		@Operation(description = "add new course")
		public ResponseEntity<?> addNewCourse(@Valid @RequestBody CourseDto CourseDto) {
		    return ResponseEntity.status(HttpStatus.CREATED)
		                         .body(courseService.addCourse(CourseDto));
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
		public ResponseEntity<ApiResponse> deleteCourse(@PathVariable Long courseId) {
		    ApiResponse response = courseService.deleteCourseById(courseId);
		    
		    // Use 200 OK for success with a response body
		    HttpStatus status = response.getMessage().equalsIgnoreCase("Course deleted successfully (soft delete).")
		            ? HttpStatus.OK
		            : HttpStatus.BAD_REQUEST;
		    
		    return ResponseEntity.status(status).body(response);
		}
			
}
