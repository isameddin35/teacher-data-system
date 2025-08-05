package com.pms.service;

import com.pms.models.Student;
import com.pms.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;

    public void updateStudent(List<Student> students) {
        for (Student student : students) {

            Student existing = studentRepository.findById(student.getId()).orElseThrow(() -> new RuntimeException("Not Found"));
            existing.setSdf1(student.getSdf1());
            existing.setSdf2(student.getSdf2());
            existing.setTsi(student.getTsi());
            existing.setSsi(student.getSsi());
            existing.setDvm(student.getDvm());
            existing.setOrt(student.getOrt());

            studentRepository.save(existing);
        }
    }
}