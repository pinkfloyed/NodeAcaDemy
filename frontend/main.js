const API_URL = "http://localhost:5000";

const proname = document.getElementById("proname");
const address = document.getElementById("address");
const emailaddress = document.getElementById("emailaddress");
const mobile = document.getElementById("mobile");
const userid = document.getElementById("userid");

const btnCreate = document.getElementById("btn-create");
const btnUpdate = document.getElementById("btn-update");
const btnRead = document.getElementById("btn-read");
const btnDelete = document.getElementById("btn-delete");

const tbody = document.getElementById("tbody");
const notfound = document.getElementById("notfound");
const authStatus = document.getElementById("auth-status");
const logoutBtn = document.getElementById("logout-btn");

const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");
const orderSelect = document.getElementById("order-select");
const paginationDiv = document.getElementById("paginationDiv");

const token = localStorage.getItem("token");

if (!token) {
  alert("You must login first!");
  window.location.href = "login.html";
}


function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

const userPayload = parseJwt(token);
const userRole = userPayload?.role || "viewer";

authStatus.textContent = `Logged in as ${userPayload?.email || "User"} (${userRole})`;
logoutBtn.classList.remove("d-none");
if (userRole !== "admin") {
  btnCreate.style.display = "none";
  btnUpdate.style.display = "none";
  btnDelete.style.display = "none";
}

logoutBtn.onclick = () => {
  localStorage.removeItem("token");
  window.location.href = "login.html";
};


function getAuthHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

let currentPage = 1;
const limit = 5;

async function loadTable(page = 1) {
  notfound.classList.add("d-none");
  tbody.innerHTML = "";

  const search = encodeURIComponent(searchInput.value.trim());
  const sort = sortSelect.value;
  const order = orderSelect.value;

  try {
    const res = await fetch(
      `${API_URL}/students?search=${search}&sort=${sort}&order=${order}&page=${page}&limit=${limit}`,
      { headers: getAuthHeaders() }
    );

    if (!res.ok) {
      if (res.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        window.location.href = "login.html";
        return;
      }
      throw new Error("Failed to load students");
    }

    const data = await res.json();

    if (!data.students || data.students.length === 0) {
      notfound.textContent = "No students found!";
      notfound.classList.remove("d-none");
      paginationDiv.innerHTML = "";
      return;
    }

    data.students.forEach((student) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${student._id}</td>
        <td>${student.name}</td>
        <td>${student.address}</td>
        <td>${student.emailaddress}</td>
        <td>${student.mobile}</td>
        <td>
          ${
            userRole === "admin"
              ? `<button class="btn btn-sm btn-warning edit-btn" data-id="${student._id}" data-name="${student.name}" data-address="${student.address}" data-email="${student.emailaddress}" data-mobile="${student.mobile}">✏️ Edit</button>`
              : ""
          }
        </td>
        <td>
          ${
            userRole === "admin"
              ? `<button class="btn btn-sm btn-danger delete-btn" data-id="${student._id}">🗑️ Delete</button>`
              : ""
          }
        </td>
      `;
      tbody.appendChild(tr);
    });


    paginationDiv.innerHTML = "";
    const totalPages = Math.ceil(data.total / limit);

    if (page > 1) {
      const prevBtn = document.createElement("button");
      prevBtn.textContent = "Previous";
      prevBtn.classList.add("btn", "btn-secondary", "me-2");
      prevBtn.onclick = () => {
        currentPage--;
        loadTable(currentPage);
      };
      paginationDiv.appendChild(prevBtn);
    }

    const pageInfo = document.createElement("span");
    pageInfo.textContent = `Page ${page} of ${totalPages}`;
    paginationDiv.appendChild(pageInfo);

    if (page < totalPages) {
      const nextBtn = document.createElement("button");
      nextBtn.textContent = "Next";
      nextBtn.classList.add("btn", "btn-secondary", "ms-2");
      nextBtn.onclick = () => {
        currentPage++;
        loadTable(currentPage);
      };
      paginationDiv.appendChild(nextBtn);
    }

    attachEditDeleteListeners();
  } catch (error) {
    notfound.textContent = error.message;
    notfound.classList.remove("d-none");
  }
}


function attachEditDeleteListeners() {
  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.onclick = () => {
      userid.value = btn.dataset.id;
      proname.value = btn.dataset.name;
      address.value = btn.dataset.address;
      emailaddress.value = btn.dataset.email;
      mobile.value = btn.dataset.mobile;

      btnCreate.style.display = "none";
      btnUpdate.style.display = "inline-block";
    };
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.onclick = async () => {
      if (!confirm("Are you sure you want to delete this student?")) return;
      const id = btn.dataset.id;
      try {
        const res = await fetch(`${API_URL}/students/${id}`, {
          method: "DELETE",
          headers: getAuthHeaders(),
        });
        if (!res.ok) throw new Error("Failed to delete student");
        alert("Student deleted successfully");
        loadTable(currentPage);
      } catch (error) {
        alert(error.message);
      }
    };
  });
}

function clearInputs() {
  proname.value = "";
  address.value = "";
  emailaddress.value = "";
  mobile.value = "";
  userid.value = "";
  btnCreate.style.display = "inline-block";
  btnUpdate.style.display = "none";
}


btnCreate.onclick = async (e) => {
  e.preventDefault();

  const student = {
    name: proname.value.trim(),
    address: address.value.trim(),
    emailaddress: emailaddress.value.trim(),
    mobile: mobile.value.trim(),
  };

  try {
    const res = await fetch(`${API_URL}/students`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(student),
    });
    if (!res.ok) throw new Error("Failed to create student");
    alert("Student added successfully!");
    clearInputs();
    loadTable(currentPage);
  } catch (error) {
    alert(error.message);
  }
};


btnUpdate.onclick = async () => {
  const id = userid.value;
  if (!id) return alert("No student selected to update");

  const student = {
    name: proname.value.trim(),
    address: address.value.trim(),
    emailaddress: emailaddress.value.trim(),
    mobile: mobile.value.trim(),
  };

  try {
    const res = await fetch(`${API_URL}/students/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(student),
    });
    if (!res.ok) throw new Error("Failed to update student");
    alert("Student updated successfully!");
    clearInputs();
    loadTable(currentPage);
  } catch (error) {
    alert(error.message);
  }
};


btnDelete.onclick = async () => {
  if (!confirm("Are you sure you want to delete all students?")) return;
  try {
    const res = await fetch(`${API_URL}/students`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete all students");
    alert("All students deleted successfully!");
    clearInputs();
    loadTable(1);
  } catch (error) {
    alert(error.message);
  }
};


searchInput.addEventListener("input", () => {
  currentPage = 1;
  loadTable(currentPage);
});

sortSelect.addEventListener("change", () => {
  currentPage = 1;
  loadTable(currentPage);
});

orderSelect.addEventListener("change", () => {
  currentPage = 1;
  loadTable(currentPage);
});


loadTable(currentPage);
