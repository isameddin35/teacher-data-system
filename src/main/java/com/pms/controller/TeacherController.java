package com.pms.controller;

import com.pms.models.Department;
import com.pms.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("teacher")
@RequiredArgsConstructor
public class TeacherController {

    private final TeacherService departmentService;

    @PostMapping("get-dep/{id}")
    public List<Department> getDepartment(@PathVariable("id") Long id) {
        return departmentService.getDepartment(id);
    }
}
