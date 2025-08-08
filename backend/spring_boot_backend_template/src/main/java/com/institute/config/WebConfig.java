package com.institute.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${project.image}")
    private String imageDir;

    @Value("${project.pdf}")
    private String pdfDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve images
        String imagePath = Paths.get(imageDir).toAbsolutePath().toUri().toString();
        registry.addResourceHandler("/TeacherImages/**")
                .addResourceLocations(imagePath);

        // Serve PDFs
        String pdfPath = Paths.get(pdfDir).toAbsolutePath().toUri().toString();
        registry.addResourceHandler("/NoticePDFs/**")
                .addResourceLocations(pdfPath);
    }
}
