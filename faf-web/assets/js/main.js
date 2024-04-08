const API_BASE_PATH = "http://localhost/php-projects/faf-server";
let USER_DATA = undefined;

checkIsUserAuth();

const modalOverlay = document.querySelector(".modal-overlay");

const IMAGE_COVER = `<svg class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg"
role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false">
<title>Placeholder</title>
<rect width="100%" height="100%" fill="#868e96" />
</svg>`;

document.addEventListener("keydown", (e) => {
  if (e.code === "Escape" && isModalOpen()) {
    closeModal();
  }
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
}

async function login(dataBody) {
  const response = await fetch(`${API_BASE_PATH}/acesso/entrar`, {
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
