package com.attendance.controller;

import com.attendance.model.Student;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin
public class StudentController {

    private final List<Student> students =
            new ArrayList<>();

    public StudentController() {

        students.add(
                new Student(
                        "25AD001",
                        "Arun Kumar",
                        "Artificial Intelligence and Data Science",
                        "AI & DS - A",
                        "9876543210"
                )
        );

        students.add(
                new Student(
                        "25AD002",
                        "Rahul Kumar",
                        "Artificial Intelligence and Data Science",
                        "AI & DS - A",
                        "9876543211"
                )
        );

        students.add(
                new Student(
                        "25AD003",
                        "Priya S",
                        "Artificial Intelligence and Data Science",
                        "AI & DS - A",
                        "9876543212"
                )
        );
    }

    @GetMapping
    public List<Student> getStudents() {
        return students;
    }

    @PostMapping
    public Student addStudent(
            @RequestBody Student student) {

        students.add(student);

        return student;
    }

    @DeleteMapping("/{id}")
    public String deleteStudent(
            @PathVariable String id) {

        students.removeIf(
                student -> student.getId().equals(id)
        );

        return "Student deleted successfully";
    }
}
