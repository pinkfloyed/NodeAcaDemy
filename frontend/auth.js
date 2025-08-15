const API_URL = "http://localhost:5000";

const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const messageDiv = document.getElementById("message");

function showMessage(text, type = "error") {
  messageDiv.textContent = text;
  messageDiv.className = `mt-3 alert alert-${type === "success" ? "success" : "danger"}`;
  messageDiv.classList.remove("d-none");
}

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Login failed");

    localStorage.setItem("token", data.token);
    showMessage("Login successful! Redirecting...", "success");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  } catch (error) {
    showMessage(error.message);
  }
});