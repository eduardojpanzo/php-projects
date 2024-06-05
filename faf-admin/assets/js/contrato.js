initialContratoView()
// Estudar essa possibilidade de apenas aprovar no dashbord e ser criado no site principal

async function initialContratoView() {
    const contratos = await getManyField("contrato");
    const equipas = await getManyField("equipa");
    contratos.map(
        ({ id_contrato, nome_jogador, nome_equipa, data_inicio, data_fim, salario }, i) => {
            document.querySelector(".view_tbody").innerHTML += `
            <tr data-key="${id_contrato}">
                <th scope="row">${i + 1}</th>
                <td>${nome_jogador}</td>
                <td>${nome_equipa}</td>
                <td>${salario}</td>
                <td>${data_inicio}</td>
                <td>${data_fim}</td>
                <td class='d-flex gap-2'>
                <button class="btn btn-info btn-sm" onclick="handleDetails(${id_contrato})">Detalhes</button>
                <button class="btn btn-primary btn-sm" onclick="handleBuildModalForm(${Number(
                id_contrato
            )})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="handleDeleteItem(${id_contrato})">Remover</button>
                </td>
            </tr>
        `;
        }
    );

    document.querySelector(".filter-section").innerHTML = `
    <form  id="aproveForm" class="row g-2 needs-validation" novalidate onsubmit="handleFilterByEquipa(event)">
        <div class="col-md-6">
            <label for="id_equipa" class="form-label">Equipa</label>
            <select class="form-select" id="id_equipa" required>
                <option selected disabled value="">Escolher...</option>
                ${equipas.map((campeonato) => {
        return `<option  value=${campeonato.id_equipa}>${campeonato.nome}</option>`
    }).join("")}
            </select>
            <span class="invalid-feedback">Por favor, selecione um campeonato</span>
        </div>

        <div>
            <button type="submit" class="btn btn-primary">Buscar</button>
        </div>
    </form>
    `;
}

async function handleFilterByEquipa(event) {
    event.preventDefault()

    if (!event.target.checkValidity()) {
        event.target.classList.add("was-validated")
        return
    }

    const id = event.target.id_equipa.value;
    if (id) {
        const contratos = await getManyFieldByParamAndID("contrato", "buscarporequipa", id)

        document.querySelector(".view_tbody").innerHTML = "";

        contratos.map(
            ({ id_contrato, nome_jogador, nome_equipa, data_inicio, data_fim, salario }, i) => {
                document.querySelector(".view_tbody").innerHTML += `
                <tr data-key="${id_contrato}">
                    <th scope="row">${i + 1}</th>
                    <td>${nome_jogador}</td>
                    <td>${nome_equipa}</td>
                    <td>${salario}</td>
                    <td>${data_inicio}</td>
                    <td>${data_fim}</td>
                    <td class='d-flex gap-2'>
                    <button class="btn btn-info btn-sm" onclick="handleDetails(${id_contrato})">Detalhes</button>
                    <button class="btn btn-primary btn-sm" onclick="handleBuildModalForm(${Number(
                    id_contrato
                )})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="handleDeleteItem(${id_contrato})">Remover</button>
                    </td>
                </tr>
            `;
            }
        );
        return
    }

    alert("Informação não ecotrada, verifica a escolha");
}

async function handleBuildModalForm(id) {
    const equipas = await getManyField("equipa")
    const jogadores = await getManyField("jogador")

    let item;
    if (typeof id === "number" && id > 0) {
        item = await getOneField("contrato", id);
    }

    const formTamplete = `
    <h4 class="fw-bold text-center mb-3">Gerar um Contrato</h4>

    <form  id="registrationForm" class="row g-2 needs-validation" novalidate onsubmit="handleValidation(event)">
        ${id && `<input type='hidden' id='id' name='id' value='${id}'>`}

        <div class="col-md-6">
            <label for="id_jogador" class="form-label">Jogador</label>
            <select class="form-select select-modal" id="id_jogador" required>
                <option selected disabled value="">Escolher...</option>
                ${jogadores.map((jogador) => {
        return `<option  value=${jogador.id_jogador}>${jogador.jogador_nome}</option>`;
    }).join("")}
            </select>
            <span class="invalid-feedback">Por favor, selecione um jogador</span>
        </div>

        <div class="col-md-6">
            <label for="id_equipa" class="form-label">Equipa</label>
            <select class="form-select" id="id_equipa" required onchange="handleselectEquipa(event)">
                <option selected disabled value="">Escolher...</option>
                ${equipas.map((equipa) => {
        return `<option  value=${equipa.id_equipa}>${equipa.nome}</option>`
    }).join("")}
            </select>
            <span class="invalid-feedback">Por favor, selecione um equipa</span>
        </div>

        <div class="col-md-6">
            <label for="salario" class="form-label">salário</label>
            <input type="text" class="form-control" id="salario" name="salario" value="${item?.salario ?? ""
        }" required>
            <span class="invalid-feedback">Por favor, insira o salario.</span>
        </div>

        <div class="col-md-6">
            <label for="data_inicio" class="form-label">Data de Ínicio</label>
            <input type="date" class="form-control" id="data_inicio" name="data_inicio" value="${item?.data_inicio ?? ""
        }" required>
            <span class="invalid-feedback">Por favor, insira a data de ínicio.</span>
        </div>

        <div class="col-md-6">
            <label for="data_fim" class="form-label">Data de Fim</label>
            <input type="date" class="form-control data-form" id="data_fim" name="data_fim" value="${item?.data_fim ?? ""
        }" required>
            <span class="invalid-feedback">Por favor, insira a data de Fim.</span>
        </div>
    
        <div class="sobre-equipa">
        </div>

        <div class="col-12">
            <button type="submit" class="btn btn-primary">Finalizar</button>
        </div>
    </form>`

    document.querySelector(".modal-overlay .modal-content").innerHTML = formTamplete;
    openModal();
}

async function handleDetails(id) {
    const item = await getOneField("contrato", id);

    document.querySelector(".modal-overlay .modal-content").innerHTML = `
      <div class="card">
          ${item.url_foto ? `<img src="${item.url_foto}" class="card-img-top" alt="${item.jogador_nome}"/>` : IMAGE_COVER}
  
          <div class="card-body">
              <h5 class="card-title">Jogaodr: ${item.nome_jogador}</h5>
              <p class="card-text">Equipa: ${item.nome_equipa}</p>
              <p>Salário: <span class="badge bg-light text-dark">${item.salario}</span></p>
              <p>Data de Início:  <span class="badge bg-light text-dark">${formatarDataEmNumero(item.data_inicio)}</span></p>
              <p>Data de Fim:  <span class="badge bg-light text-dark">${formatarDataEmNumero(item.data_fim)}</span></p>
              
              Estado:
              <div class="d-flex gap-1 ">
              ${isDateGreaterThanToday(new Date(item.data_fim))
            ? `<span class="badge bg-success">Em Andamento</span>`
            : `<span class="badge bg-danger ">Termindado</span>`
        }
              </div>
          </div>
      </div>`;
    openModal();
}

async function handleselectEquipa(event) {
    const equipa = await getOneField("equipa", event.target.value);

    if (equipa) {
        document.querySelector("form .sobre-equipa").innerHTML = `
        <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
                <h6 class="my-0">${equipa.nome}</h6>
                <strong>${formatarDataTexto(equipa.data_fundacao)}</strong> <br/>
                <small class="text-muted">${equipa.descricao}</small>
            </div>
            </li>
        </ul>
        `
    }

}

async function handleValidation(event) {
    event.preventDefault()

    const inicio = new Date(event.target.data_inicio.value)
    const fim = new Date(event.target.data_fim.value);


    if (calcularDiferencaEmDias(inicio, fim) < 183) {
        document.querySelector(".data-form#data_fim").classList.add("is-invalid");
        document.querySelector(".data-form#data_fim").nextElementSibling.innerHTML =
            "O Contrato deve ser Semestral, a diferença deve ser de 183 dias";
        return;
    }

    document.querySelector(".data-form#data_fim").classList.remove("is-invalid");
    document.querySelector(".data-form#data_fim").nextElementSibling.innerHTML = "";

    if (!event.target.checkValidity()) {
        event.target.classList.add("was-validated")
        return
    }

    const id = Number(event.target.id.value);

    if (id) {
        await handleEditItem(event.target, id);
        return;
    }

    await handlecriarItem(event.target);
    return
}

async function handlecriarItem(form) {
    const itemData = {
        id_jogador: form.id_jogador.value,
        id_equipa: form.id_equipa.value,
        data_inicio: form.data_inicio.value,
        data_fim: form.data_fim.value,
        salario: form.salario.value,
    };

    console.log(itemData);

    await postNewField("contrato", itemData);
    window.location.reload();
}

async function handleEditItem(form, id) {
    const itemData = {
        id_jogador: form.id_jogador.value,
        id_equipa: form.id_equipa.value,
        data_inicio: form.data_inicio.value,
        data_fim: form.data_fim.value,
        salario: form.salario.value,
    };

    await updateField("contrato", id, itemData);
    window.location.reload();
}


async function handleDeleteItem(id) {
    await deleteField("contrato", id)
    window.location.reload();
}