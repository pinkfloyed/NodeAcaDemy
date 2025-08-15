const API_URL = "http://localhost:5000";

const registerForm = document.getElementById("register-form");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const roleSelect = document.getElementById("role");
const messageDiv = document.getElementById("message");

function showMessage(text, type = "error") {
  messageDiv.textContent = text;
  messageDiv.classList.remove("d-none");
  messageDiv.className = `mt-3 alert alert-${type === "success" ? "success" : "danger"}`;
}

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  const role = roleSelect.value;

  const genderRadios = document.getElementsByName("gender");
  let gender = "";
  for (const radio of genderRadios) {
    if (radio.checked) {
      gender = radio.value;
      break;
    }
  }

  if (password !== confirmPassword) {
    showMessage("Passwords do not match.");
    return;
  }

  if (!gender) {
    showMessage("Please select a gender.");
    return;
  }

  const newUser = { username, email, password, confirmPassword, role, gender };

  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Registration failed");

    showMessage("Registration successful! Redirecting to login...", "success");

    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  } catch (error) {
    showMessage(error.message);
  }
});
