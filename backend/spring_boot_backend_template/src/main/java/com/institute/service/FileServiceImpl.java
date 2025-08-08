package com.institute.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileServiceImpl implements FileService {

    @Override
    public String uploadImages(String relativePath, MultipartFile file) throws IOException {
        return uploadFile(relativePath, file);
    }

    @Override
    public String uploadPdfs(String relativePath, MultipartFile file) throws IOException {
        // Validate content type for PDF
        String contentType = file.getContentType();
        if (contentType == null || !contentType.equalsIgnoreCase("application/pdf")) {
            throw new IOException("Invalid file type. Only PDF is allowed.");
        }

        return uploadFile(relativePath, file);
    }

    private String uploadFile(String relativePath, MultipartFile file) throws IOException {
        String originalName = file.getOriginalFilename();
        String extension = "";

        if (originalName != null && originalName.contains(".")) {
            extension = originalName.substring(originalName.lastIndexOf('.'));
        }

        String uniqueName = UUID.randomUUID().toString() + extension;

        // Resolve relative path to absolute path
        Path uploadDir = Paths.get(relativePath).toAbsolutePath().normalize();
        Files.createDirectories(uploadDir); // Make sure folder exists

        Path filePath = uploadDir.resolve(uniqueName);
        file.transferTo(filePath.toFile());

        return uniqueName;
    }
}
