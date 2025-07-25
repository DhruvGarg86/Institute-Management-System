package com.institute.controllers.admin;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/dashboard")

public class DashboardControllers {
    private final DashboardService dashboardService;
}
