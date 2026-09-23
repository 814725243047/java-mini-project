package com.attendance.controller;

import com.attendance.model.Attendance;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin
public class AttendanceController {

    private final List<Attendance> attendance =
            new ArrayList<>();

    @GetMapping
    public List<Attendance> getAttendance() {
        return attendance;
    }

    @PostMapping
    public Attendance saveAttendance(
            @RequestBody Attendance record) {

        for (int i = 0;
             i < attendance.size();
             i++) {

            Attendance old =
                    attendance.get(i);

            if (old.getDate().equals(record.getDate())
                    && old.getStudentId()
                    .equals(record.getStudentId())
                    && old.getSubject()
                    .equals(record.getSubject())) {

                attendance.set(i, record);

                return record;
            }
        }

        attendance.add(record);

        return record;
    }

    @DeleteMapping("/{studentId}/{date}/{subject}")
    public String deleteAttendance(
            @PathVariable String studentId,
            @PathVariable String date,
            @PathVariable String subject) {

        attendance.removeIf(record ->

                record.getStudentId().equals(studentId)
                        && record.getDate().equals(date)
                        && record.getSubject().equals(subject)
        );

        return "Attendance deleted";
    }
}
