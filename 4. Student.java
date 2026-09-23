package com.attendance.model;

public class Student {

    private String id;
    private String name;
    private String department;
    private String className;
    private String phone;

    public Student() {
    }

    public Student(
            String id,
            String name,
            String department,
            String className,
            String phone) {

        this.id = id;
        this.name = name;
        this.department = department;
        this.className = className;
        this.phone = phone;
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

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
