
// ======================================
// CONFIGURACIÓN DE EMAILJS
// ======================================

emailjs.init({
  publicKey: "ZlUbI0TugaS_KvwCm"
});

// ======================================
// ELEMENTOS DEL FORMULARIO
// ======================================

const form = document.getElementById("subscription-form");
const button = document.getElementById("submit-button");
const message = document.getElementById("form-message");

// ======================================
// FUNCIÓN PARA MOSTRAR MENSAJES
// ======================================

function showMessage(text, success) {

  message.textContent = text;
  message.style.display = "block";

  message.style.backgroundColor = success
    ? "#ccfbf1"
    : "#fee2e2";

  message.style.color = success
    ? "#166534"
    : "#991b1b";
}

// ======================================
// ENVÍO DEL FORMULARIO
// ======================================

form.addEventListener("submit", async function(event) {

  event.preventDefault();

  const email = document.getElementById("email").value.trim();

  // VALIDAR CORREO
  if (!email) {
    showMessage("Por favor, introduce tu correo electrónico.", false);
    return;
  }

  // DESACTIVAR BOTÓN
  button.disabled = true;
  button.textContent = "ENVIANDO...";

  message.style.display = "none";

  try {

    // ENVIAR PLANTILLA DE BIENVENIDA
    await emailjs.send(
      "service_qe25hzc",
      "template_pjlb45g",
      {
        email: email
      }
    );

    // ENVÍO EXITOSO
    showMessage(
      "¡Gracias por unirte a KodiCode! Revisa tu bandeja de entrada.",
      true
    );

    form.reset();

  } catch (error) {

    // ERROR DE ENVÍO
    console.error("Error de EmailJS:", error);

    showMessage(
      "No pudimos completar tu suscripción. Inténtalo nuevamente.",
      false
    );

  } finally {

    // RESTAURAR BOTÓN
    button.disabled = false;
    button.textContent = "¡SUSCRIBIRME! →";

  }

});