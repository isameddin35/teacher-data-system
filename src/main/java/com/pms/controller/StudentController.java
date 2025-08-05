package com.pms.controller;

import com.pms.models.Student;
import com.pms.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("student")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @PostMapping("update")
    public void updateStudent(@RequestBody List<Student> students) {
        studentService.updateStudent(students);
    }
}
