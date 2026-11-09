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
const input = document.getElementById("email");
const button = document.getElementById("submit-button");
const message = document.getElementById("form-message");

const xpFill = document.getElementById("xp-fill");
const xpValue = document.getElementById("xp-value");
const xpLabel = document.getElementById("xp-label");

const BUTTON_TEXT = "¡UNIRSE A KODICODE!";

// ======================================
// BARRA DE XP
// ======================================

function setXP(percent, label) {
  xpFill.style.width = percent + "%";
  xpFill.classList.toggle("on", percent > 0);
  xpValue.textContent = percent + "%";
  xpLabel.textContent = label || "NIVEL 1";
}

input.addEventListener("input", function () {
  const value = input.value.trim();

  if (!value) setXP(0);
  else if (input.checkValidity()) setXP(100, "¡LISTO!");
  else if (value.includes("@")) setXP(66);
  else setXP(33);
});

// ======================================
// MENSAJES
// ======================================

function showMessage(text, success) {
  message.textContent = text;

  // Reiniciar clases para que la animación se repita
  message.className = "";
  void message.offsetWidth;
  message.className = "show " + (success ? "success" : "error");
}

// ======================================
// CONFETI
// ======================================

function launchConfetti() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const colors = ["#fde047", "#2dd4bf", "#fb7185", "#a78bfa", "#a3e635", "#2563eb"];
  const rect = button.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;

  for (let i = 0; i < 40; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";

    const angle = Math.random() * Math.PI * 2;
    const distance = 90 + Math.random() * 160;

    piece.style.left = originX + "px";
    piece.style.top = originY + "px";
    piece.style.background = colors[i % colors.length];
    piece.style.borderRadius = i % 3 === 0 ? "50%" : "3px";
    piece.style.setProperty("--dx", Math.cos(angle) * distance + "px");
    piece.style.setProperty("--dy", Math.sin(angle) * distance + 60 + "px");
    piece.style.setProperty("--rot", Math.random() * 720 - 360 + "deg");

    document.body.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove());
  }
}

// ======================================
// ENVÍO DEL FORMULARIO
// ======================================

form.addEventListener("submit", async function (event) {

  event.preventDefault();

  const email = input.value.trim();

  // VALIDAR CORREO
  if (!email) {
    showMessage("Por favor, introduce tu correo electrónico.", false);
    return;
  }

  // DESACTIVAR BOTÓN
  button.disabled = true;
  button.textContent = "ENVIANDO...";

  message.className = "";

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
    setXP(100, "¡NIVEL 2!");
    launchConfetti();

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
    button.textContent = BUTTON_TEXT;

  }

});