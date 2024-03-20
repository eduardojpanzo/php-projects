initialInscricaoView()
// Estudar essa possibilidade de apenas aprovar no dashbord e ser criado no site principal

async function initialInscricaoView() {
    const inscricoes = await getManyField("equipa");

    inscricoes.map(
        ({ id_equipa, nome, data_fundacao, descricao }, i) => {
            document.querySelector(".view_tbody").innerHTML += `
            <tr data-key="${id_equipa}">
                <th scope="row">${i + 1}</th>
                <td>${nome}</td>
                <td>${formatarDataTexto(data_fundacao)}</td>
                <td>${descricao}</td>
                <td class='d-flex gap-2'>
                    <button class="btn btn-warning btn-sm" onclick="handleDetails(${id_equipa})">Aprovar</button>
                    <button class="btn btn-primary btn-sm" onclick="handleBuildModalForm(${Number(id_equipa)})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="handleDeleteItem(${id_equipa})">Remover</button>
                </td>
            </tr>
        `;
        }
    );
}

async function handleDetails(id) {
    const item = await getOneField("equipa", id)

    modalOverlay.querySelector(".modal-content").innerHTML = `
    <div class="card">
        <svg class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"/><text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text></svg>

        <div class="card-body">
            <h5 class="card-title">Nome: ${item.
            nome}</h5>
            <p class="card-text">Descrição: ${item.descricao}</p>
            <p>Fundação:  <span class="badge bg-light text-dark">${formatarDataEmNumero(item.data_fundacao)}</span></p>
            <p>Técnicos: <span class="badge bg-light text-dark">${item?.tecnico ?? ''}</span></p>
            Jogadores:
            <div class="d-flex gap-1 ">
            ${item?.jogadores ? item.jogadores?.map((jogador) => (
                `<span class="badge bg-secondary">${jogador.nome}</span>`
            )).join(" ") : ''}
            </div>
        </div>
    </div>`
    openModal();
}

async function handleBuildModalForm(id) {
    let item;
    if (typeof (id) === 'number') {
        item = await getOneField("equipa", id)
    }
    const formTamplete = `
    <h4 class="fw-bold text-center mb-3">${id ? 'Editar' : 'Nova'} Inscrição</h4>

    <form  id="registrationForm" class="row g-2 needs-validation" novalidate onsubmit="handleValidation(event)">
        ${id && `<input type='hidden' id='id' name='id' value='${id}'>`}
        <div class="col-md-6">
            <label for="nome" class="form-label">Nome</label>
            <input type="text" class="form-control" id="nome" name="nome" value="${item?.nome ?? ''}" required>
            <span class="invalid-feedback">Por favor, insira o nome.</span>
        </div>

        <div class="col-md-6">
            <label for="data_fundacao" class="form-label">Data de Início</label>
            <input type="date" class="form-control" id="data_fundacao" name="data_fundacao" value="${item?.data_fundacao ?? ''}" required>
            <span class="invalid-feedback">Por favor, insira a data de fundação.</span>
        </div>

        <div class="col-md-6">
            <label for="descricao" class="form-label">Descrição</label>
            <textarea class="form-control" id="descricao" name="descricao" rows="3" required>${item?.descricao ?? ''}</textarea>
            <span class="invalid-feedback">Por favor, insira a descrição.</span>
        </div>
        
        <div class="col-12">
            <button type="submit" class="btn btn-primary">${id ? 'Atualizar' : 'Criar'}</button>
        </div>
    </form>`

    modalOverlay.querySelector(".modal-content").innerHTML = formTamplete;
    openModal();
}

async function handleValidation(event) {
    event.preventDefault()

    if (!event.target.checkValidity()) {
        event.target.classList.add("was-validated")
        return
    }

    const id = Number(event.target.id.value);

    if (id) {
        await handleEditItem(event.target, id)
        return
    }

    await handlecriarItem(event.target);
    return
}

async function handlecriarItem(form) {
    const itemData = {
        nome: form.nome.value,
        descricao: form.descricao.value,
        data_fundacao: form.data_fundacao.value,
    };

    await postNewField("equipa", itemData);
    window.location.reload();
}

async function handleEditItem(form, id) {
    const itemData = {
        nome: form.nome.value,
        descricao: form.descricao.value,
        data_fundacao: form.data_fundacao.value,
    };

    console.log(itemData, id);

    await updateField("equipa", id, itemData);
    window.location.reload();
}

async function handleDeleteItem(id) {
    await deleteField("equipa", id)
    window.location.reload();
}