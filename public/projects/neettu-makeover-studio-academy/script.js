const WHATSAPP_NUMBER = "919035306146";

const buildWhatsAppUrl = (message) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

const initIcons = () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
};

const initHeader = () => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  const updateHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 24);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  toggle?.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle?.setAttribute("aria-expanded", "false");
    });
  });
};

const initWhatsAppLinks = () => {
  document.querySelectorAll(".whatsapp-link").forEach((link) => {
    const message = link.dataset.message || "Hi Neettu Makeover Studio & Academy, I want to make an inquiry.";
    link.setAttribute("href", buildWhatsAppUrl(message));
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noreferrer");
  });
};

const initBookingForm = () => {
  const form = document.querySelector("#bookingForm");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const service = String(data.get("service") || "").trim();
    const date = String(data.get("date") || "").trim();
    const notes = String(data.get("notes") || "").trim();

    const lines = [
      "Hi Neettu Makeover Studio & Academy, I want to make a booking inquiry.",
      name ? `Name: ${name}` : "",
      service ? `Service: ${service}` : "",
      date ? `Preferred date: ${date}` : "",
      notes ? `Notes: ${notes}` : ""
    ].filter(Boolean);

    window.open(buildWhatsAppUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
  });
};

const initGallery = () => {
  const filters = document.querySelectorAll(".filter-button");
  const items = document.querySelectorAll(".gallery-item");
  const lightbox = document.querySelector(".lightbox");
  const lightboxImage = lightbox?.querySelector("img");

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const category = filter.dataset.filter;
      filters.forEach((button) => button.classList.remove("active"));
      filter.classList.add("active");
      items.forEach((item) => {
        const shouldShow = category === "all" || item.dataset.category === category;
        item.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });

  items.forEach((item) => {
    item.addEventListener("click", () => {
      if (!lightbox || !lightboxImage) return;
      const image = item.querySelector("img");
      lightboxImage.src = item.dataset.full || image.src;
      lightboxImage.alt = image.alt;
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
    });
  });

  lightbox?.addEventListener("click", () => {
    lightbox.hidden = true;
    document.body.style.overflow = "";
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox && !lightbox.hidden) {
      lightbox.hidden = true;
      document.body.style.overflow = "";
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initWhatsAppLinks();
  initBookingForm();
  initGallery();
  initIcons();
});
