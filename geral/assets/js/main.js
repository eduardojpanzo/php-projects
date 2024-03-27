const API_BASE_PATH = "http://localhost/php-projects/campeonato-back";
const modalOverlay = document.querySelector(".modal-overlay");

document.addEventListener("keydown", (e) => {
  if (e.code === "Escape" && isModalOpen()) {
    closeModal();
  }
});


document.addEventListener("DOMContentLoaded", function (event) {
  const showNavbar = (toggleId, navId, bodyId, headerId) => {
    const toggle = document.getElementById(toggleId),
      nav = document.getElementById(navId),
      bodypd = document.getElementById(bodyId),
      headerpd = document.getElementById(headerId);

    // Validate that all variables exist
    if (toggle && nav && bodypd && headerpd) {
      toggle.addEventListener("click", () => {
        // show navbar
        nav.classList.toggle("show");
        // change icon
        toggle.classList.toggle("fa-times");
        // add padding to body
        bodypd.classList.toggle("body-pd");
        // add padding to header
        headerpd.classList.toggle("body-pd");
      });
    }
  };

  showNavbar("header-toggle", "nav-bar", "body-pd", "header");

  /*===== LINK ACTIVE =====*/
  const linkColor = document.querySelectorAll(".nav_link");

  function colorLink() {
    if (linkColor) {
      linkColor.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    }
  }
  linkColor.forEach((l) => l.addEventListener("click", colorLink));

  // Your code to run since DOM is loaded and ready
});


async function getManyField(field) {
  const response = await fetch(`${API_BASE_PATH}/${field}/buscar`);
  const data = await response.json();

  if (!data) {
    return [];
  }

  return data.data;
}

async function getOneField(field, id) {
  const response = await fetch(`${API_BASE_PATH}/${field}/buscar/${id}`);
  const data = await response.json();

  if (!data) {
    return {};
  }

  return data.data;
}

async function postNewField(field, dataBody) {
  const response = await fetch(`${API_BASE_PATH}/${field}/criar`, {
    method: "POST",
    body: JSON.stringify(dataBody),
  });

  const data = await response.json();

  if (!data) {
    return {};
  }

  alert(data.message ?? "criado com sucesso");

  return data;
}

async function updateField(field, id, dataBody) {
  const response = await fetch(`${API_BASE_PATH}/${field}/atualizar/${id}`, {
    method: "PUT",
    body: JSON.stringify(dataBody),
  });
  const data = await response.json();

  if (!data) {
    return {};
  }

  alert(data.message);

  return data.data;
}

async function deleteField(field, id) {
  const response = await fetch(`${API_BASE_PATH}/${field}/remove/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!data) {
    return {};
  }

  alert(data.message);

  return data.data;
}

function formatarDataTexto(value) {
  let data = new Date(value);
  let options = { day: 'numeric', month: 'long', year: 'numeric' }
  let dataFormatada = data.toLocaleDateString('pt-BR', options);

  return dataFormatada
}

function formatarDataEmNumero(value) {
  let data = new Date(value);
  let options = { day: 'numeric', month: 'numeric', year: 'numeric' }
  let dataFormatada = data.toLocaleDateString('pt-BR', options);

  return dataFormatada
}

function formatGener(value) {
  const gener = {
    'M': 'Masculino',
    'F': 'Femenino',
  }
  return gener[value]
}

function formatUser(value) {
  const gener = {
    'admin': 'Administrador',
    'user': 'Usuário Comum',
  }
  return gener[value]
}

function toggleTheme() {
  document.querySelector("html").classList.toggle("dark");
}

function openModal() {
  modalOverlay.classList.add("open");
}

function closeModal() {
  modalOverlay.classList.remove("open");
}

function isModalOpen() {
  return modalOverlay.classList.contains("open");
}