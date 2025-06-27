document.addEventListener("DOMContentLoaded", () => {
    const studentsTableBody = document.querySelector("#students-table tbody");
    const getStudentsBtn = document.getElementById("get-students-btn");
    const form = document.getElementById("add-student-form");

    let editingId = null;

    getStudentsBtn.addEventListener("click", getStudents);

    studentsTableBody.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-btn")) {
            const id = event.target.dataset.id;
            deleteStudent(id);
        }

        if (event.target.classList.contains("edit-btn")) {
            const id = event.target.dataset.id;
            startEditing(id);
        }
    });

    function getStudents() {
        fetch("http://localhost:3000/students")
            .then((response) => response.json())
            .then((students) => {
                studentsTableBody.innerHTML = "";

                students.forEach((student) => {
                    const row = document.createElement("tr");

                    row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.course}</td>
            <td>${student.skills.join(", ")}</td>
            <td>${student.email}</td>
            <td>${student.isEnrolled ? "Так" : "Ні"}</td>
            <td>
              <button class="edit-btn" data-id="${student.id}">Редагувати</button>
              <button class="delete-btn" data-id="${student.id}">Видалити</button>
            </td>
          `;

                    studentsTableBody.appendChild(row);
                });
            })
            .catch(() => { });
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const studentData = {
            name: document.getElementById("name").value.trim(),
            age: Number(document.getElementById("age").value),
            course: document.getElementById("course").value.trim(),
            skills: document.getElementById("skills").value.replace(/\s*,\s*/g, ",").split(","),
            email: document.getElementById("email").value.trim(),
            isEnrolled: document.getElementById("isEnrolled").checked,
        };

        if (editingId) {
            fetch(`http://localhost:3000/students/${editingId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(studentData),
            })
                .then((response) => {
                    if (response.ok) {
                        editingId = null;
                        form.reset();
                        getStudents();
                    }
                })
                .catch(() => { });
        } else {
            fetch("http://localhost:3000/students", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(studentData),
            })
                .then((response) => response.json())
                .then(() => {
                    form.reset();
                    getStudents();
                })
                .catch(() => { });
        }
    });

    function startEditing(id) {
        fetch(`http://localhost:3000/students/${id}`)
            .then((response) => response.json())
            .then((student) => {
                document.getElementById("name").value = student.name;
                document.getElementById("age").value = student.age;
                document.getElementById("course").value = student.course;
                document.getElementById("skills").value = student.skills.join(", ");
                document.getElementById("email").value = student.email;
                document.getElementById("isEnrolled").checked = student.isEnrolled;

                editingId = id;
            })
            .catch(() => { });
    }

    function deleteStudent(id) {
        fetch(`http://localhost:3000/students/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) getStudents();
            })
            .catch(() => { });
    }
});
