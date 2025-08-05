package com.institute.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service

public class FileServiceImpl implements FileService {

    @Override
    public String uploadImages(String path, MultipartFile file) throws IOException {

        String name = file.getOriginalFilename();

        String filePath = path + File.separator + name;

        File dir = new File(path);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        file.transferTo(new File(filePath));


        return name;
    }

    @Override
    public String uploadPdfs(String path, MultipartFile file) throws IOException {
        // TO Check if file is of 'PDF' format.
        String contentType = file.getContentType();
        if (contentType == null || !contentType.equalsIgnoreCase("application/pdf")) {
            throw new IOException("Invalid file type. Only PDF is allowed.");
        }
        String name = file.getOriginalFilename();
        String filePath = path + File.separator + name;

        File dir = new File(path);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        file.transferTo(new File(filePath));
        return name;
    }
}
