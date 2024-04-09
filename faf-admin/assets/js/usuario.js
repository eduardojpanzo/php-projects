initialUsuarioView();

async function initialUsuarioView() {
  const usuarios = await getManyField("usuario");

  usuarios.map(({ id_usuario, nome, tipo }, i) => {
    document.querySelector(".view_tbody").innerHTML += `
            <tr data-key="${id_usuario}">
                <th scope="row">${i + 1}</th>
                <td>${nome}</td>
                <td>${formatUser(tipo)}</td>
                <td class='d-flex gap-2'>
                    <button class="btn btn-info btn-sm" onclick="handleDetails(${id_usuario})">Detalhes</button>
                    <button class="btn btn-primary btn-sm" onclick="handleBuildModalForm(${Number(
                      id_usuario
                    )})">Editar</button>
                    <button class="btn btn-secondary  btn-sm" onclick="handleBuildModalFormUpload(${Number(
                      id_usuario
                    )})"> Foto </button>
                    <button class="btn btn-danger btn-sm" onclick="handleDeleteItem(${id_usuario})">Remover</button>
                </td>
            </tr>
        `;
  });
}

async function handleDetails(id) {
  const item = await getOneField("usuario", id);

  modalOverlay.querySelector(".modal-content").innerHTML = `
    <div class="card">
        <svg class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"/><text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text></svg>

        <div class="card-body">
            <h5 class="card-title">Nome: ${item.nome}</h5>
            <p class="card-text">Tipo: ${formatUser(item.tipo)}</p>
        </div>
    </div>`;
  openModal();
}

async function handleBuildModalForm(id) {
  let item;
  if (typeof id === "number") {
    item = await getOneField("usuario", id);
  }
  const formTamplete = `
    <h4 class="fw-bold text-center mb-3">${id ? "Editar" : "Novo"} usuario</h4>

    <form  id="registrationForm" class="row g-2 needs-validation" novalidate onsubmit="handleValidation(event)">
        ${id && `<input type='hidden' id='id' name='id' value='${id}'>`}
        <div class="col-md-6">
            <label for="nome" class="form-label">Nome</label>
            <input type="text" class="form-control" id="nome" name="nome" value="${
              item?.nome ?? ""
            }" required>
            <span class="invalid-feedback">Por favor, insira o nome.</span>
        </div>

        <div class="col-md-6">
            <label for="tipo" class="form-label">Tipo</label>
            <select class="form-select" id="tipo" required>
                <option selected disabled value="">Escolher...</option>
                <option value="admin">Administrador</option>
                <option value="user">Usuário Comum</option>
            </select>
            <span class="invalid-feedback">Por favor, selecione um tipo</span>
        </div>

        <div class="col-md-6">
            <label for="senha" class="form-label">Senha</label>
            <input type="password" class="form-control" id="senha" name="senha"  required>
            <span class="invalid-feedback">Por favor, insira o senha.</span>
        </div>

        <div class="col-md-6">
            <label for="confirm_senha" class="form-label">Confirmar senha</label>
            <input type="password" class="form-control" id="confirm_senha" name="confirm_senha"  required>
            <span class="invalid-feedback">Por favor, insira o confirm_senha.</span>
        </div>

        
        <div class="col-12">
            <button type="submit" class="btn btn-primary">${
              id ? "Atualizar" : "Criar"
            }</button>
        </div>
    </form>`;

  modalOverlay.querySelector(".modal-content").innerHTML = formTamplete;
  openModal();
}

async function handleValidation(event) {
  event.preventDefault();
  const senha = document.getElementById("senha").value;
  const confirm_senha = document.getElementById("confirm_senha").value;

  if (!event.target.checkValidity()) {
    event.target.classList.add("was-validated");
    return;
  }

  if (senha !== confirm_senha) {
    document.getElementById("confirm_senha").classList.add("is-invalid");
    document.getElementById("confirm_senha").nextElementSibling.innerHTML =
      "A Senha deve ser igual.";

    return;
  }

  document.getElementById("confirm_senha").classList.remove("is-invalid");
  document.getElementById("confirm_senha").nextElementSibling.innerHTML = "";

  const id = Number(event.target.id.value);

  if (id) {
    await handleEditItem(event.target, id);
    return;
  }

  await handlecriarItem(event.target);
  return;
}

async function handlecriarItem(form) {
  const usuarioData = {
    nome: form.nome.value,
    tipo: form.tipo.value,
    senha: form.senha.value,
  };

  await postNewField("usuario", usuarioData);
  window.location.reload();
}

// ao criar usuarrio deve usar a rota de cadastro que cotem hash
async function handleEditItem(form, id) {
  const usuarioData = {
    nome: form.nome.value,
    tipo: form.tipo.value,
    senha: form.senha.value,
  };

  await updateField("usuario", id, usuarioData);
  window.location.reload();
}

async function handleDeleteItem(id) {
  await deleteField("usuario", id);
  window.location.reload();
}
async function handleUploadFoto(form) {
  const formData = new FormData(form);

  await postUploadFoto("usuario", formData);
  window.location.reload();
}
