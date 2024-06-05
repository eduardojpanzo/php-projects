initialCampeonatoView();

async function initialCampeonatoView() {
  const campeonatos = await getManyField("campeonato");

  campeonatos.map(
    (
      {
        id_campeonato,
        nome,
        data_inicio,
        data_fim,
        descricao,
        valor_pagar,
        id_foto,
      },
      i
    ) => {
      document.querySelector(".view_tbody").innerHTML += `
            <tr data-key="${id_campeonato}">
                <th scope="row">${i + 1}</th>
                <td>${nome}</td>
                <td>${formatarDataTexto(data_inicio)}</td>
                <td>${formatarDataTexto(data_fim)}</td>
                <td>${valor_pagar}</td>
                <td>${descricao}</td>
                <td class='d-flex gap-2'>
                    <button class="btn btn-info btn-sm" onclick="handleDetails(${id_campeonato})">Detalhes</button>
                    <button class="btn btn-primary btn-sm" onclick="handleBuildModalForm(${Number(
        id_campeonato
      )})">Editar</button>
                    <button class="btn btn-secondary  btn-sm" onclick="handleBuildModalFormUpload(${Number(
        id_campeonato
      )})">Foto</button>
                    <button class="btn btn-danger btn-sm" onclick="handleDeleteItem(${id_campeonato})">Remover</button>
                </td>
            </tr>
        `;
    }
  );
}

async function handleDetails(id) {
  const item = await getOneField("campeonato", id);

  document.querySelector(".modal-overlay .modal-content").innerHTML = `
    <div class="card">
        ${item.url_foto ? `<img src="${item.url_foto}" class="card-img-top" alt="${item.nome}"/>` : IMAGE_COVER}

        <div class="card-body">
            <h5 class="card-title">Nome: ${item.nome_campeonato}</h5>
            <p class="card-text">Descrição: ${item.descricao_campeonato}</p>
            <p>Valor a pagar: <span class="badge bg-light text-dark">${item.valor_pagar
    } KZ</span></p>
            <p>De  <span class="badge bg-light text-dark">${formatarDataEmNumero(
      item.data_inicio
    )}</span> até <span class="badge bg-light text-dark">${formatarDataEmNumero(
      item.data_fim
    )} </span></p>
            Equipas:
            <div class="d-flex gap-1 ">
            ${item.equipas
      .map(
        (equipa) =>
          `<span class="badge bg-secondary">${equipa.nome}</span>`
      )
      .join(" ")}
            </div>
        </div>
    </div>`;
  openModal();
}

async function handleBuildModalForm(id) {
  let item;
  if (typeof id === "number" && id > 0) {
    item = await getOneField("campeonato", id);
  }
  const formTamplete = `
    <h4 class="fw-bold text-center mb-3">${id ? "Editar" : "Novo"
    } Campeonato</h4>

    <form  id="registrationForm" class="row g-2 needs-validation" novalidate onsubmit="handleValidation(event)">
        ${id && `<input type='hidden' id='id' name='id' value='${id}'>`}
        <div class="col-md-6">
            <label for="nome" class="form-label">Nome</label>
            <input type="text" class="form-control" id="nome" name="nome" value="${item?.nome_campeonato ?? ""
    }" required>
            <span class="invalid-feedback">Por favor, insira o nome.</span>
        </div>

        <div class="col-md-6">
            <label for="valor_pagar" class="form-label">Valor a Pagar</label>
            <input type="number" class="form-control" id="valor_pagar" name="valor_pagar" value="${item?.valor_pagar ?? ""
    }" required step="0.01">
            <span class="invalid-feedback">Por favor, insira o valor a pagar.</span>
         </div>

        <div class="col-md-6">
            <label for="data_inicio" class="form-label">Data de Início</label>
            <input type="date" class="form-control" id="data_inicio" name="data_inicio" value="${item?.data_inicio ?? ""
    }" required>
            <span class="invalid-feedback">Por favor, insira a data de início.</span>
        </div>

        <div class="col-md-6">
            <label for="data_fim" class="form-label">Data de Fim</label>
            <input type="date" class="form-control" id="data_fim" name="data_fim" value="${item?.data_fim ?? ""
    }" required>
            <span class="invalid-feedback">Por favor, insira a data de fim.</span>
        </div>

        <div class="col-md-6">
            <label for="descricao" class="form-label">Descrição</label>
            <textarea class="form-control" id="descricao" name="descricao" rows="3" required>${item?.descricao_campeonato ?? ""
    }</textarea>
            <span class="invalid-feedback">Por favor, insira a descrição.</span>
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
  const dataInicio = new Date(document.getElementById("data_inicio").value);
  const dataFim = new Date(document.getElementById("data_fim").value);

  if (!isFieldOfLetterString("form #nome", event.target.nome.value)) {
    return
  }

  if (!event.target.checkValidity()) {
    event.target.classList.add("was-validated");
    return;
  }

  if (dataFim <= dataInicio) {
    document.getElementById("data_fim").classList.add("is-invalid");
    document.getElementById("data_fim").nextElementSibling.innerHTML =
      "A data de fim deve ser posterior à data de início.";

    return;
  }

  document.getElementById("data_fim").classList.remove("is-invalid");
  document.getElementById("data_fim").nextElementSibling.innerHTML = "";

  const id = Number(event.target.id.value);

  if (id) {
    await handleEditCampeonato(event.target, id);
    return;
  }

  await handlecriarCampeonato(event.target);
  return;
}

async function handlecriarCampeonato(form) {
  const campeonatoData = {
    nome: form.nome.value,
    valor_pagar: Number(form.valor_pagar.value),
    data_inicio: form.data_inicio.value,
    data_fim: form.data_fim.value,
    descricao: form.descricao.value,
  };

  await postNewField("campeonato", campeonatoData);
  window.location.reload();
}

async function handleEditCampeonato(form, id) {
  const campeonatoData = {
    nome: form.nome.value,
    data_inicio: form.data_inicio.value,
    data_fim: form.data_fim.value,
    descricao: form.descricao.value,
    valor_pagar: Number(form.valor_pagar.value),
  };

  console.log(campeonatoData, id);

  await updateField("campeonato", id, campeonatoData);
  window.location.reload();
}

async function handleDeleteItem(id) {
  await deleteField("campeonato", id);
  window.location.reload();
}

async function handleUploadFoto(form) {
  const formData = new FormData(form);

  await postUploadFoto("campeonato", formData);
  window.location.reload();
}
