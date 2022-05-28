async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (password.length < 4) {
    alert("Please choose a password with at least four characters.");
  }
  else if (username && password) {
    const response = await fetch("/api/users", {
      method: "post",
      body: JSON.stringify({
        username,
        password
      }),
      headers: { "Content-Type": "application/json" }
    });
    // check the response status
    if (response.ok) {
      document.location.replace("/dashboard");
    }
    else {
      alert(response.statusText);
    }
  }
}

document.querySelector(".signup-form").addEventListener("submit", signupFormHandler);