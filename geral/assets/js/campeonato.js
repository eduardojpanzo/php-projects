const url = location.href;
const indexOfId = url.indexOf("id=");
const idValue = url.substring(indexOfId + 3);

initialCampeonatoView()

async function initialCampeonatoView() {
    const campeonato = await getOneField("campeonato", idValue);
    const equipas = campeonato.equipas

    document.querySelector(".card-principal .card_image").innerHTML = `${campeonato.url_foto ? `<img src="${campeonato.url_foto}" class="card-img-top" alt="${campeonato.nome_campeonato}"/>` : IMAGE_COVER}`

    document.querySelector(".card-body > .card-title").innerHTML = campeonato.nome_campeonato
    document.querySelector(".card-body > .card-text").innerHTML = campeonato.descricao_campeonato

    equipas.map(
        ({ id_equipa, nome, url_foto }, i) => {
            document.querySelector(".row.equipa-row").innerHTML += `
              <div class="col-md-3 my-2 position-relative ">
                  <div class="card">
                  ${url_foto ? `<img src="${url_foto}" class="card-img-top" alt="${nome}"/>` : IMAGE_COVER}
                      <div class="card-body">
                          <h5 class="card-title">${nome}</h5>
                      </div>
                  </div>
                  <a href="./equipa.html?id=${id_equipa}" class="link-card"></a>
              </div>
          `;
        }
    );
}