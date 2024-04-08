initialResponsavelView();

async function initialResponsavelView() {
  const responsaveis = await getManyField("responsavel");

  responsaveis.map(({ id_responsavel, nome, data_nascimento, sexo }, i) => {
    document.querySelector(".view_tbody").innerHTML += `
            <tr data-key="${id_responsavel}">
                <th scope="row">${i + 1}</th>
                <td>${nome}</td>
                <td>${formatGener(sexo)}</td>
                <td>${formatarDataTexto(data_nascimento)}</td>
                <td class='d-flex gap-2'>
                    <button class="btn btn-info btn-sm" onclick="handleDetails(${id_responsavel})">Detalhes</button>
                    <button class="btn btn-primary btn-sm" onclick="handleBuildModalForm(${Number(
                      id_responsavel
                    )})">Editar</button>
                    <button class="btn btn-secondary  btn-sm" onclick="handleBuildModalFormUpload(${Number(
                      id_responsavel
                    )})"> Foto </button>;
                    <button class="btn btn-danger btn-sm" onclick="handleDeleteItem(${id_responsavel})">Remover</button>
                </td>
            </tr>
        `;
  });
}

async function handleDetails(id) {
  const item = await getOneField("responsavel", id);

  modalOverlay.querySelector(".modal-content").innerHTML = `
    <div class="card">
        <svg class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"/><text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text></svg>

        <div class="card-body">
            <h5 class="card-title">Nome: ${item.nome}</h5>
            <p>Data de Nascimento:  <span class="badge bg-light text-dark">${formatarDataEmNumero(
              item.data_nascimento
            )}</span></p>
            <p>Sexo: <span class="badge bg-light text-dark">${
              item.sexo
            }</span></p>
        </div>
    </div>`;
  openModal();
}

async function handleBuildModalForm(id) {
  let item;

  if (typeof id === "number") {
    item = await getOneField("responsavel", id);
  }
  const formTamplete = `
    <h4 class="fw-bold text-center mb-3">${
      id ? "Editar" : "Novo"
    } responsável</h4>

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
            <label for="sexo" class="form-label">Sexo</label>
            <select class="form-select" id="sexo" required>
                <option selected disabled value="">Escolher...</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
            </select>
            <span class="invalid-feedback">Por favor, selecione um sexo</span>
        </div>

        <div class="col-md-6">
            <label for="data_nascimento" class="form-label">Data de Início</label>
            <input type="date" class="form-control" id="data_nascimento" name="data_nascimento" value="${
              item?.data_nascimento ?? ""
            }" required>
            <span class="invalid-feedback">Por favor, insira a data de fundação.</span>
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

  if (!event.target.checkValidity()) {
    event.target.classList.add("was-validated");
    return;
  }

  const id = Number(event.target.id.value);

  if (id) {
    await handleEditItem(event.target, id);
    return;
  }

  await handlecriarItem(event.target);
  return;
}

async function handlecriarItem(form) {
  const itemData = {
    nome: form.nome.value,
    data_nascimento: form.data_nascimento.value,
    sexo: form.sexo.value,
  };
  await postNewField("responsavel", itemData);
  window.location.reload();
}

async function handleEditItem(form, id) {
  const itemData = {
    nome: form.nome.value,
    data_nascimento: form.data_nascimento.value,
    sexo: form.sexo.value,
  };

  await updateField("responsavel", id, itemData);
  window.location.reload();
}

async function handleDeleteItem(id) {
  await deleteField("responsavel", id);
  window.location.reload();
}

async function handleUploadFoto(form) {
  const formData = new FormData(form);

  await postUploadFoto("responsavel", formData);
  window.location.reload();
}
