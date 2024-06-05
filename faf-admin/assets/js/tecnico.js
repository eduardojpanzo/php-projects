initialTecnicoView();

async function initialTecnicoView() {
  const tecnicos = await getManyField("tecnico");

  tecnicos.map(
    ({ id_tecnico, nome, experiencia, tipo, data_nascimento, sexo }, i) => {
      document.querySelector(".view_tbody").innerHTML += `
            <tr data-key="${id_tecnico}">
                <th scope="row">${i + 1}</th>
                <td>${nome}</td>
                <td>${experiencia}</td>
                <td>${tipo}</td>
                <td>${formatGener(sexo)}</td>
                <td>${formatarDataTexto(data_nascimento)}</td>
                <td class='d-flex gap-2'>
                    <button class="btn btn-info btn-sm" onclick="handleDetails(${id_tecnico})">Detalhes</button>
                    <button class="btn btn-primary btn-sm" onclick="handleBuildModalForm(${Number(
        id_tecnico
      )})">Editar</button>
                    <button class="btn btn-secondary  btn-sm" onclick="handleBuildModalFormUpload(${Number(
        id_tecnico
      )})"> Foto </button>
                    <button class="btn btn-danger btn-sm" onclick="handleDeleteItem(${id_tecnico})">Remover</button>
                </td>
            </tr>
        `;
    }
  );
}

async function handleDetails(id) {
  const item = await getOneField("tecnico", id);

  document.querySelector(".modal-overlay .modal-content").innerHTML = `
    <div class="card">
        ${item.url_foto ? `<img src="${item.url_foto}" class="card-img-top" alt="${item.nome}"/>` : IMAGE_COVER}

        <div class="card-body">
            <h5 class="card-title">Nome: ${item.nome}</h5>
            <p class="card-text">Tipo: ${item.tipo}</p>
            <p>Experiência: <span class="badge bg-light text-dark">${item.experiencia ?? 0
    } anos</span></p>
            <p>Data de Nascimento:  <span class="badge bg-light text-dark">${formatarDataEmNumero(
      item.data_nascimento
    )}</span></p>
            <p>Sexo: <span class="badge bg-light text-dark">${item.sexo
    }</span></p>
            Equipa:
            <div class="d-flex gap-1 ">
            ${item?.equipa_nome
      ? `<span class="badge bg-secondary">${item.equipa_nome}</span>`
      : ""
    }
            </div>
        </div>
    </div>`;
  openModal();
}

async function handleBuildModalForm(id) {
  let item;
  const equipas = await getManyField("equipa");

  if (typeof id === "number" && id > 0) {
    item = await getOneField("tecnico", id);
  }
  const formTamplete = `
    <h4 class="fw-bold text-center mb-3">${id ? "Editar" : "Novo"} Técnico</h4>

    <form  id="registrationForm" class="row g-2 needs-validation" novalidate onsubmit="handleValidation(event)">
        ${id && `<input type='hidden' id='id' name='id' value='${id}'>`}
        <div class="col-md-6">
            <label for="nome" class="form-label">Nome</label>
            <input type="text" class="form-control" id="nome" name="nome" value="${item?.nome ?? ""
    }" required>
            <span class="invalid-feedback">Por favor, insira o nome.</span>
        </div>

        <div class="col-md-6">
            <label for="tipo" class="form-label">Tipo</label>
            <input type="text" class="form-control" id="tipo" name="tipo" value="${item?.tipo ?? ""
    }" required>
            <span class="invalid-feedback">Por favor, insira o tipo.</span>
        </div>

        <div class="col-md-6">
            <label for="experiencia" class="form-label">Experiência</label>
            <input type="number" class="form-control" id="experiencia" name="experiencia" value="${item?.experiencia ?? ""
    }" required>
            <span class="invalid-feedback">Por favor, insira o anos de experiência.</span>
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
            <input type="date" class="form-control" id="data_nascimento" name="data_nascimento" value="${item?.data_nascimento ?? ""
    }" required>
            <span class="invalid-feedback">Por favor, insira a data de fundação.</span>
        </div>

        <div class="col-md-6">
            <label for="id_equipa" class="form-label">Equipa</label>
            <select class="form-select" id="id_equipa" required>
                <option selected disabled value="">Escolher...</option>
                ${equipas
      .map((equipa) => {
        return `<option  value=${equipa.id_equipa}>${equipa.nome}</option>`;
      })
      .join("")}
            </select>
            <span class="invalid-feedback">Por favor, selecione uma equipa</span>
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

  if (!isFieldOfLetterString("form #nome", event.target.nome.value) || !isFieldOfLetterString("form #tipo", event.target.tipo.value)) {
    return
  }


  if (!isMaiorDeIdade("form #data_nascimento", event.target.data_nascimento.value)) {
    return
  }

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
    experiencia: form.experiencia.value,
    tipo: form.tipo.value,
    data_nascimento: form.data_nascimento.value,
    sexo: form.sexo.value,
    id_equipa: form.id_equipa.value,
  };
  await postNewField("tecnico", itemData);
  window.location.reload();
}

async function handleEditItem(form, id) {
  const itemData = {
    nome: form.nome.value,
    experiencia: form.experiencia.value,
    tipo: form.tipo.value,
    data_nascimento: form.data_nascimento.value,
    sexo: form.sexo.value,
    id_equipa: form.id_equipa.value,
  };

  await updateField("tecnico", id, itemData);
  window.location.reload();
}

async function handleDeleteItem(id) {
  await deleteField("tecnico", id);
  window.location.reload();
}
async function handleUploadFoto(form) {
  const formData = new FormData(form);

  await postUploadFoto("tecnico", formData);
  window.location.reload();
}
