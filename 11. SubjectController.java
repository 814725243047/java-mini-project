package com.attendance.controller;

import com.attendance.model.Subject;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/subjects")
@CrossOrigin
public class SubjectController {

    private final List<Subject> subjects =
            new ArrayList<>();

    public SubjectController() {

        subjects.add(
                new Subject(
                        "AD25101",
                        "Python for Data Science",
                        "AI & DS"
                )
        );

        subjects.add(
                new Subject(
                        "AD25102",
                        "Java Programming",
                        "AI & DS"
                )
        );

        subjects.add(
                new Subject(
                        "AD25103",
                        "Data Structures",
                        "AI & DS"
                )
        );
    }

    @GetMapping
    public List<Subject> getSubjects() {
        return subjects;
    }

    @PostMapping
    public Subject addSubject(
            @RequestBody Subject subject) {

        subjects.add(subject);

        return subject;
    }

    @DeleteMapping("/{code}")
    public String deleteSubject(
            @PathVariable String code) {

        subjects.removeIf(
                subject -> subject.getCode().equals(code)
        );

        return "Subject deleted successfully";
    }
}
