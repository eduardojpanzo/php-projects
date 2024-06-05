const url = location.href;
const indexOfId = url.indexOf("id=");
const idValue = url.substring(indexOfId + 3);

initialCampeonatoView()

async function initialCampeonatoView() {
    const campeonato = await getOneField("campeonato", idValue);
    const partidas = await getManyFieldByParamAndID("partidas", "buscarporcampeonato", idValue)
    const equipas = campeonato.equipas

    document.querySelector(".card-principal .card_image").innerHTML = `${campeonato.url_foto ? `<img src="${campeonato.url_foto}" class="card-img-top image-cover" alt="${campeonato.nome_campeonato}"/>` : IMAGE_COVER}`

    document.querySelector(".card-body > .card-title").innerHTML = campeonato.nome_campeonato
    document.querySelector(".card-body > .card-text").innerHTML = campeonato.descricao_campeonato

    equipas.map(
        ({ id_equipa, nome, url_foto }, i) => {
            document.querySelector(".row.equipa-row").innerHTML += `
              <div class="col-md-3 my-2 position-relative ">
                  <div class="card">
                      <div class="card-header">
                      ${url_foto ? `<img src="${url_foto}" class="card-img-top" alt="${nome}"/>` : IMAGE_COVER}
                      </div>
                      <div class="card-body">
                          <h5 class="card-title">${nome}</h5>
                      </div>
                  </div>
                  <a href="./equipa.html?id=${id_equipa}" class="link-card"></a>
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
}