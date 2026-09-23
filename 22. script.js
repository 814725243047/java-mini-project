const API = "/api";


/* =========================
   LOGIN
========================= */

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const username =
                document.getElementById(
                    "username"
                ).value;

            const password =
                document.getElementById(
                    "password"
                ).value;


            const response =
                await fetch(
                    API + "/login",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            username,
                            password
                        })
                    }
                );


            const result =
                await response.json();


            if (result.success) {

                sessionStorage.setItem(
                    "loggedIn",
                    "true"
                );

                window.location.href =
                    "dashboard.html";

            } else {

                document.getElementById(
                    "loginMessage"
                ).innerText =
                    result.message;

            }

        }
    );
}


/* =========================
   LOGOUT
========================= */

function logout() {

    sessionStorage.removeItem(
        "loggedIn"
    );

}


/* =========================
   DASHBOARD
========================= */

async function loadDashboard() {

    const students =
        await getData("/students");

    const teachers =
        await getData("/teachers");

    const subjects =
        await getData("/subjects");

    const attendance =
        await getData("/attendance");


    document.getElementById(
        "totalStudents"
    ).innerText =
        students.length;


    document.getElementById(
        "totalTeachers"
    ).innerText =
        teachers.length;


    document.getElementById(
        "totalSubjects"
    ).innerText =
        subjects.length;


    const total =
        attendance.length;


    const present =
        attendance.filter(
            a => a.status === "Present"
        ).length;


    const absent =
        attendance.filter(
            a => a.status === "Absent"
        ).length;


    const percentage =
        total === 0
        ? 0
        : Math.round(
            (present / total) * 100
        );


    document.getElementById(
        "overallAttendance"
    ).innerText =
        percentage + "%";


    document.getElementById(
        "presentCount"
    ).innerText =
        present;


    document.getElementById(
        "absentCount"
    ).innerText =
        absent;

}


/* =========================
   STUDENTS
========================= */

let allStudents = [];


async function loadStudents() {

    allStudents =
        await getData("/students");

    displayStudents(allStudents);

}


function displayStudents(students) {

    const table =
        document.getElementById(
            "studentTable"
        );

    table.innerHTML = "";


    students.forEach(student => {

        table.innerHTML += `

        <tr>

            <td>${student.id}</td>

            <td>${student.name}</td>

            <td>${student.department}</td>

            <td>${student.className}</td>

            <td>${student.phone}</td>

            <td>

                <button
                    class="danger-btn"
                    onclick="
                    deleteStudent('${student.id}')
                    ">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}


function filterStudents() {

    const value =
        document.getElementById(
            "studentSearch"
        ).value.toLowerCase();


    const filtered =
        allStudents.filter(student =>

            student.id
                .toLowerCase()
                .includes(value)

            ||

            student.name
                .toLowerCase()
                .includes(value)

            ||

            student.department
                .toLowerCase()
                .includes(value)

        );


    displayStudents(filtered);

}


function showStudentForm() {

    const form =
        document.getElementById(
            "studentForm"
        );

    form.style.display =
        form.style.display === "none"
        ? "grid"
        : "none";

}


async function addStudent() {

    const student = {

        id:
            document.getElementById(
                "studentId"
            ).value,

        name:
            document.getElementById(
                "studentName"
            ).value,

        department:
            document.getElementById(
                "studentDepartment"
            ).value,

        className:
            document.getElementById(
                "studentClass"
            ).value,

        phone:
            document.getElementById(
                "studentPhone"
            ).value

    };


    if (!student.id || !student.name) {

        alert(
            "Student ID and Name are required"
        );

        return;

    }


    await postData(
        "/students",
        student
    );


    alert(
        "Student added successfully"
    );


    loadStudents();

}


async function deleteStudent(id) {

    if (!confirm(
        "Delete this student?"
    )) {

        return;

    }


    await fetch(
        API + "/students/" + id,
        {
            method: "DELETE"
        }
    );


    loadStudents();

}


/* =========================
   TEACHERS
========================= */

async function loadTeachers() {

    const teachers =
        await getData("/teachers");

    const table =
        document.getElementById(
            "teacherTable"
        );

    table.innerHTML = "";


    teachers.forEach(teacher => {

        table.innerHTML += `

        <tr>

            <td>${teacher.id}</td>

            <td>${teacher.name}</td>

            <td>${teacher.department}</td>

            <td>${teacher.subject}</td>

            <td>

                <button
                    class="danger-btn"
                    onclick="
                    deleteTeacher('${teacher.id}')
                    ">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}


function showTeacherForm() {

    const form =
        document.getElementById(
            "teacherForm"
        );

    form.style.display =
        form.style.display === "none"
        ? "grid"
        : "none";

}


async function addTeacher() {

    const teacher = {

        id:
            document.getElementById(
                "teacherId"
            ).value,

        name:
            document.getElementById(
                "teacherName"
            ).value,

        department:
            document.getElementById(
                "teacherDepartment"
            ).value,

        subject:
            document.getElementById(
                "teacherSubject"
            ).value

    };


    await postData(
        "/teachers",
        teacher
    );


    alert(
        "Teacher added successfully"
    );


    loadTeachers();

}


async function deleteTeacher(id) {

    if (!confirm(
        "Delete this teacher?"
    )) {

        return;

    }


    await fetch(
        API + "/teachers/" + id,
        {
            method: "DELETE"
        }
    );


    loadTeachers();

}


/* =========================
   SUBJECTS
========================= */

async function loadSubjects() {

    const subjects =
        await getData("/subjects");

    const table =
        document.getElementById(
            "subjectTable"
        );

    table.innerHTML = "";


    subjects.forEach(subject => {

        table.innerHTML += `

        <tr>

            <td>${subject.code}</td>

            <td>${subject.name}</td>

            <td>${subject.department}</td>

            <td>

                <button
                    class="danger-btn"
                    onclick="
                    deleteSubject('${subject.code}')
                    ">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}


function showSubjectForm() {

    const form =
        document.getElementById(
            "subjectForm"
        );

    form.style.display =
        form.style.display === "none"
        ? "grid"
        : "none";

}


async function addSubject() {

    const subject = {

        code:
            document.getElementById(
                "subjectCode"
            ).value,

        name:
            document.getElementById(
                "subjectName"
            ).value,

        department:
            document.getElementById(
                "subjectDepartment"
            ).value

    };


    await postData(
        "/subjects",
        subject
    );


    alert(
        "Subject added successfully"
    );


    loadSubjects();

}


async function deleteSubject(code) {

    if (!confirm(
        "Delete this subject?"
    )) {

        return;

    }


    await fetch(
        API + "/subjects/" + code,
        {
            method: "DELETE"
        }
    );


    loadSubjects();

}


/* =========================
   ATTENDANCE
========================= */

let attendanceStudents = [];

let attendanceStatus = {};


async function loadAttendancePage() {

    attendanceStudents =
        await getData("/students");


    const subjects =
        await getData("/subjects");


    const subjectSelect =
        document.getElementById(
            "attendanceSubject"
        );


    subjectSelect.innerHTML = "";


    subjects.forEach(subject => {

        subjectSelect.innerHTML += `

        <option value="${subject.code}">
            ${subject.name}
        </option>

        `;

    });


    const dateInput =
        document.getElementById(
            "attendanceDate"
        );


    dateInput.value =
        new Date()
        .toISOString()
        .split("T")[0];


    attendanceStudents.forEach(student => {

        attendanceStatus[
            student.id
        ] = "Present";

    });


    displayAttendance();

}


function displayAttendance() {

    const table =
        document.getElementById(
            "attendanceTable"
        );

    table.innerHTML = "";


    attendanceStudents.forEach(student => {

        const status =
            attendanceStatus[
                student.id
            ] || "Present";


        table.innerHTML += `

        <tr>

            <td>${student.id}</td>

            <td>${student.name}</td>

            <td>${student.className}</td>

            <td>

                <button
                    class="${
                        status === "Present"
                        ? "attendance-selected-present"
                        : "attendance-present"
                    }"
                    onclick="
                    setAttendance(
                        '${student.id}',
                        'Present'
                    )">

                    Present

                </button>


                <button
                    class="${
                        status === "Absent"
                        ? "attendance-selected-absent"
                        : "attendance-absent"
                    }"
                    onclick="
                    setAttendance(
                        '${student.id}',
                        'Absent'
                    )">

                    Absent

                </button>

            </td>

        </tr>

        `;

    });

}


function setAttendance(
    studentId,
    status
) {

    attendanceStatus[
        studentId
    ] = status;

    displayAttendance();

}


function markAllPresent() {

    attendanceStudents.forEach(
        student => {

            attendanceStatus[
                student.id
            ] = "Present";

        }
    );

    displayAttendance();

}


function markAllAbsent() {

    attendanceStudents.forEach(
        student => {

            attendanceStatus[
                student.id
            ] = "Absent";

        }
    );

    displayAttendance();

}


async function saveAttendance() {

    const date =
        document.getElementById(
            "attendanceDate"
        ).value;


    const subject =
        document.getElementById(
            "attendanceSubject"
        ).value;


    const className =
        document.getElementById(
            "attendanceClass"
        ).value;


    for (
        const student
        of attendanceStudents
    ) {

        const record = {

            date: date,

            studentId:
                student.id,

            studentName:
                student.name,

            subject:
                subject,

            className:
                className,

            status:
                attendanceStatus[
                    student.id
                ] || "Present"

        };


        await postData(
            "/attendance",
            record
        );

    }


    alert(
        "Attendance saved successfully!"
    );

}


/* =========================
   RECORDS
========================= */

let allRecords = [];


async function loadRecords() {

    allRecords =
        await getData("/attendance");

    displayRecords(allRecords);

}


function displayRecords(records) {

    const table =
        document.getElementById(
            "recordTable"
        );

    table.innerHTML = "";


    records
        .slice()
        .reverse()
        .forEach(record => {

            const statusClass =
                record.status === "Present"
                ? "status-present"
                : "status-absent";


            table.innerHTML += `

            <tr>

                <td>${record.date}</td>

                <td>${record.studentId}</td>

                <td>${record.studentName}</td>

                <td>${record.subject}</td>

                <td>${record.className}</td>

                <td>

                    <span
                        class="status ${statusClass}">

                        ${record.status}

                    </span>

                </td>

            </tr>

            `;

        });

}


function filterRecords() {

    const value =
        document.getElementById(
            "recordSearch"
        ).value.toLowerCase();


    const filtered =
        allRecords.filter(record =>

            record.studentId
                .toLowerCase()
                .includes(value)

            ||

            record.studentName
                .toLowerCase()
                .includes(value)

            ||

            record.subject
                .toLowerCase()
                .includes(value)

        );


    displayRecords(filtered);

}


/* =========================
   REPORTS
========================= */

async function loadReports() {

    const students =
        await getData("/students");


    const records =
        await getData("/attendance");


    const table =
        document.getElementById(
            "reportTable"
        );


    const lowTable =
        document.getElementById(
            "lowAttendanceTable"
        );


    table.innerHTML = "";
    lowTable.innerHTML = "";


    students.forEach(student => {

        const studentRecords =
            records.filter(
                record =>
                    record.studentId ===
                    student.id
            );


        const total =
            studentRecords.length;


        const present =
            studentRecords.filter(
                record =>
                    record.status ===
                    "Present"
            ).length;


        const absent =
            studentRecords.filter(
                record =>
                    record.status ===
                    "Absent"
            ).length;


        const percentage =
            total === 0
            ? 0
            : Math.round(
                (present / total) * 100
            );


        const statusClass =
            percentage < 75
            ? "status-warning"
            : "status-present";


        table.innerHTML += `

        <tr>

            <td>${student.id}</td>

            <td>${student.name}</td>

            <td>${total}</td>

            <td>${present}</td>

            <td>${absent}</td>

            <td>

                <span
                    class="status ${statusClass}">

                    ${percentage}%

                </span>

            </td>

        </tr>

        `;


        if (
            total > 0 &&
            percentage < 75
        ) {

            lowTable.innerHTML += `

            <tr>

                <td>${student.id}</td>

                <td>${student.name}</td>

                <td>

                    <span
                        class="status status-warning">

                        ${percentage}%

                    </span>

                </td>

            </tr>

            `;

        }

    });

}


/* =========================
   API FUNCTIONS
========================= */

async function getData(endpoint) {

    const response =
        await fetch(
            API + endpoint
        );

    return await response.json();

}


async function postData(
    endpoint,
    data
) {

    const response =
        await fetch(
            API + endpoint,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(data)
            }
        );


    return await response.json();

}
