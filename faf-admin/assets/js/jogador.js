initialJogadorView();

async function initialJogadorView() {
  const jogadores = await getManyField("jogador");

  jogadores.map(
    ({ id_jogador, jogador_nome, jogador_numero, jogador_posicao, jogador_nacionalidade, jogador_data_nascimento, jogador_sexo }, i) => {
      document.querySelector(".view_tbody").innerHTML += `
            <tr data-key="${id_jogador}">
                <th scope="row">${i + 1}</th>
                <td>${jogador_nome}</td>
                <td>${jogador_numero}</td>
                <td>${jogador_posicao}</td>
                <td>${jogador_nacionalidade}</td>
                <td>${formatGener(jogador_sexo)}</td>
                <td>${formatarDataTexto(jogador_data_nascimento)}</td>
                <td class='d-flex gap-2'>
                    <button class="btn btn-info btn-sm" onclick="handleDetails(${id_jogador})">Detalhes</button>
                    <button class="btn btn-primary btn-sm" onclick="handleBuildModalForm(${Number(
        id_jogador
      )})">Editar</button>
                    <button class="btn btn-secondary  btn-sm" onclick="handleBuildModalFormUpload(${Number(
        id_jogador
      )})"> Foto </button>
                    <button class="btn btn-danger btn-sm" onclick="handleDeleteItem(${id_jogador})">Remover</button>
                </td>
            </tr>
        `;
    }
  );
}

async function handleDetails(id) {
  const item = await getOneField("jogador", id);

  document.querySelector(".modal-overlay .modal-content").innerHTML = `
    <div class="card">
        ${item.url_foto ? `<img src="${item.url_foto}" class="card-img-top" alt="${item.jogador_nome}"/>` : IMAGE_COVER}

        <div class="card-body">
            <h5 class="card-title">Nome: ${item.jogador_nome}</h5>
            <p class="card-text">Posição: ${item.jogador_posicao}</p>
            <p>Número: <span class="badge bg-light text-dark">${item.jogador_numero
    }</span></p>
            <p>Data de Nascimento:  <span class="badge bg-light text-dark">${formatarDataEmNumero(
      item.jogador_data_nascimento
    )}</span></p>
            <p>Sexo: <span class="badge bg-light text-dark">${item.jogador_sexo}</span></p>
            <p>Nacionalidade: <span class="badge bg-light text-dark">${item.jogador_nacionalidade}</span></p>
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
  const agentes = await getManyField("agente");

  if (typeof id === "number" && id > 0) {
    item = await getOneField("jogador", id);
  }
  const formTamplete = `
    <h4 class="fw-bold text-center mb-3">${id ? "Editar" : "Novo"} Jogador</h4>

    <form  id="registrationForm" class="row g-2 needs-validation" novalidate onsubmit="handleValidation(event)">
        ${id && `<input type='hidden' id='id' name='id' value='${id}'>`}
        <div class="col-md-6">
            <label for="nome" class="form-label">Nome</label>
            <input type="text" class="form-control" id="nome" name="nome" value="${item?.jogador_nome ?? ""
    }" required>
            <span class="invalid-feedback">Por favor, insira o nome.</span>
        </div>
        <div class="col-md-6">
            <label for="posicao" class="form-label">Posição</label>
            <input type="text" class="form-control" id="posicao" name="posicao" value="${item?.jogador_posicao ?? ""}" required>
            <span class="invalid-feedback">Por favor, insira a posicão.</span>
        </div>
        
        <div class="col-md-6">
            <label for="nacionalidade" class="form-label">Nacionalidade</label>
            <input type="text" class="form-control" id="nacionalidade" name="nacionalidade" value="${item?.jogador_nacionalidade ?? ""}" required>
            <span class="invalid-feedback">Por favor, insira a Nacionalidade.</span>
        </div>

        <div class="col-md-6">
            <label for="numero" class="form-label">Número</label>
            <input type="number" class="form-control" id="numero" name="numero" value="${item?.jogador_numero ?? ""
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
            <input type="date" class="form-control" id="data_nascimento" name="data_nascimento" value="${item?.jogador_data_nascimento ?? ""
    }" required>
            <span class="invalid-feedback">Por favor, insira a data de nascimento.</span>
        </div>

        <div class="col-md-6">
            <label for="id_agente" class="form-label">Agentes</label>
            <select class="form-select" id="id_agente" required>
                <option selected disabled value="">Escolher...</option>
                ${agentes
      .map((agente) => {
        return `<option  value=${agente.id_agente}>${agente.nome}</option>`;
      })
      .join("")}
            </select>
            <span class="invalid-feedback">Por favor, selecione um agente</span>
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

  if (!isFieldOfLetterString("form #nome", event.target.nome.value) || !isFieldOfLetterString("form #posicao", event.target.posicao.value) || !isFieldOfLetterString("form #nacionalidade", event.target.nacionalidade.value)) {
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
    numero: form.numero.value,
    posicao: form.posicao.value,
    data_nascimento: form.data_nascimento.value,
    sexo: form.sexo.value,
    id_agente: form.id_agente.value,
    nacionalidade: form.nacionalidade.value
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
    id_agente: form.id_agente.value,
    nacionalidade: form.nacionalidade.value
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
