const RegisterPage = () => {
  return `
        <div class="register_wrapper">
            <div class="register_box">
                <h2>Register</h2>
                <form id="registerForm">
                    <div class="input_group">
                        <input type="text" id="registerUsername" placeholder="Username" required>
                    </div>
                    <div class="input_group">
                        <input type="email" id="registerEmail" placeholder="Email" required>
                    </div>
                    <div class="input_group">
                        <input type="password" id="registerPassword" placeholder="Password" required>
                    </div>
                    <div class="input_group">
                        <button type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>
    `;
};

const setupRegister = () => {
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("registerUsername").value;
      const email = document.getElementById("registerEmail").value;
      const password = document.getElementById("registerPassword").value;

      try {
        const response = await fetch("http://localhost:5000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        });

        const result = await response.json();
        if (response.ok) {
          alert("Registration successful! Please login.");
          navigateTo("login");
        } else {
          alert(`Error: ${result.message}`);
        }
      } catch (error) {
        console.error("Registration error:", error);
        alert("Registration failed. Please try again.");
      }
    });
  }
};

export { RegisterPage, setupRegister };
