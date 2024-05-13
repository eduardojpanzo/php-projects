initialEstadioView();

async function initialEstadioView() {
  const estadios = await getManyField("estadio");

  estadios.map(({ id_estadio, nome, capacidade, localizacao }, i) => {
    document.querySelector(".view_tbody").innerHTML += `
            <tr data-key="${id_estadio}">
                <th scope="row">${i + 1}</th>
                <td>${nome}</td>
                <td>${capacidade}</td>
                <td>${localizacao}</td>
                <td class='d-flex gap-2'>
                    <button class="btn btn-info btn-sm" onclick="handleDetails(${id_estadio})">Detalhes</button>
                    <button class="btn btn-primary btn-sm" onclick="handleBuildModalForm(${Number(
      id_estadio
    )})">Editar</button>
                    <button class="btn btn-secondary  btn-sm" onclick="handleBuildModalFormUpload(${Number(
      id_estadio
    )})"> Foto </button>
                    <button class="btn btn-danger btn-sm" onclick="handleDeleteItem(${id_estadio})">Remover</button>
                </td>
            </tr>
        `;
  });
}

async function handleDetails(id) {
  const item = await getOneField("estadio", id);

  document.querySelector(".modal-overlay .modal-content").innerHTML = `
    <div class="card">
        ${item.url_foto ? `<img src="${item.url_foto}" class="card-img-top" alt="${item.nome}"/>` : IMAGE_COVER}

        <div class="card-body">
            <h5 class="card-title">Nome: ${item.nome}</h5>
            <p class="card-text">Localizacão: ${item.localizacao}</p>
            <p>Capacidade: <span class="badge bg-light text-dark">${item.capacidade ?? 0
    } pessoas</span></p>
            Equipa:
            <div class="d-flex gap-1 ">
            ${item?.equipa
      ? `<span class="badge bg-secondary">${equipa.nome}</span>`
      : ""
    }
            </div>
        </div>
    </div>`;
  openModal();
}

async function handleBuildModalForm(id) {
  let item;

  if (typeof id === "number") {
    item = await getOneField("estadio", id);
  }
  const formTamplete = `
    <h4 class="fw-bold text-center mb-3">${id ? "Editar" : "Novo"} Estádio</h4>

    <form  id="registrationForm" class="row g-2 needs-validation" novalidate onsubmit="handleValidation(event)">
        ${id && `<input type='hidden' id='id' name='id' value='${id}'>`}
        <div class="col-md-6">
            <label for="nome" class="form-label">Nome</label>
            <input type="text" class="form-control" id="nome" name="nome" value="${item?.nome ?? ""
    }" required>
            <span class="invalid-feedback">Por favor, insira o nome.</span>
        </div>

        <div class="col-md-6">
            <label for="localizacao" class="form-label">Localizacão</label>
            <input type="text" class="form-control" id="localizacao" name="localizacao" value="${item?.localizacao ?? ""
    }" required>
            <span class="invalid-feedback">Por favor, insira o localizacão.</span>
        </div>

        <div class="col-md-6">
            <label for="capacidade" class="form-label">Capacidade</label>
            <input type="number" class="form-control" id="capacidade" name="capacidade" value="${item?.capacidade ?? ""
    }" required>
            <span class="invalid-feedback">Por favor, insira o anos de capacidade.</span>
        </div>
        
        <div class="col-12">
            <button type="submit" class="btn btn-primary">${id ? "Atualizar" : "Criar"
    }</button>
        </div>
    </form>`;

  document.querySelector(".modal-overlay .modal-content").innerHTML = formTamplete;
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
    capacidade: form.capacidade.value,
    localizacao: form.localizacao.value,
  };
  await postNewField("estadio", itemData);
  window.location.reload();
}

async function handleEditItem(form, id) {
  const itemData = {
    nome: form.nome.value,
    capacidade: form.capacidade.value,
    localizacao: form.localizacao.value,
  };

  await updateField("estadio", id, itemData);
  window.location.reload();
}

async function handleDeleteItem(id) {
  await deleteField("estadio", id);
  window.location.reload();
}

async function handleUploadFoto(form) {
  const formData = new FormData(form);

  await postUploadFoto("estadio", formData);
  window.location.reload();
}
