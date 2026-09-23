package com.attendance.model;

public class Teacher {

    private String id;
    private String name;
    private String department;
    private String subject;

    public Teacher() {
    }

    public Teacher(
            String id,
            String name,
            String department,
            String subject) {

        this.id = id;
        this.name = name;
        this.department = department;
        this.subject = subject;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }
}
