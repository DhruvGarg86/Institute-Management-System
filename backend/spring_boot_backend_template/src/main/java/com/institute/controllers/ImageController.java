package com.institute.controllers;

import com.institute.payload.ImageResponse;
import com.institute.service.FileService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/image")
public class ImageController {

    private final FileService fileService;

    @Value("${project.image}")
    private String path;

    public ImageController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping(value = "/upload",
    consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ImageResponse> uploadImage(@RequestParam("image") MultipartFile image) {
        try {
            String fileName = fileService.uploadImages(path, image);

            // URL to access image
            String relativePath = "/TeacherImages/" + fileName;

            return new ResponseEntity<>(new ImageResponse(relativePath, "Image uploaded successfully"), HttpStatus.OK);

        } catch (IOException e) {
            return new ResponseEntity<>(new ImageResponse(null, "Image upload failed"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
