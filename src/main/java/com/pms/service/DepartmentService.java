package com.pms.service;

import com.pms.models.Department;
import com.pms.models.Student;
import com.pms.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DepartmentService {
    private final DepartmentRepository departmentRepository;


    public List<Student> getStudents(Long id) {
        Department dbDepartment = null;
        List<Student> students = new ArrayList<>();
        Optional<Department> optional = departmentRepository.findById(id);
        if (optional.isPresent()) {
            dbDepartment = optional.get();
            students = dbDepartment.getStudents();
        }
        return students;
    }

}
