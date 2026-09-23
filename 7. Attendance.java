package com.attendance.model;

public class Attendance {

    private String date;
    private String studentId;
    private String studentName;
    private String subject;
    private String className;
    private String status;

    public Attendance() {
    }

    public Attendance(
            String date,
            String studentId,
            String studentName,
            String subject,
            String className,
            String status) {

        this.date = date;
        this.studentId = studentId;
        this.studentName = studentName;
        this.subject = subject;
        this.className = className;
        this.status = status;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
