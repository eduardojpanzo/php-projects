initialJogadorView();

async function initialJogadorView() {
  const jogadores = await getManyField("jogador");

  jogadores.map(
    ({ id_jogador, nome, numero, posicao, data_nascimento, sexo }, i) => {
      document.querySelector(".view_tbody").innerHTML += `
            <tr data-key="${id_jogador}">
                <th scope="row">${i + 1}</th>
                <td>${nome}</td>
                <td>${numero}</td>
                <td>${posicao}</td>
                <td>${formatGener(sexo)}</td>
                <td>${formatarDataTexto(data_nascimento)}</td>
                <td class='d-flex gap-2'>
                    <button class="btn btn-info btn-sm" onclick="handleDetails(${id_jogador})">Detalhes</button>
                    <button class="btn btn-primary btn-sm" onclick="handleBuildModalForm(${Number(
                      id_jogador
                    )})">Editar</button>
                    <button class="btn btn-secondary  btn-sm" onclick="handleBuildModalFormUploa(${Number(
                      id_jogador
                    )})"> Foto </button>;
                    <button class="btn btn-danger btn-sm" onclick="handleDeleteItem(${id_jogador})">Remover</button>
                </td>
            </tr>
        `;
    }
  );
}

async function handleDetails(id) {
  const item = await getOneField("jogador", id);

  modalOverlay.querySelector(".modal-content").innerHTML = `
    <div class="card">
        <svg class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"/><text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text></svg>

        <div class="card-body">
            <h5 class="card-title">Nome: ${item.nome}</h5>
            <p class="card-text">Posição: ${item.posicao}</p>
            <p>Número: <span class="badge bg-light text-dark">${
              item.numero
            }</span></p>
            <p>Data de Nascimento:  <span class="badge bg-light text-dark">${formatarDataEmNumero(
              item.data_nascimento
            )}</span></p>
            <p>Sexo: <span class="badge bg-light text-dark">${
              item.sexo
            }</span></p>
            Equipa:
            <div class="d-flex gap-1 ">
            ${
              item?.equipa
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
  const equipas = await getManyField("equipa");

  if (typeof id === "number") {
    item = await getOneField("jogador", id);
  }
  const formTamplete = `
    <h4 class="fw-bold text-center mb-3">${id ? "Editar" : "Novo"} Jogador</h4>

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
            <label for="posicao" class="form-label">Posição</label>
            <input type="text" class="form-control" id="posicao" name="posicao" value="${
              item?.posicao ?? ""
            }" required>
            <span class="invalid-feedback">Por favor, insira a posicão.</span>
        </div>

        <div class="col-md-6">
            <label for="numero" class="form-label">Número</label>
            <input type="number" class="form-control" id="numero" name="numero" value="${
              item?.numero ?? ""
            }" required>
            <span class="invalid-feedback">Por favor, insira o número.</span>
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
    numero: form.numero.value,
    posicao: form.posicao.value,
    data_nascimento: form.data_nascimento.value,
    sexo: form.sexo.value,
    id_equipa: form.id_equipa.value,
  };
  await postNewField("jogador", itemData);
  window.location.reload();
}

async function handleEditItem(form, id) {
  const itemData = {
    nome: form.nome.value,
    numero: form.numero.value,
    posicao: form.posicao.value,
    data_nascimento: form.data_nascimento.value,
    sexo: form.sexo.value,
    id_equipa: form.id_equipa.value,
  };

  await updateField("jogador", id, itemData);
  window.location.reload();
}

async function handleDeleteItem(id) {
  await deleteField("jogador", id);
  window.location.reload();
}
async function handleUploadFoto(form) {
  const formData = new FormData(form);

  await postUploadFoto("jogador", formData);
  window.location.reload();
}
