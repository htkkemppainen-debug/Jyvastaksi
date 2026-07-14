
const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".primary-nav");
const form = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status"); function updateHeader() { header.classList.toggle("scrolled", window.scrollY > 16);
} updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true }); menuButton.addEventListener("click", () => { const open = menuButton.getAttribute("aria-expanded") === "true"; menuButton.setAttribute("aria-expanded", String(!open)); nav.classList.toggle("open", !open); document.body.classList.toggle("menu-open", !open);
}); nav.querySelectorAll("a").forEach(link => { link.addEventListener("click", () => { menuButton.setAttribute("aria-expanded", "false"); nav.classList.remove("open"); document.body.classList.remove("menu-open"); });
}); const revealObserver = new IntersectionObserver( entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); revealObserver.unobserve(entry.target); } }); }, { threshold: 0.12 }
); document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el)); form.addEventListener("submit", async event => {
  event.preventDefault();

  if (!form.checkValidity()) {
    formStatus.textContent = "Täytä vähintään nimi, puhelinnumero ja hyväksyntä.";
    form.reportValidity();
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;

  submitButton.disabled = true;
  submitButton.textContent = "Lähetetään…";
  formStatus.textContent = "";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: {
        "Accept": "application/json"
      }
    });

    if (response.ok) {
      form.reset();
      formStatus.textContent = "Kiitos. Yhteydenottopyyntö on lähetetty onnistuneesti.";
    } else {
      const result = await response.json().catch(() => ({}));
      const message = Array.isArray(result.errors)
        ? result.errors.map(error => error.message).join(" ")
        : "Viestin lähetys epäonnistui. Yritä uudelleen tai lähetä sähköpostia osoitteeseen jyvastaksi@gmail.com.";
      formStatus.textContent = message;
    }
  } catch (error) {
    formStatus.textContent = "Viestin lähetys epäonnistui. Tarkista verkkoyhteys ja yritä uudelleen.";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
}); document.querySelector("#year").textContent = new Date().getFullYear();
