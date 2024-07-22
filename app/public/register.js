const mensajeError = document.getElementsByClassName("error")[0];

document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Obtener los valores del formulario
  const user = e.target.user.value;
  const email = e.target.email.value;
  const password = e.target.password.value;

  // Ocultar el mensaje de error al inicio
  mensajeError.classList.add("escondido");

  try {
    const res = await fetch("http://localhost:4000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, email, password }),
    });

    if (!res.ok) {
      // Mostrar mensaje de error
      const resJson = await res.json();
      mensajeError.textContent = resJson.message || "Error durante el registro";
      mensajeError.classList.remove("escondido");
      return;
    }

    // Mostrar alerta de éxito
    alert("Usuario registrado exitosamente! Ahora puedes iniciar sesión!");
    window.location.href = "/login"; // Cambia 'login.html' por la URL de tu página de login

    // Opcional: Redirigir o limpiar el formulario si es necesario
    // window.location.href = "pagina_deseada.html";
    e.target.reset(); // Limpiar el formulario después del registro si se desea
  } catch (error) {
    console.error("Error durante el registro:", error);
    mensajeError.textContent = "Error al registrar el usuario";
    mensajeError.classList.remove("escondido");
  }
});
