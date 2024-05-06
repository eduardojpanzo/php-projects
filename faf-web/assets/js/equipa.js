const url = location.href;
const indexOfId = url.indexOf("id=");
const idValue = url.substring(indexOfId + 3);



initialEquipaView()

async function initialEquipaView() {
    const equipa = await getOneField("equipa", idValue);
    const jogadores = equipa.jogadores
    const estadio = await getOneField("estadio", equipa.id_estadio);
    const partidas = await getManyFieldByParamAndID("partidas", "buscarporequipa", idValue)

    document.querySelector(".card-principal .card_image").innerHTML = `${equipa.url_foto ? `<img src="${equipa.url_foto}" class="card-img-top" alt="${equipa.nome}"/>` : IMAGE_COVER}`

    document.querySelector(".card-body > .card-title").innerHTML = equipa.nome
    document.querySelector(".card-body > .card-text").innerHTML = equipa.descricao

    jogadores.map(
        ({ id_jogador, nome, numero, posicao, url_foto }, i) => {
            document.querySelector(".row.jogador-row").innerHTML += `
              <div class="text-center col-lg-4">
              ${url_foto ? `<img src="${url_foto}" class="card-img-top image-circ rounded-circle" alt="${nome}"/>` : IMAGE_COVER_CIRC}
      
              <div>
              <h2>${nome}</h2>
              <p>Número: <strong>${numero}</strong></p>
              <p>Posição: <strong>${posicao}</strong></p>
              <p><a class="btn btn-secondary" href="./jogador.html?id=${id_jogador}">Ver detalhes &raquo;</a></p>
              </div>
            </div>
          `;
        }
    );

    partidas.map(async ({ id_partida, data, hora_fim, hora_inicio, estado, id_equipa_casa, id_equipa_fora, nome_campeonato, gol_casa, gol_fora }, i) => {
        const equipa_casa = await getOneField("equipa", id_equipa_casa);
        const equipa_fora = await getOneField("equipa", id_equipa_fora);

        document.querySelector(".row.partida-row").innerHTML += `
        <div class="card col-md-5">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <h5 class="card-title">${equipa_casa?.nome}</h5>
                        <img class="team-logo" src=${equipa_casa?.url_foto ? equipa_casa.url_foto : "https://via.placeholder.com/150"} alt="${equipa_casa?.nome}">
                        ${Number(estado) ? `<span class="badge bg-primary">${gol_casa ? gol_casa : 0}</span>` : ""}
                    </div>
                    <div class="col-md-6 text-end ">
                        <h5 class="card-title">${equipa_fora?.nome}</h5>
                        ${Number(estado) ? `<span class="badge bg-primary">${gol_fora ? gol_fora : 0}</span>` : ""}
                        <img class="team-logo" src=${equipa_fora?.url_foto ? equipa_fora.url_foto : "https://via.placeholder.com/150"} alt="${equipa_fora?.nome}">
                    </div>
                </div>
                <div class="row mt-2 justify-content-center">
                    <div class="col">
                        <p class="card-text text-center">${formatarDataTexto(data)} | ${hora_fim}-${hora_inicio}</p>
                    </div>

                    ${Number(estado) ? `<strong class="text-center ">FIM</strong>` : ""}
                </div>
            </div>
        </div>
        `
    })

    document.querySelector(".row.estadio-row").innerHTML += `
    <div class="col-md-3 my-2 position-relative ">
        <div class="card">
        ${estadio.url_foto ? `<img src="${estadio.url_foto}" class="card-img-top" alt="${estadio.nome}"/>` : IMAGE_COVER}
            <div class="card-body">
                <h5 class="card-title">${estadio.nome}</h5>
            </div>
        </div>
    </div>
`;
}