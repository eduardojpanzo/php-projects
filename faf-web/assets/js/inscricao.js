initialListaView()

async function initialListaView() {
    await MountFormInscricao();
}

async function MountFormInscricao() {
    const equipas = await getManyField("equipa")
    const campeonatos = await getManyField("campeonato")

    const formTamplete = `
    <h4 class="fw-bold text-center mb-3">Fazer uma Inscrição</h4>

    <form  id="registrationForm" class="row g-2 needs-validation" novalidate onsubmit="handleValidation(event)">
        <div class="col-md-6">
            <label for="id_campeonato" class="form-label">Campeonatos</label>
            <select class="form-select select-modal" id="id_campeonato" required onchange="handleselectCampeonato(event)">
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
    
        <div class="sobre-campeonato">
        </div>

        <div class="col-12">
            <button type="submit" class="btn btn-primary">Finalizar</button>
        </div>
    </form>`

    document.querySelector("#content-inscricao").innerHTML = formTamplete;
}

async function handleselectCampeonato(event) {
    const campeonato = await getOneField("campeonato", event.target.value);

    if (campeonato) {
        document.querySelector("form .sobre-campeonato").innerHTML = `
        <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
                <input type="hidden" id="data_inicio" name="data_inicio" value="${campeonato.data_inicio}"/>
                <h6 class="my-0">${campeonato.nome_campeonato}</h6>
                <strong>${formatarDataTexto(campeonato.data_inicio)} até ${formatarDataTexto(campeonato.data_fim)}</strong> <br/>
                <small class="text-muted">${campeonato.descricao_campeonato}</small>
            </div>
            <span class="text-muted">Kz ${campeonato.valor_pagar}</span>
            </li>
        </ul>
        `
    }

}

async function handleValidation(event) {
    event.preventDefault()

    const today = new Date()
    const data_inicio = new Date(event.target.data_inicio.value);


    if (today > data_inicio) {
        document.querySelector(".select-modal#id_campeonato").classList.add("is-invalid");
        document.querySelector(".select-modal#id_campeonato").nextElementSibling.innerHTML =
            "As incrições estão fechadas nesse campeonato";
        return;
    }

    document.querySelector(".select-modal#id_campeonato").classList.remove("is-invalid");
    document.querySelector(".select-modal#id_campeonato").nextElementSibling.innerHTML = "";

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
        estado: 0,
    };

    await postNewField("inscricao", itemData);
    document.location.href = "./index.html";
}