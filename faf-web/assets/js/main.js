//const API_BASE_PATH = "https://fluky-additives.000webhostapp.com";
const API_BASE_PATH = "http://localhost/php-projects/faf-server";
let USER_DATA = undefined;

checkIsUserAuth();
userInfomation();

const modalOverlay = document.querySelector(".modal-overlay");

const IMAGE_COVER = `<svg class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg"
role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false">
<title>Placeholder</title>
<rect width="100%" height="100%" fill="#868e96" />
</svg>`;
const IMAGE_COVER_CIRC = `<svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"/><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>`;

document.addEventListener("keydown", (e) => {
  if (e.code === "Escape" && isModalOpen()) {
    closeModal();
  }
});

function userInfomation() {
  if (!document.querySelector("header .user-info")) {
    return;
  }

  if (USER_DATA?.url_foto) {
    document.querySelector("header .user-info").innerHTML = `
    <div class="dropdown">
      <div class="header_img" data-bs-toggle="dropdown" id="dropdownMenuButtonSM" aria-expanded="false">
        <img src="${USER_DATA.url_foto}" alt="${USER_DATA.nome}" />
      </div>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButtonSM">
        <li><a class="dropdown-item" href="./logout.html">Sair</a></li>
      </ul>
    </div>
    `;
    return;
  }

  document.querySelector("header .user-info").innerHTML = `
    <div class="dropdown">
      <div class="header_img" data-bs-toggle="dropdown" id="dropdownMenuButtonSM" aria-expanded="false">
        ${USER_DATA?.nome
      .split(" ")
      .map((item) => item[0])
      .join("")
      .toUpperCase()}
      </div>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButtonSM">
        <li><a class="dropdown-item" href="./logout.html">Sair</a></li>
      </ul>
    </div>
  `;
}

async function getManyField(field) {
  try {
    const response = await fetch(`${API_BASE_PATH}/${field}/buscar`);
    const data = await response.json();

    if (!data) {
      return [];
    }

    return data.data;
  } catch (error) {
    alert(error);
    alert("Verifice os dados algo deu errado");
  }
}

async function getOneField(field, id) {
  try {
    const response = await fetch(`${API_BASE_PATH}/${field}/buscar/${id}`);
    const data = await response.json();

    if (!data) {
      return {};
    }

    return data.data;
  } catch (error) {
    alert(error);
    alert("Verifice os dados algo deu errado");
  }
}

async function getManyFieldByParamAndID(field, param, id) {
  try {
    const response = await fetch(`${API_BASE_PATH}/${field}/${param}/${id}`);
    const data = await response.json();

    if (!data) {
      return [];
    }

    return data.data;
  } catch (error) {
    alert(error);
    alert("Verifice os dados algo deu errado");
  }
}

async function postNewField(field, dataBody) {
  try {
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
  } catch (error) {
    alert(error);
    alert("Verifice os dados algo deu errado");
  }
}

async function updateField(field, id, dataBody) {
  try {
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
  } catch (error) {
    alert(error);
    alert("Verifice os dados algo deu errado");
  }
}

async function deleteField(field, id) {
  try {
    const response = await fetch(`${API_BASE_PATH}/${field}/remove/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!data) {
      return {};
    }

    alert(data.message);

    return data.data;
  } catch (error) {
    alert(error);
    alert("Verifice os dados algo deu errado");
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

function checkIsUserAuth() {
  const isAuth = getCookie("WebUserAuth");

  if (
    !isAuth &&
    !document.location.pathname.split("/").includes("login.html")
    && !document.location.pathname.split("/").includes("cadastro.html")
  ) {
    alert("Faça o login para poder ter acesso! ");
    document.location.href = "./login.html";
    return;
  }

  USER_DATA = getUserData();
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
  setCookie("WebUserAuth", JSON.stringify(USER_DATA), 3);

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
  var userDataCookie = getCookie("WebUserAuth");
  if (userDataCookie) {
    return JSON.parse(userDataCookie);
  } else {
    return null;
  }
}

function isFieldOfLetterString(fieldSelector, value) {
  const regex = /^[A-Za-z\s]+$/;

  if (!regex.test(value)) {
    document.querySelector(`${fieldSelector}`).classList.add("is-invalid");
    document.querySelector(`${fieldSelector}`).nextElementSibling.innerHTML = "Campo inválido, apenas letras e espaços são permitidos";
    return false;
  }

  document.querySelector(`${fieldSelector}`).classList.remove("is-invalid");
  document.querySelector(`${fieldSelector}`).nextElementSibling.innerHTML = "";
  return true;
}