initialPartidasView();
// Estudar essa possibilidade de apenas aprovar no dashbord e ser criado no site principal
// id_partida	data	hora_fim	hora_inicio	estado	id_campeonato	id_equipa_casa	id_equipa_fora	nome_campeonato	equipa_casa	equipa_fora	gol_casa	gol_fora
async function initialPartidasView() {
  const partidas = await getManyField("partidas");
  const campeonatos = await getManyField("campeonato");

  partidas.map(
    (
      {
        id_partida,
        nome_campeonato,
        equipa_casa,
        equipa_fora,
        hora_fim,
        hora_inicio,
        estado,
        gol_casa,
        gol_fora,
      },
      i
    ) => {
      document.querySelector(".view_tbody").innerHTML += `
            <tr data-key="${id_partida}">
                <th scope="row">${i + 1}</th>
                <td>${nome_campeonato}</td>
                <td>${equipa_casa}${gol_casa
          ? `- <span class="badge bg-primary rounded-pill">${gol_casa}</span>`
          : ""
        }</td>
                <td>${equipa_fora}${gol_fora
          ? `- <span class="badge bg-primary rounded-pill">${gol_fora}</span>`
          : ""
        }</td>
                <td>${hora_inicio}</td>
                <td>${hora_fim}</td>
                <td>${estado == 1 ? "Terminado" : "Sem resultado"}</td>
                <td class='d-flex gap-2'>
                   ${estado == 0
          ? `<button class="btn btn-success btn-sm" onclick="handleOpenFormResultado(${id_partida})">Concluir a Partida</button>`
          : ""
        }
                    <button class="btn btn-danger btn-sm" onclick="handleDeleteItem(${id_partida})">Remover</button>
                </td>
            </tr>
        `;
    }
  );

  document.querySelector(".filter-section").innerHTML = `
    <form  id="filterForm" class="row g-2 needs-validation" novalidate onsubmit="handleFilterByCampeonato(event)">
        <div class="col-md-6">
            <label for="id_campeonato" class="form-label">Campeonatos</label>
            <select class="form-select" id="id_campeonato" required>
                <option selected disabled value="">Escolher...</option>
                ${campeonatos
      .map((campeonato) => {
        return `<option  value=${campeonato.id_campeonato}>${campeonato.nome}</option>`;
      })
      .join("")}
            </select>
            <span class="invalid-feedback">Por favor, selecione um campeonato</span>
        </div>

        <div>
            <button type="submit" class="btn btn-primary">Buscar</button>
        </div>
    </form>
    `;
}

async function handleFilterByCampeonato(event) {
  event.preventDefault();

  if (!event.target.checkValidity()) {
    event.target.classList.add("was-validated");
    return;
  }

  const id = event.target.id_campeonato.value;
  if (id) {
    const partidas = await getManyFieldByParamAndID("partidas", "buscarporcampeonato", id);

    document.querySelector(".view_tbody").innerHTML = "";

    partidas.map(
      (
        {
          id_partida,
          nome_campeonato,
          equipa_casa,
          equipa_fora,
          hora_fim,
          hora_inicio,
          estado,
          gol_casa,
          gol_fora,
        },
        i
      ) => {
        document.querySelector(".view_tbody").innerHTML += `
                <tr data-key="${id_partida}">
                    <th scope="row">${i + 1}</th>
                    <td>${nome_campeonato}</td>
                    <td>${equipa_casa}${gol_casa
            ? `- <span class="badge bg-primary rounded-pill">${gol_casa}</span>`
            : ""
          }</td>
                    <td>${equipa_fora}${gol_fora
            ? `- <span class="badge bg-primary rounded-pill">${gol_fora}</span>`
            : ""
          }</td>
            <td>${hora_inicio}</td>
            <td>${hora_fim}</td>
            <td>${estado == 1 ? "Terminado" : "Sem resultado"}</td>
            <td class='d-flex gap-2'>
                ${estado == 0
            ? `<button class="btn btn-success btn-sm" onclick="handleOpenFormResultado(${id_partida})">Concluir a Partida</button>`
            : ""
          }
                <button class="btn btn-danger btn-sm" onclick="handleDeleteItem(${id_partida})">Remover</button>
            </td>
        </tr>`;
      }
    );
    return;
  }

  alert("Informação não ecotrada, verifica a escolha");
}

async function handleBuildModalForm() {
  const equipas = await getManyField("equipa");
  const campeonatos = await getManyField("campeonato");

  document.querySelector(".modal-overlay .modal-content").innerHTML = `
    <h4 class="fw-bold text-center mb-3">Criar uma partida</h4>
    <form  id="registrationForm" class="row g-2 needs-validation" novalidate onsubmit="handleValidation(event)">
      <div class="col-md-6">
        <label for="id_campeonato" class="form-label">Campeonatos</label>
        <select class="form-select" id="id_campeonato" required onchange="handleselectCampeonato(event)">
          <option selected disabled value="">Escolher...</option>
            ${campeonatos.map((campeonato) => (`<option  value=${campeonato.id_campeonato}>${campeonato.nome}</option>`)).join("")}
        </select>
          <span class="invalid-feedback">Por favor, selecione um campeonato</span>
      </div>
      
      <div class="col-md-6">
        <label for="id_equipa_casa" class="form-label">Equipa de casa</label>
        <select class="form-select" id="id_equipa_casa" required>
          <option selected disabled value="">Escolher...</option>
            ${equipas.map((equipa) => (`<option  value=${equipa.id_equipa}>${equipa.nome}</option>`)).join("")}
        </select>
        <span class="invalid-feedback">Por favor, selecione um equipa</span>
      </div>

      <div class="col-md-6">
        <label for="id_equipa_fora" class="form-label">Equipa de Fora</label>
        <select class="form-select" id="id_equipa_fora" required>
          <option selected disabled value="">Escolher...</option>
            ${equipas.map((equipa) => (`<option  value=${equipa.id_equipa}>${equipa.nome}</option>`)).join("")}
        </select>
        <span class="invalid-feedback">Por favor, selecione um equipa</span>
      </div>

      <div class="col-md-6">
        <label for="data" class="form-label">Data da partida</label>
        <input type="date" class="form-control select-data-partida" id="data" name="data" value="" required>
        <span class="invalid-feedback">Por favor, insira a data da partida.</span>
      </div>

      <div class="col-md-6">
        <label for="hora_inicio" class="form-label">Hora de Início</label>
        <input type="time" min="12:00" max="21:00" class="form-control" id="hora_inicio" name="hora_inicio" value="" required>
        <span class="invalid-feedback">Por favor, insira Hora de Início</span>
      </div>

      <div class="col-md-6">
        <label for="hora_fim" class="form-label">Hora de Fim</label>
        <input type="time" min="14:00" max="23:00" class="form-control" id="hora_fim" name="hora_fim" value="" required>
        <span class="invalid-feedback">Por favor, insira Hora de Fim</span>
      </div>
    
      <div class="sobre-campeonato">
      </div>

      <div class="col-12">
        <button type="submit" class="btn btn-primary">Finalizar</button>
      </div>
    </form>`;

  openModal();
}

async function handleselectCampeonato(event) {
  const campeonato = await getOneField("campeonato", event.target.value);

  const equipas = campeonato.equipas

  if (campeonato) {
    document.querySelector("form .sobre-campeonato").innerHTML = `
      <ul class="list-group mb-3">
        <li class="list-group-item d-flex justify-content-between lh-sm">
          <div>
            <input type="hidden" id="data_inicio" name="data_inicio" value="${campeonato.data_inicio}"/>
            <input type="hidden" id="data_fim" name="data_fim" value="${campeonato.data_fim}"/>
            <h6 class="my-0">${campeonato.nome_campeonato}</h6>
            <strong>${formatarDataTexto(campeonato.data_inicio)} até ${formatarDataTexto(campeonato.data_fim)}</strong> <br/>
            <small class="text-muted">${campeonato.descricao_campeonato}</small>
          </div>
          <span class="text-muted">Kz ${campeonato.valor_pagar}</span>
        </li>
      </ul>
    `;

    document.querySelector("form #id_equipa_casa").innerHTML = `
      <option selected disabled value="">Escolher...</option>
      ${equipas.map((equipa) => (`<option  value=${equipa.id_equipa}>${equipa.nome}</option>`)).join("")}
    `
    document.querySelector("form #id_equipa_fora").innerHTML = `
      <option selected disabled value="">Escolher...</option>
      ${equipas.map((equipa) => (`<option  value=${equipa.id_equipa}>${equipa.nome}</option>`)).join("")}
    `
  }

}

async function handleValidation(event) {
  event.preventDefault();

  const today = new Date();
  const data_inicio_campeonato = new Date(event.target?.data_inicio?.value ?? 0);
  const data_fim_campeonato = new Date(event.target?.data_fim?.value ?? 0);
  const data_partida = new Date(event.target.data.value);

  if (!(data_partida > today && data_partida > data_inicio_campeonato && data_partida < data_fim_campeonato)) {
    document
      .querySelector(".select-data-partida#data")
      .classList.add("is-invalid");
    document.querySelector(
      ".select-data-partida#data"
    ).nextElementSibling.innerHTML =
      "A data informada não está dentro intervalo de realização do campeonato";
    return;
  }

  document
    .querySelector(".select-data-partida#data")
    .classList.remove("is-invalid");
  document.querySelector(
    ".select-data-partida#data"
  ).nextElementSibling.innerHTML = "";

  if (event.target.hora_inicio.value > event.target.hora_fim.value) {
    document.querySelector("#hora_inicio").classList.add("is-invalid");
    document.querySelector("#hora_inicio").nextElementSibling.innerHTML = "A hora de inicio deve ser menor que a hora de fim";
    return;
  }

  document.querySelector("#hora_inicio").classList.remove("is-invalid");
  document.querySelector("#hora_inicio").nextElementSibling.innerHTML = "";

  if (event.target.id_equipa_casa.value === event.target.id_equipa_fora.value) {
    document.querySelector("#id_equipa_fora").classList.add("is-invalid");
    document.querySelector("#id_equipa_fora").nextElementSibling.innerHTML = "As equipas não podem ser iguiais";
    return;
  }

  document.querySelector("#id_equipa_fora").classList.remove("is-invalid");
  document.querySelector("#id_equipa_fora").nextElementSibling.innerHTML = "";

  if (!event.target.checkValidity()) {
    event.target.classList.add("was-validated");
    return;
  }
  await handlecriarItem(event.target);
  return;
}

async function handlecriarItem(form) {
  const itemData = {
    id_campeonato: form.id_campeonato.value,
    hora_fim: form.hora_fim.value,
    hora_inicio: form.hora_inicio.value,
    data: form.data.value,
    id_equipa_casa: form.id_equipa_casa.value,
    id_equipa_fora: form.id_equipa_fora.value,
  };

  await postNewField("partidas", itemData);
  window.location.reload();
}

async function handleOpenFormResultado(id_partida) {
  const partida = await getOneField("partidas", id_partida)

  document.querySelector(".modal-overlay .modal-content").innerHTML = `
    <h4 class="fw-bold text-center mb-3">Definir Resultados</h4>
    <form  id="registrationForm" class="row g-2 needs-validation" novalidate onsubmit="handleResultadoValidation(event)">
      <ul class="list-group mb-3">
        <li class="list-group-item d-flex justify-content-between lh-sm">
          <div>
            <input type="hidden" id="id_partida" name="id_partida" value="${id_partida}"/>
            <h6 class="my-0">${partida.nome_campeonato}</h6>
            <strong>${formatarDataTexto(partida.data)}</strong> <br/>
            <small class="text-muted">${partida.hora_fim} até ${partida.hora_inicio}</small>
          </div>
          <span class="text-muted">${Number(partida.estado) == 1 ? "Terminado" : "Sem resultado"}</span>
        </li>
      </ul>

      <div class="col-md-6">
        <label for="gol_casa" class="form-label">Golos de <strong>${partida.equipa_casa}</strong></label>
        <input type="number" class="form-control" id="gol_casa" name="gol_casa" required>
        <span class="invalid-feedback">Informe o número de golo</span>
      </div>

      <div class="col-md-6">
        <label for="gol_fora" class="form-label">Golos de <strong>${partida.equipa_fora}</strong></label>
        <input type="number" class="form-control" id="gol_fora" name="gol_fora" required>
        <span class="invalid-feedback">Informe o número de golo</span>
      </div>

      <div class="col-12">
        <button type="submit" class="btn btn-primary">Finalizar</button>
      </div>
    </form>`;

  openModal();
}

async function handleResultadoValidation(event) {
  event.preventDefault();

  if (!event.target.checkValidity()) {
    event.target.classList.add("was-validated");
    return;
  }

  const itemData = {
    id_partida: Number(event.target.id_partida.value),
    gol_casa: Number(event.target.gol_casa.value),
    gol_fora: Number(event.target.gol_fora.value)
  };

  await postNewField("resultados", itemData);
  window.location.reload();
}

async function handleDeleteItem(id) {
  await deleteField("inscricao", id);
  window.location.reload();
}
