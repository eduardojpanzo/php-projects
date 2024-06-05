initialAgenteView();

async function initialAgenteView() {
  const agentes = await getManyField("agente");


  agentes.map(({ id_agente, nome, empresa }, i) => {
    document.querySelector(".view_tbody").innerHTML += `
            <tr data-key="${id_agente}">
                <th scope="row">${i + 1}</th>
                <td>${nome}</td>
                <td>${empresa}</td>
                <td class='d-flex gap-2'>
                    <button class="btn btn-info btn-sm" onclick="handleDetails(${id_agente})">Detalhes</button>
                    <button class="btn btn-primary btn-sm" onclick="handleBuildModalForm(${Number(
      id_agente
    )})">Editar</button>
                    <button class="btn btn-secondary  btn-sm" onclick="handleBuildModalFormUpload(${Number(
      id_agente
    )})"> Foto </button>
                    <button class="btn btn-danger btn-sm" onclick="handleDeleteItem(${id_agente})">Remover</button>
                </td>
            </tr>
        `;
  });
}

async function handleDetails(id) {
  const item = await getOneField("agente", id);

  document.querySelector(".modal-overlay .modal-content").innerHTML = `
    <div class="card">
        ${item.url_foto ? `<img src="${item.url_foto}" class="card-img-top" alt="${item.nome}"/>` : IMAGE_COVER}

        <div class="card-body">
            <h5 class="card-title">Nome: ${item.nome}</h5>
            <p>Empresa:  <span class="badge bg-light text-dark">${item.empresa}</span></p>
        </div>
    </div>`;
  openModal();
}

async function handleBuildModalForm(id) {
  let item;

  console.log(id);

  if (typeof id === "number" && id > 0) {
    item = await getOneField("agente", id);
  }
  const formTamplete = `
    <h4 class="fw-bold text-center mb-3">${id ? "Editar" : "Novo"} responsável</h4>

    <form  id="registrationForm" class="row g-2 needs-validation" novalidate onsubmit="handleValidation(event)">
        ${typeof id === "number" && id > 0 ? `<input type='hidden' id='id' name='id' value='${id}'>` : ""}

        <div class="col-md-6">
            <label for="nome" class="form-label">Nome</label>
            <input type="text" class="form-control" id="nome" name="nome" value="${item?.nome ?? ""}" required>
            <span class="invalid-feedback">Por favor, insira o nome.</span>
        </div>

        <div class="col-md-6">
            <label for="empresa" class="form-label">Empresa</label>
            <input type="text" class="form-control" id="empresa" name="empresa" value="${item?.empresa ?? ""}" required>
            <span class="invalid-feedback">Por favor, insira a empresa.</span>
        </div>

        <div class="col-12">
            <button type="submit" class="btn btn-primary">${typeof id === "number" ? "Atualizar" : "Criar"}</button>
        </div>
    </form>`;

  document.querySelector(".modal-overlay .modal-content").innerHTML = formTamplete;
  openModal();
}

async function handleValidation(event) {
  event.preventDefault();

  if (!isFieldOfLetterString("form #nome", event.target.nome.value)) {
    return
  }

  if (!event.target.checkValidity()) {
    event.target.classList.add("was-validated");
    return;
  }

  const id = Number(event.target.id.value);

  if (typeof id === "number" && id > 0) {
    await handleEditItem(event.target, id);
    return;
  }

  await handlecriarItem(event.target);
  return;
}

async function handlecriarItem(form) {
  const itemData = {
    nome: form.nome.value,
    empresa: form.empresa.value,
  };
  await postNewField("agente", itemData);
  window.location.reload();
}

async function handleEditItem(form, id) {
  const itemData = {
    nome: form.nome.value,
    empresa: form.empresa.value,
  };

  await updateField("agente", id, itemData);
  window.location.reload();
}

async function handleDeleteItem(id) {
  await deleteField("agente", id);
  window.location.reload();
}

async function handleUploadFoto(form) {
  const formData = new FormData(form);

  await postUploadFoto("agente", formData);
  window.location.reload();
}
