initialInscricaoView()
// Estudar essa possibilidade de apenas aprovar no dashbord e ser criado no site principal

async function initialInscricaoView() {
    const inscricoes = await getManyField("inscricao");
    const campeonatos = await getManyField("campeonato");

    inscricoes.map(
        ({ id_inscricao, nome_campeonato, nome_equipa, estado }, i) => {
            document.querySelector(".view_tbody").innerHTML += `
            <tr data-key="${id_inscricao}">
                <th scope="row">${i + 1}</th>
                <td>${nome_campeonato}</td>
                <td>${nome_equipa}</td>
                <td>${estado == 1 ? 'Aprovado' : 'Não aprovado'}</td>
                <td class='d-flex gap-2'>
                   ${estado == 0 ? `<button class="btn btn-warning btn-sm" onclick="handleApprove(${id_inscricao})">Aprovar</button>` : ''}
                    <button class="btn btn-danger btn-sm" onclick="handleDeleteItem(${id_inscricao})">Remover</button>
                </td>
            </tr>
        `;
        }
    );

    document.querySelector(".filter-section").innerHTML = `
    <form  id="aproveForm" class="row g-2 needs-validation" novalidate onsubmit="handleFilterByCampeonato(event)">
        <div class="col-md-6">
            <label for="id_campeonato" class="form-label">Campeonatos</label>
            <select class="form-select" id="id_campeonato" required>
                <option selected disabled value="">Escolher...</option>
                ${campeonatos.map((campeonato) => {
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
    event.preventDefault()

    if (!event.target.checkValidity()) {
        event.target.classList.add("was-validated")
        return
    }

    const id = event.target.id_campeonato.value;
    if (id) {
        const inscricoes = await getOneField("inscricao", id)

        document.querySelector(".view_tbody").innerHTML = "";

        inscricoes.map(
            ({ id_inscricao, nome_campeonato, nome_equipa, estado }, i) => {
                document.querySelector(".view_tbody").innerHTML += `
                <tr data-key="${id_inscricao}">
                    <th scope="row">${i + 1}</th>
                    <td>${nome_campeonato}</td>
                    <td>${nome_equipa}</td>
                    <td>${estado == 1 ? 'Aprovado' : 'Não aprovado'}</td>
                    <td class='d-flex gap-2'>
                       ${estado == 0 ? `<button class="btn btn-warning btn-sm" onclick="handleApprove(${id_inscricao})">Aprovar</button>` : ''}
                        <button class="btn btn-danger btn-sm" onclick="handleDeleteItem(${id_inscricao})">Remover</button>
                    </td>
                </tr>
            `;
            }
        );
        return
    }

    alert("Informação não ecotrada, verifica a escolha");
}

async function handleBuildModalForm() {
    const equipas = await getManyField("equipa")
    const campeonatos = await getManyField("campeonato")

    const formTamplete = `
    <h4 class="fw-bold text-center mb-3">Fazer uma Inscrição</h4>

    <form  id="registrationForm" class="row g-2 needs-validation" novalidate onsubmit="handleValidation(event)">
        <div class="col-md-6">
            <label for="id_campeonato" class="form-label">Campeonatos</label>
            <select class="form-select" id="id_campeonato" required>
                <option selected disabled value="">Escolher...</option>
                ${campeonatos.map((campeonato) => {
        return `<option  value=${campeonato.id_campeonato}>${campeonato.nome}</option>`;
    })
            .join("")}
            </select>
            <span class="invalid-feedback">Por favor, selecione um campeonato</span>
        </div>

        <div class="col-md-6">
            <label for="id_equipa" class="form-label">equipas</label>
            <select class="form-select" id="id_equipa" required>
                <option selected disabled value="">Escolher...</option>
                ${equipas.map((equipa) => {
                return `<option  value=${equipa.id_equipa}>${equipa.nome}</option>`;
            })
            .join("")}
            </select>
            <span class="invalid-feedback">Por favor, selecione um equipa</span>
        </div>

        <div class="mb-3 form-check form-switch">
            <label class="form-check-label" for="estado">Pagamento da inscrição</label>
            <input class="form-check-input" type="checkbox" id="estado">
          </div>
        
        <div class="col-12">
            <button type="submit" class="btn btn-primary">Finalizar</button>
        </div>
    </form>`

    document.querySelector(".modal-overlay .modal-content").innerHTML = formTamplete;
    openModal();
}

async function handleValidation(event) {
    event.preventDefault()

    if (!event.target.checkValidity()) {
        event.target.classList.add("was-validated")
        return
    }

    await handlecriarItem(event.target);
    return
}

async function handlecriarItem(form) {
    const itemData = {
        id_campeonato: form.id_campeonato.value,
        id_equipa: form.id_equipa.value,
        estado: form.estado.checked ? 1 : 0,
    };

    await postNewField("inscricao", itemData);
    window.location.reload();
}

async function handleApprove(id) {
    const itemData = {
        estado: 1,
    };

    await updateField("inscricao", id, itemData);
    window.location.reload();
}

async function handleDeleteItem(id) {
    await deleteField("inscricao", id)
    window.location.reload();
}