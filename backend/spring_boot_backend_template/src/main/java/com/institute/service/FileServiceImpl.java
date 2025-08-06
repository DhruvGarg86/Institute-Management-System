package com.institute.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service

public class FileServiceImpl implements FileService {

    @Override
    public String uploadImages(String path, MultipartFile file) throws IOException {
        // Get the original filename
        String originalName = file.getOriginalFilename();
        String extension = "";

        if (originalName != null && originalName.contains(".")) {
            extension = originalName.substring(originalName.lastIndexOf('.'));
        }

        // Generate unique filename
        String uniqueName = UUID.randomUUID().toString() + extension;

        // Create directory if not exists
        File dir = new File(path);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        // Define file path
        String filePath = path + File.separator + uniqueName;

        // Save file
        file.transferTo(new File(filePath));

        return uniqueName;
    }

    @Override
    public String uploadPdfs(String path, MultipartFile file) throws IOException {
        // Validate PDF content type
        String contentType = file.getContentType();
        if (contentType == null || !contentType.equalsIgnoreCase("application/pdf")) {
            throw new IOException("Invalid file type. Only PDF is allowed.");
        }

        // Get original filename
        String originalName = file.getOriginalFilename();
        String extension = "";

        if (originalName != null && originalName.contains(".")) {
            extension = originalName.substring(originalName.lastIndexOf('.'));
        }

        // Generate unique filename
        String uniqueName = UUID.randomUUID().toString() + extension;

        // Create directory if not exists
        File dir = new File(path);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        // Define file path
        String filePath = path + File.separator + uniqueName;

        // Save file
        file.transferTo(new File(filePath));

        return uniqueName;
    }
}
