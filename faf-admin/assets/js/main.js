//const API_BASE_PATH = "https://fluky-additives.000webhostapp.com";
const API_BASE_PATH = "http://localhost/php-projects/faf-server";
const modalOverlay = document.querySelector(".modal-overlay");
let USER_DATA = undefined;

const IMAGE_COVER = `<svg class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg"
role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false">
<title>Placeholder</title>
<rect width="100%" height="100%" fill="#868e96" />
</svg>`;

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

    userInfomation();
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
    document.location.href = "./logout.html";
  }
}

function userInfomation() {
  if (!document.querySelector(".header .header_img")) {
    return;
  }

  if (USER_DATA?.url_foto) {
    document.querySelector(".header .header_img").innerHTML = `
    <img src="${USER_DATA.url_foto}" alt="${USER_DATA.nome}" />
    `;
    return;
  }

  document.querySelector(".header .header_img").innerHTML = USER_DATA?.nome
    .split(" ")
    .map((item) => item[0])
    .join("")
    .toUpperCase();
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
    alert("algo deu errado, verifique os dados!");
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
    alert("algo deu errado, verifique os dados!");
  }
}

async function getManyFieldByParamAndID(field, param, id) {
  const response = await fetch(`${API_BASE_PATH}/${field}/${param}/${id}`);
  const data = await response.json();

  if (!data) {
    return [];
  }

  return data.data;
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

    alert(data.message);
    return data;
  } catch (error) {
    alert(error);
    alert("Verifice os dados algo deu errado");
  }
}

async function login(dataBody) {
  try {
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
  } catch (error) {
    alert("algo deu errado, verifique os dados!");
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
    alert("algo deu errado, verifique os dados!");
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
    alert("algo deu errado, verifique os dados!");
  }

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
    alert("algo deu errado, verifique o nome da imagem e o formato!");
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

  document.querySelector(".modal-overlay .modal-content").innerHTML = formTamplete;
  openModal();
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

function isMaiorDeIdade(fieldSelector, date) {
  const idade = getIdade(date)

  if (idade < 18) {
    document.querySelector(`${fieldSelector}`).classList.add("is-invalid");
    document.querySelector(`${fieldSelector}`).nextElementSibling.innerHTML = `Deve ser maior de Idade`;
    return false;
  }

  document.querySelector(`${fieldSelector}`).classList.remove("is-invalid");
  document.querySelector(`${fieldSelector}`).nextElementSibling.innerHTML = "";
  return true;
}

function getIdade(data) {
  const hoje = new Date();
  const nascimento = new Date(data);
  const ano = hoje.getFullYear() - nascimento.getFullYear();

  const mes = hoje.getMonth() - nascimento.getMonth();
  const dia = hoje.getDate() - nascimento.getDate();

  if (mes < 0 || (mes === 0 && dia < 0)) {
    return ano - 1;
  }

  return ano;
}

function calcularDiferencaEmDias(data1, data2) {
  const UM_DIA = 1000 * 60 * 60 * 24;

  const diferencaMs = Math.abs(data1 - data2);
  return Math.round(diferencaMs / UM_DIA);
}

function isDateGreaterThanToday(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return date > today;
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
