const API_URL = "http://54.167.44.161:5000";

function addOrUpdateStudent() {
  const id = document.getElementById("studentId").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const course = document.getElementById("course").value;
  const marks = document.getElementById("marks").value;

  if (!name || !email || !course || !marks) {
    alert("Please fill all fields");
    return;
  }

  const studentData = { name, email, course, marks: Number(marks) };

  if (id) {
    fetch(`${API_URL}/students/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studentData)
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || "Student updated");
        clearForm();
        loadStudents();
      })
      .catch((err) => {
        console.error(err);
        alert("Error updating student");
      });
  } else {
    fetch(`${API_URL}/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studentData)
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || "Student added");
        clearForm();
        loadStudents();
      })
      .catch((err) => {
        console.error(err);
        alert("Error adding student");
      });
  }
}

function loadStudents() {
  fetch(`${API_URL}/students`)
    .then((res) => res.json())
    .then((students) => {
      const table = document.getElementById("studentTable");
      table.innerHTML = "";

      students.forEach((student) => {
        table.innerHTML += `
          <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>${student.marks}</td>
            <td>${student.grade}</td>
            <td>${student.status}</td>
            <td>
              <button onclick="editStudent(${student.id}, '${student.name}', '${student.email}', '${student.course}', ${student.marks})">Edit</button>
              <button onclick="deleteStudent(${student.id})">Delete</button>
            </td>
          </tr>
        `;
      });
    })
    .catch((err) => {
      console.error(err);
      alert("Error loading students");
    });
}

function editStudent(id, name, email, course, marks) {
  document.getElementById("studentId").value = id;
  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("course").value = course;
  document.getElementById("marks").value = marks;
  document.getElementById("submitBtn").innerText = "Update Student";
}

function deleteStudent(id) {
  if (!confirm("Are you sure you want to delete this student?")) {
    return;
  }

  fetch(`${API_URL}/students/${id}`, {
    method: "DELETE"
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message || "Student deleted");
      loadStudents();
    })
    .catch((err) => {
      console.error(err);
      alert("Error deleting student");
    });
}

function clearForm() {
  document.getElementById("studentId").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("course").value = "";
  document.getElementById("marks").value = "";
  document.getElementById("submitBtn").innerText = "Add Student";
}
