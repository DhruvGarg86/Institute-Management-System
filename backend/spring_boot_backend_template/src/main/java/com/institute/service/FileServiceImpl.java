package com.institute.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

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
}
