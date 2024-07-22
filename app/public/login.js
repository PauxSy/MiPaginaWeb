document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = e.target.user.value;
  const password = e.target.password.value;
  const mensajeError = document.getElementsByClassName("error")[0];

  // Ocultar el mensaje de error al inicio
  mensajeError.classList.add("escondido");

  // Validar campos vacíos
  if (!user || !password) {
    mensajeError.textContent = "Debes proporcionar usuario y contraseña";
    mensajeError.classList.remove("escondido");
    return;
  }

  try {
    const res = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, password }),
    });

    if (!res.ok) {
      const resJson = await res.json();
      mensajeError.textContent = resJson.message || "Error durante el login";
      mensajeError.classList.remove("escondido");
      return;
    }

    const resJson = await res.json();
    if (resJson.redirect) {
      // Mostrar alerta de éxito
      alert("Inicio de sesión exitoso");

      // Redirigir después de la alerta
      window.location.href = resJson.redirect;
    }
  } catch (error) {
    console.error("Error durante el login:", error);
    mensajeError.textContent = "Error al iniciar sesión";
    mensajeError.classList.remove("escondido");
  }
});
