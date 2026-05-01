const API_URL = "http://localhost:5000";

function addStudent() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const course = document.getElementById("course").value;
  const marks = document.getElementById("marks").value;

  if (!name || !email || !course || !marks) {
    alert("Please fill all fields");
    return;
  }

  fetch(`${API_URL}/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      email: email,
      course: course,
      marks: Number(marks)
    })
  })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      loadStudents();

      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("course").value = "";
      document.getElementById("marks").value = "";
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Backend connection failed");
    });
}

function loadStudents() {
  const studentList = document.getElementById("studentList");

  studentList.innerHTML = "<p>Loading...</p>";

  fetch(`${API_URL}/students`)
    .then(response => response.json())
    .then(data => {
      studentList.innerHTML = "";

      if (data.length === 0) {
        studentList.innerHTML = "<p>No students found.</p>";
        return;
      }

      data.forEach(student => {
        const div = document.createElement("div");
        div.className = "student";

        div.innerHTML = `
          <h3>${student.name}</h3>
          <p><strong>Email:</strong> ${student.email}</p>
          <p><strong>Course:</strong> ${student.course}</p>
          <p><strong>Marks:</strong> ${student.marks}</p>
          <p><strong>Grade:</strong> ${student.grade}</p>
          <p><strong>Status:</strong> ${student.status}</p>
        `;

        studentList.appendChild(div);
      });
    })
    .catch(error => {
      console.error("Error:", error);
      studentList.innerHTML = "<p>Failed to load students.</p>";
    });
}