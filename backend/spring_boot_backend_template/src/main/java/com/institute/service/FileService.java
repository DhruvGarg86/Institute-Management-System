package com.institute.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService{
    String uploadImages(String path, MultipartFile file) throws IOException;
}
