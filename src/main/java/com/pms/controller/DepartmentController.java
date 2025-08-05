package com.pms.controller;

import com.pms.models.Student;
import com.pms.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("department")
@RequiredArgsConstructor
public class DepartmentController {
    private final DepartmentService departmentService;

    @PostMapping("get-students/{id}")
    public List<Student> getStudents(@PathVariable("id") Long id) {
        return departmentService.getStudents(id);
    }
}
