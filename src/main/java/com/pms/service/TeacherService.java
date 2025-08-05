package com.pms.service;

import com.pms.models.Department;
import com.pms.models.Teacher;
import com.pms.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TeacherService {

    private final TeacherRepository teacherRepository;

    public List<Department> getDepartment(Long id) {
        Teacher dbTeacher = null;
        List<Department> departments = new ArrayList<>();
        Optional<Teacher> optional = teacherRepository.findById(id);
        if (optional.isPresent()) {
            dbTeacher = optional.get();
            departments = dbTeacher.getDepartment();
        }
        return departments;
    }
}
