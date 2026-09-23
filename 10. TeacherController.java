package com.attendance.controller;

import com.attendance.model.Teacher;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/teachers")
@CrossOrigin
public class TeacherController {

    private final List<Teacher> teachers =
            new ArrayList<>();

    public TeacherController() {

        teachers.add(
                new Teacher(
                        "T001",
                        "Dr. Kumar",
                        "AI & DS",
                        "Python"
                )
        );

        teachers.add(
                new Teacher(
                        "T002",
                        "Mr. Raj",
                        "AI & DS",
                        "Java"
                )
        );
    }

    @GetMapping
    public List<Teacher> getTeachers() {
        return teachers;
    }

    @PostMapping
    public Teacher addTeacher(
            @RequestBody Teacher teacher) {

        teachers.add(teacher);

        return teacher;
    }

    @DeleteMapping("/{id}")
    public String deleteTeacher(
            @PathVariable String id) {

        teachers.removeIf(
                teacher -> teacher.getId().equals(id)
        );

        return "Teacher deleted successfully";
    }
}
