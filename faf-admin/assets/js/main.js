const API_BASE_PATH = "http://localhost/php-projects/faf-server";
const modalOverlay = document.querySelector(".modal-overlay");
let USER_DATA = undefined;

checkIsUserAuth();

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

  //----
});

function checkIsUserAuth() {
  const isAuth = getCookie("AdminUserAuth");

  if (
    !isAuth &&
    !document.location.pathname.split("/").includes("login.html")
  ) {
    alert("Faça o login para poder ter acesso! ");
    document.location.href = "./login.html";
    return;
  }

  USER_DATA = getUserData();

  if (USER_DATA?.tipo) {
    isAdmin(USER_DATA.tipo);
  }
}

function isAdmin(tipo) {
  if (tipo !== "admin") {
    alert("Não tens permisão suficiente, não és Admin! ");
    document.location.href = "./login.html";
  }
}

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

async function login(dataBody) {
  const response = await fetch(`${API_BASE_PATH}/usuario/entrar`, {
    method: "POST",
    body: JSON.stringify(dataBody),
  });

  const data = await response.json();

  if (!data) {
    return {};
  }
  alert(data.message ?? "Login feito!");

  USER_DATA = data.data;
  setCookie("AdminUserAuth", JSON.stringify(USER_DATA), 3);

  return USER_DATA;
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

async function postUploadFoto(field, formData) {
  try {
    const response = await fetch(`${API_BASE_PATH}/${field}/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!data) {
      return {};
    }

    alert(data.message ?? "Atualizado com sucesso");

    return data;
  } catch (error) {
    alert(error);
  }
}

function formatarDataTexto(value) {
  let data = new Date(value);
  let options = { day: "numeric", month: "long", year: "numeric" };
  let dataFormatada = data.toLocaleDateString("pt-BR", options);

  return dataFormatada;
}

function formatarDataEmNumero(value) {
  let data = new Date(value);
  let options = { day: "numeric", month: "numeric", year: "numeric" };
  let dataFormatada = data.toLocaleDateString("pt-BR", options);

  return dataFormatada;
}

function formatGener(value) {
  const gener = {
    M: "Masculino",
    F: "Femenino",
  };
  return gener[value];
}

function formatUser(value) {
  const gener = {
    admin: "Administrador",
    user: "Usuário Comum",
  };
  return gener[value];
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

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

function getUserData() {
  var userDataCookie = getCookie("AdminUserAuth");
  if (userDataCookie) {
    return JSON.parse(userDataCookie);
  } else {
    return null;
  }
}

async function handleBuildModalFormUpload(id) {
  const formTamplete = `
  <h4 class="fw-fw-normal text-center mb-3">Inserção de foto</h4>

  <form  id="uploadForm" enctype="multipart/form-data" class="row g-2 needs-validation" novalidate onsubmit="handleValidationUpload(event)">
      <input type='hidden' id='id_entidade' name='id_entidade' value='${id}'>

      <div class="col-md-12">
          <label for="foto" class="form-label fw-bold">Foto: </label>
          <input type="file" class="form-control" id="foto" name="foto" required>
          <span class="invalid-feedback">Por favor, insira uma foto</span>
      </div>
      
      <div class="col-12 text-center">
          <button type="submit" class="btn btn-primary">Enviar</button>
      </div>
  </form>`;

  modalOverlay.querySelector(".modal-content").innerHTML = formTamplete;
  openModal();
}

async function handleValidationUpload(event) {
  event.preventDefault();

  if (!event.target.checkValidity()) {
    event.target.classList.add("was-validated");
    return;
  }

  await handleUploadFoto(event.target);
  return;
}
