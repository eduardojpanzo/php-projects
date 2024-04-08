const url = location.href;
const indexOfId = url.indexOf("id=");
const idValue = url.substring(indexOfId + 3);

initialEquipaView()

async function initialEquipaView() {
    const equipa = await getOneField("equipa", idValue);
    const jogadores = equipa.jogadores
    const estadio = await getOneField("estadio", equipa.id_estadio);
    const partidas = []

    document.querySelector(".card-principal .card_image").innerHTML = `${equipa.url_foto ? `<img src="${equipa.url_foto}" class="card-img-top" alt="${equipa.nome}"/>` : IMAGE_COVER}`

    document.querySelector(".card-body > .card-title").innerHTML = equipa.nome
    document.querySelector(".card-body > .card-text").innerHTML = equipa.descricao

    jogadores.map(
        ({ id_jogador, nome, numero, posicao, url_foto }, i) => {
            document.querySelector(".row.jogador-row").innerHTML += `
              <div class="col-md-3 my-2 position-relative ">
                  <div class="card">
                  ${url_foto ? `<img src="${url_foto}" class="card-img-top" alt="${nome}"/>` : IMAGE_COVER}
                      <div class="card-body">
                          <h5 class="card-title">${nome}</h5>
                          <p>Número: <strong>${numero}</strong></p>
                          <p>Posição: <strong>${posicao}</strong></p>
                      </div>
                  </div>
                  <a href="./jogador.html?id=${id_jogador}" class="link-card"></a>
              </div>
          `;
        }
    );

    partidas.map(
        ({ id_jogador, nome, url_foto }, i) => {
            document.querySelector(".row.partida-row").innerHTML += `
              <div class="col-md-3 my-2 position-relative ">
                  <div class="card">
                  ${url_foto ? `<img src="${url_foto}" class="card-img-top" alt="${nome}"/>` : IMAGE_COVER}
                      <div class="card-body">
                          <h5 class="card-title">${nome}</h5>
                      </div>
                  </div>
                  <a href="./equipa.html?id=${id_jogador}" class="link-card"></a>
              </div>
          `;
        }
    );

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