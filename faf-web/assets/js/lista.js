const url = location.href;
const indexOfId = url.indexOf("field=");
const idValue = url.substring(indexOfId + 6);

initialListaView()

async function initialListaView() {
    document.querySelector(".row.field-row").innerHTML = "";

    if (idValue === "campeonato") {
        document.querySelector("#field").innerHTML = "Campeonatos"
        mountCampeonato()
        return;
    }

    if (idValue === "equipa") {
        document.querySelector("#field").innerHTML = "Equipas"
        mountEquipas()
        return;
    }

    if (idValue === "estadio") {
        document.querySelector("#field").innerHTML = "Estádios"
        mountEstadios()
        return;
    }
}

async function mountCampeonato() {
    const campeonatos = await getManyField("campeonato");
    campeonatos.map(
        ({ id_campeonato, nome, data_inicio, data_fim, descricao, valor_pagar, url_foto }, i) => {
            document.querySelector(".row.field-row").innerHTML += `
                <div class="col">
                <div class="card shadow-sm">
                    ${url_foto ? `<img src="${url_foto}" class="card-img-top" alt="${nome}"/>` : IMAGE_COVER}

                    <div class="card-body">
                    <h5 class="card-title">${nome}</h5>
                    <p class="card-text">${descricao}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary"><a href="./campeonato.html?id=${id_campeonato}">Ver detalhes</a></button>
                        <button type="button" class="btn btn-sm btn-outline-secondary">
                        <a href="./inscricao.html?id=${id_campeonato}">ir na inscrição</a></button></button>
                        </div>
                        <small class="text-muted">${valor_pagar}</small>
                    </div>
                    </div>
                </div>
                </div>
              `;
        }
    );
}

async function mountEquipas() {
    const equipas = await getManyField("equipa");
    equipas.map(
        ({ id_equipa, nome, data_fundacao, descricao, url_foto }, i) => {
            document.querySelector(".row.field-row").innerHTML += `
            <div class="col">
                <div class="card shadow-sm">
                    ${url_foto ? `<img src="${url_foto}" class="card-img-top" alt="${nome}"/>` : IMAGE_COVER}

                    <div class="card-body">
                    <h5 class="card-title">${nome}</h5>
                    <p class="card-text">${descricao}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary"><a href="./equipa.html?id=${id_equipa}">Ver detalhes</a></button>
                        </div>
                        <small class="text-muted">${data_fundacao}</small>
                    </div>
                    </div>
                </div>
                </div>
        `;
        }
    );
}

async function mountEstadios() {
    const estadios = await getManyField("estadio");

    estadios.map(
        ({ nome, capacidade, localizacao, url_foto }, i) => {
            document.querySelector(".row.field-row").innerHTML += `
            <div class="col">
                <div class="card shadow-sm">
                ${url_foto ? `<img src="${url_foto}" class="card-img-top" alt="${nome}"/>` : IMAGE_COVER}

                <div class="card-body">
                <h5 class="card-title">${nome}</h5>
                <p class="card-text">${localizacao}</p>
                <div class="d-flex justify-content-between align-items-center">
                    Capacidade: <small class="text-muted">${capacidade}</small>
                </div>
                </div>
            </div>
            </div>
        `;
        }
    );
}