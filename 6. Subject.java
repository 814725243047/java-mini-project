package com.attendance.model;

public class Subject {

    private String code;
    private String name;
    private String department;

    public Subject() {
    }

    public Subject(
            String code,
            String name,
            String department) {

        this.code = code;
        this.name = name;
        this.department = department;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
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
}
