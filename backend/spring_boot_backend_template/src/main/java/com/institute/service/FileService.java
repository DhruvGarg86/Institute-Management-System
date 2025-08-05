package com.institute.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface FileService{
    String uploadImages(String path, MultipartFile file) throws IOException;
    String uploadPdfs(String path, MultipartFile file) throws IOException;
}
